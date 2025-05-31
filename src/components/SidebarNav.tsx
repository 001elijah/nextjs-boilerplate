import { Button, SidebarItem, SidebarItemInterface } from '@/components'
import { useGlobal } from '@/contexts'

export const SidebarNav = ({ items }: { items: SidebarItemInterface[] }) => {
  const { isMobile } = useGlobal()
  return (
    <nav className="flex-1 overflow-y-auto py-4">
      <div className="space-y-1 px-2">
        <div className="flex flex-column flex-wrap items-center gap-2 ml-auto">
          {isMobile && (
            <>
              <Button className="w-full">Pro</Button>
              <Button className="w-full" variant="secondary">
                SEO
              </Button>
            </>
          )}
        </div>
        {items.map((item, index) => (
          <SidebarItem item={item} key={index} />
        ))}
      </div>
    </nav>
  )
}
