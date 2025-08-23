import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import { GoogleGenAI, Modality } from "npm:@google/genai@1.14.0";

Deno.serve(async (req) => {
  // Initialize Supabase client
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Initialize Gemini AI
  const geminiApiKey = Deno.env.get('GEMINI_API_KEY')!;
  const geminiModel = Deno.env.get('GEMINI_DEFAULT_MODEL');
  const genAI = new GoogleGenAI(geminiApiKey);

  try {
    // Parse request body
    const { business_id: businessId, campaign_id: campaignId, user_id: userId } = await req.json();

    // Fetch business and campaign details
    const { data: businessData, error: businessError } = await supabase
      .from('businesses')
      .select('*')
      .eq('id', businessId)
      .single();

    if (businessError) throw businessError;

    const { data: campaignData, error: campaignError } = await supabase
      .from('campaigns')
      .select('*')
      .eq('id', campaignId)
      .single();

    if (campaignError) throw campaignError;

    // Comprehensive prompt for multi-modal generation
    const multiModalPrompt = `
      Create a comprehensive marketing asset for a ${businessData.category} business:

      Business Details:
      - Name: ${businessData.name}
      - Category: ${businessData.category}
      - Target Audience: ${JSON.stringify(businessData.customer)}
      - Marketing Channels: ${businessData.channels.join(', ')}
      - Brand Tone: ${businessData.tone}

      Campaign Specifics:
      - Goal: ${campaignData.goal}
      - Promotion: ${campaignData.promotion}
      - Marketing Approach: ${campaignData.approach}

      Deliverables:
      1. Generate a compelling marketing ad text that:
         - Captures the essence of the business
         - Highlights the unique promotion
         - Speaks directly to the target audience
         - Uses a ${businessData.tone} tone
         - Is suitable for ${businessData.channels.join(', ')} channels

      2. Create a professional marketing image that:
         - Represents the ${businessData.category} business
         - Aligns with the campaign goal of ${campaignData.goal}
         - Reflects a ${businessData.tone} brand personality
         - Uses a clean, modern design style
         - Incorporates visual elements that communicate the business's core message

      Provide both a concise, engaging ad text and a visually appealing marketing image that will grab attention and drive action.
    `;

    const result = await genAI.models.generateContent({
      model: geminiModel,
      contents: multiModalPrompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE]
      }
    })

    // Process the response
    let adText = '';
    let imageBase64 = null;

    // Extract text and image from response
    for (const part of result.response.candidates[0].content.parts) {
      if (part.text) {
        adText += part.text + '\n';
      }
      if (part.inlineData) {
        imageBase64 = part.inlineData.data;
      }
    }

    // Prepare image file name
    const imageFileName = `ad_image_${businessId}_${campaignId}_${Date.now()}.png`;

    // Store image in Supabase storage
    let imageUrl = null;
    if (imageBase64) {
      const imageBuffer = new Uint8Array(atob(imageBase64).split('').map(char => char.charCodeAt(0)));

      const { data: imageUploadData, error: imageUploadError } = await supabase.storage
        .from('marketing-assets')
        .upload(imageFileName, imageBuffer, {
          contentType: 'image/png',
          upsert: true
        });

      if (imageUploadError) {
        console.error('Image upload error:', imageUploadError);
        throw imageUploadError;
      }

      imageUrl = supabase.storage.from('marketing-assets').getPublicUrl(imageFileName).data.publicUrl;
    }

    // Insert generated ad into Supabase database
    const { data: adData, error: adInsertError } = await supabase
      .from('generated_ads')
      .insert({
        business_id: businessId,
        campaign_id: campaignId,
        user_id: userId,
        ad_text: adText.trim(),
        image_url: imageUrl,
        generation_model: geminiModel,
        business_details: businessData,
        campaign_details: campaignData
      })
      .select()
      .single();

    if (adInsertError) {
      console.error('Ad Insert Error:', adInsertError);
      throw adInsertError;
    }

    // Return the generated ad details
    return new Response(JSON.stringify({
      ad: adData,
      adTextContent: adText.trim()
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Connection': 'keep-alive'
      }
    });

  } catch (error) {
    console.error('Ad Generation Error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to generate ad',
      details: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});
