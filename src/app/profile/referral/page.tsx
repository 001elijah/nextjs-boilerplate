import { Copy, Gift, Link, Mail, Users } from 'lucide-react'
import { Button, CardBorder, Container, Section, SectionTitle } from '@/components'

const referralData = {
  code: 'YOUR-UNIQUE-CODE-72',
  link: 'https://yourapp.com/signup?ref=YOUR-UNIQUE-CODE-72',
  stats: {
    referredFriends: 12,
    rewardsEarned: '$50 Credit',
    successfulSignups: 5
  }
}

const rewardSteps = [
  {
    description: 'Share your unique link with friends or colleagues who could benefit from our service.',
    icon: <Link className="size-8 text-gold" />,
    name: 'Share Your Link'
  },
  {
    description: 'When your friend signs up for any paid plan using your link, they get a discount.',
    icon: <Users className="size-8 text-gold" />,
    name: 'Friend Signs Up'
  },
  {
    description: 'You receive a credit to your account as a thank you for spreading the word.',
    icon: <Gift className="size-8 text-gold" />,
    name: 'You Get Rewarded'
  }
]

export default function ReferralPage() {
  return (
    <Section ariaLabel="Referral Program" className="py-8" id="referral">
      <Container>
        <div className="text-center">
          <SectionTitle fallbackTitle="Referrals" sectionTitle="Refer a Friend, Get Rewarded" />
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
            Love our service? Share it with your network and earn credits for every new customer you bring in. It&apos;s a win-win!
          </p>
        </div>

        {/* How it works */}
        <div className="my-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {rewardSteps.map((step, index) => (
            <div className="flex flex-col items-center text-center" key={index}>
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/50 bg-background/30">{step.icon}</div>
              <h3 className="mt-6 text-xl font-bold text-foreground">{step.name}</h3>
              <p className="mt-2 text-sm text-foreground/70">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Share your link */}
          <div className="lg:col-span-3">
            <CardBorder className="h-full items-start border-gold/50 bg-background/30 p-6">
              <h3 className="text-xl font-bold text-foreground">Your Referral Link</h3>
              <p className="mt-2 text-sm text-foreground/60">Share this link to give your friends a discount and earn rewards.</p>
              <div className="my-4 flex items-center rounded-lg border border-gold/30 bg-foreground/5 p-2">
                <input className="w-full bg-transparent text-sm text-gold focus:outline-none" readOnly type="text" value={referralData.link} />
                <Button className="shrink-0 font-semibold" size="sm">
                  <Copy className="mr-2 size-4" />
                  Copy Link
                </Button>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <p className="text-sm font-semibold text-foreground/80">Share via:</p>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline">
                    <Mail className="size-4" />
                  </Button>
                </div>
              </div>
            </CardBorder>
          </div>

          {/* Your Stats */}
          <div className="lg:col-span-2">
            <CardBorder className="h-full items-start border-gold/50 bg-background/30 p-6">
              <h3 className="text-xl font-bold text-foreground">Your Referral Stats</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-foreground/5 p-3">
                  <span className="text-sm font-medium text-foreground/80">Friends Referred</span>
                  <span className="font-bold text-gold">{referralData.stats.referredFriends}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-foreground/5 p-3">
                  <span className="text-sm font-medium text-foreground/80">Successful Sign-ups</span>
                  <span className="font-bold text-gold">{referralData.stats.successfulSignups}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-foreground/5 p-3">
                  <span className="text-sm font-medium text-foreground/80">Total Rewards Earned</span>
                  <span className="font-bold text-gold">{referralData.stats.rewardsEarned}</span>
                </div>
              </div>
            </CardBorder>
          </div>
        </div>
      </Container>
    </Section>
  )
}
