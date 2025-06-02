export const SectionTitle = ({ fallbackTitle, sectionTitle }: { fallbackTitle: string; sectionTitle: string }) => {
  return <h2 className="text-2xl font-bold tracking-tighter text-center sm:text-3xl md:text-4xl mb-12">{sectionTitle || fallbackTitle}</h2>
}
