'use client'

import { memo } from 'react'
import FBIcon from '@/../public/icons/facebook.svg'
import InstaIcon from '@/../public/icons/instagram.svg'
import TTIcon from '@/../public/icons/tiktok.svg'
import TwitterIcon from '@/../public/icons/twitter.svg'
import YTIcon from '@/../public/icons/youtube.svg'
import { Container, Title } from '@/components'
import { useGlobal } from '@/contexts'

const socials = [
  { icon: YTIcon, link: 'https://www.youtube.com/', name: 'YouTube' },
  { icon: InstaIcon, link: 'https://instagram.com/', name: 'Instagram' },
  { icon: FBIcon, link: 'https://facebook.com/', name: 'Facebook' },
  { icon: TwitterIcon, link: 'https://twitter.com/', name: 'Twitter' },
  { icon: TTIcon, link: 'https://tiktok.com/', name: 'TikTok' }
]

export const Footer = memo(() => {
  const { title } = useGlobal()
  return (
    <footer className="py-4 mt-auto border-t">
      <Container>
        <div className="flex flex-wrap gap-8 items-center justify-between">
          <Title title={title} />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {socials.map(social => (
                <a href={social.link} key={social.name} rel="noreferrer" target="_blank">
                  {/* Render the icon as a component and apply classes */}
                  <social.icon className="text-foreground hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {title}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
})

Footer.displayName = 'Footer'
