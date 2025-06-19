import { Button, CardBorder, Container, Input, Section, SectionTitle } from '@/components'

export default function ProfileSettingsPage() {
  return (
    <Section ariaLabel="Profile Settings" className="py-8" id="profile-settings">
      <Container>
        <SectionTitle fallbackTitle="Profile Settings" sectionTitle="Profile Settings" />
        <div className="mx-auto max-w-4xl space-y-12">
          <CardBorder className="items-start border-gold/50 bg-background/50 p-8">
            <h2 className="mb-6 text-2xl font-semibold text-foreground">Personal Information</h2>
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/80" htmlFor="username">
                  Username
                </label>
                <Input className="border-gold/50" defaultValue="CurrentUsername" id="username" name="username" type="text" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/80" htmlFor="email">
                  Email Address
                </label>
                <Input className="border-gold/50" defaultValue="user@example.com" id="email" name="email" type="email" />
              </div>
            </div>
          </CardBorder>

          <CardBorder className="items-start border-gold/50 bg-background/50 p-8">
            <h2 className="mb-6 text-2xl font-semibold text-foreground">Change Password</h2>
            <div className="w-full space-y-6">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/80" htmlFor="current-password">
                  Current Password
                </label>
                <Input className="border-gold/50" id="current-password" name="current-password" placeholder="••••••••" type="password" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/80" htmlFor="new-password">
                  New Password
                </label>
                <Input className="border-gold/50" id="new-password" name="new-password" placeholder="••••••••" type="password" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground/80" htmlFor="confirm-password">
                  Confirm New Password
                </label>
                <Input className="border-gold/50" id="confirm-password" name="confirm-password" placeholder="••••••••" type="password" />
              </div>
            </div>
          </CardBorder>

          <div className="flex justify-end">
            <Button className="border-gold/50 font-bold text-foreground transition-colors hover:bg-gold hover:text-background" size="lg" variant="outline">
              Save Changes
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
