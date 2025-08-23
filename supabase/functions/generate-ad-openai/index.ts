import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import OpenAI from "npm:openai@4.24.1";

Deno.serve(async (req) => {
  // Initialize Supabase client
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Initialize OpenAI client
  const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
  const openAiImageModel = Deno.env.get('OPENAI_DEFAULT_IMAGE_MODEL');
  const openAiTextModel = Deno.env.get('OPENAI_DEFAULT_TEXT_MODEL');
  const openai = new OpenAI({ apiKey: openaiApiKey });

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

    // Comprehensive prompt for text generation
    const marketingPrompt = `
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

    // Generate ad text using OpenAI
    const textCompletion = await openai.chat.completions.create({
      model: openAiTextModel,
      messages: [
        {
          role: "system",
          content: "You are a professional marketing copywriter and graphic design director."
        },
        {
          role: "user",
          content: marketingPrompt
        }
      ],
      max_tokens: 500
    });

    const adText = textCompletion.choices[0].message.content.trim();

    // Generate image description using OpenAI
    const imageDescriptionCompletion = await openai.chat.completions.create({
      model: openAiImageModel,
      messages: [
        {
          role: "system",
          content: "You are a professional graphic designer. Provide a detailed DALL-E image generation prompt."
        },
        {
          role: "user",
          content: "Create a professional marketing image description based on this text: " + adText
        }
      ],
      max_tokens: 300
    });

    const imageDescription = imageDescriptionCompletion.choices[0].message.content.trim();

    // Generate actual image using DALL-E
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: imageDescription,
      n: 1,
      size: "1024x1024"
    });

    const imageUrl = imageResponse.data[0].url;

    // Download and upload image to Supabase storage
    const imageDownloadResponse = await fetch(imageUrl);
    const imageBlob = await imageDownloadResponse.blob();
    const imageBuffer = await imageBlob.arrayBuffer();
    const uint8Array = new Uint8Array(imageBuffer);

    const imageFileName = `ad_image_${businessId}_${campaignId}_${Date.now()}.png`;

    const { data: imageUploadData, error: imageUploadError } = await supabase.storage
      .from('marketing-assets')
      .upload(imageFileName, uint8Array, {
        contentType: 'image/png',
        upsert: true
      });

    if (imageUploadError) {
      console.error('Image upload error:', imageUploadError);
      throw imageUploadError;
    }

    const publicImageUrl = supabase.storage
      .from('marketing-assets')
      .getPublicUrl(imageFileName).data.publicUrl;

    // Insert generated ad into Supabase database
    const { data: adData, error: adInsertError } = await supabase
      .from('generated_ads')
      .insert({
        business_id: businessId,
        campaign_id: campaignId,
        user_id: userId,
        ad_text: adText,
        image_url: publicImageUrl,
        generation_model: `${openAiTextModel}, ${openAiImageModel}`,
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
      adTextContent: adText,
      imagePrompt: imageDescription
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
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
});
