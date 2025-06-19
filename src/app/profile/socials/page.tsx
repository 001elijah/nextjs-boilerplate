import { Plus, Settings } from 'lucide-react'
import { SVGProps } from 'react'
import { Button, CardBorder, Container, Section, SectionTitle } from '@/components'

const InstagramIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" />
  </svg>
)

const FacebookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height="24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const Switch = ({ defaultChecked, disabled, id }: { defaultChecked?: boolean; disabled?: boolean; id: string }) => {
  return (
    <label className="relative inline-flex cursor-pointer items-center" htmlFor={id}>
      <input className="peer sr-only" defaultChecked={defaultChecked} disabled={disabled} id={id} type="checkbox" />
      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:content-[''] peer-checked:bg-gold peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 peer-focus:ring-gold/50 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-gold/80"></div>
    </label>
  )
}

const socialAccounts = [
  {
    connected: true,
    icon: <InstagramIcon className="size-8 text-[#E1306C]" />,
    name: 'Instagram',
    username: '@your-username'
  },
  {
    connected: true,
    icon: <FacebookIcon className="size-8 text-[#1877F2]" />,
    name: 'Facebook',
    username: 'your.username'
  }
]

const upcomingPosts = [
  {
    content: 'Our summer sale is now live! Get up to 50% off on selected items. #SummerSale',
    date: 'June 25, 2025',
    platform: 'Instagram',
    time: '3:00 PM'
  },
  {
    content: 'Check out our latest blog post on the top 10 marketing trends for 2025.',
    date: 'June 27, 2025',
    platform: 'Facebook',
    time: '10:00 AM'
  },
  {
    content: 'A behind-the-scenes look at our new collection coming soon!',
    date: 'June 29, 2025',
    platform: 'Instagram',
    time: '5:00 PM'
  }
]

export default function SocialsPage() {
  return (
    <Section ariaLabel="Socials" className="py-8" id="socials">
      <Container>
        <div className="flex items-center justify-between">
          <SectionTitle fallbackTitle="Socials" sectionTitle="Connected Socials" />
          <Button className="border-gold font-bold text-foreground hover:bg-gold" variant="outline">
            <Plus className="-ml-1 mr-2 size-4" />
            Add Account
          </Button>
        </div>
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {socialAccounts.map(account => (
            <CardBorder className="items-start border-gold/50 bg-background/30 p-6" key={account.name}>
              <div className="flex w-full items-start justify-between">
                <div className="flex items-center gap-4">
                  {account.icon}
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{account.name}</h3>
                    {account.connected ? (
                      <p className="text-sm text-foreground/60">{account.username}</p>
                    ) : (
                      <p className="text-sm text-yellow-400/80">Not Connected</p>
                    )}
                  </div>
                </div>
                {account.connected && <Settings className="size-4 text-foreground/60" />}
              </div>
              <div className="mt-4 flex w-full items-center justify-between pt-4">
                <div className="flex items-center gap-2">
                  <Switch defaultChecked={account.connected} disabled={!account.connected} id={`autopost-${account.name}`} />
                  <label className="text-sm font-medium text-foreground/80" htmlFor={`autopost-${account.name}`}>
                    Autoposting
                  </label>
                </div>
                <Button className="font-semibold" size="sm" variant={account.connected ? 'destructive' : 'default'}>
                  {account.connected ? 'Disconnect' : 'Connect'}
                </Button>
              </div>
            </CardBorder>
          ))}
        </div>

        <SectionTitle fallbackTitle="Schedule" sectionTitle="Autoposting Schedule" />
        <CardBorder className="w-full items-start border-gold/50 bg-background/30 p-6">
          <div className="space-y-6">
            {upcomingPosts.map((post, index) => (
              <div className="flex items-start gap-4 border-b border-gold/20 pb-6 last:border-b-0 last:pb-0" key={index}>
                <div className="flex-shrink-0 text-center">
                  {post.platform === 'Instagram' ? (
                    <InstagramIcon className="mx-auto size-6 text-[#E1306C]" />
                  ) : (
                    <FacebookIcon className="mx-auto size-6 text-[#1877F2]" />
                  )}
                  <p className="mt-1 text-xs text-foreground/60">{post.platform}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground/90">{post.content}</p>
                  <p className="mt-2 text-xs font-semibold text-gold">
                    {post.date} at {post.time}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost">
                    Edit
                  </Button>
                  <Button className="text-destructive/80 hover:text-destructive" size="sm" variant="ghost">
                    Cancel
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardBorder>
      </Container>
    </Section>
  )
}
