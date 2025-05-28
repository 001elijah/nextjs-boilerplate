import { SidebarItem, SidebarItemInterface } from '@/components'

export const SidebarNav = ({ items }: { items: SidebarItemInterface[] }) => {
  return (
    <nav className="flex-1 overflow-y-auto py-4">
      <div className="space-y-1 px-2">
        {items.map((item, index) => (
          <SidebarItem item={item} key={index} />
        ))}
      </div>
    </nav>
  )
}
