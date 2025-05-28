export const CaseInfo = ({ icon, isLastItem, label, text }: { icon: React.ReactNode; isLastItem: boolean; label: string; text: string | string[] }) => {
  return (
    <div className={`w-full flex md:flex-col items-start gap-1 text-lg sm:text-xl ${isLastItem ? '' : 'mb-2'}`}>
      <div className="flex items-center gap-1 mr-4">
        {icon}
        <span className="text-primary">{label}</span>
      </div>
      <div className="w-full text-start text-xl md:text-lg">
        {typeof text === 'string' ? (
          <p>{text}</p>
        ) : (
          <ul>
            {text?.map((textItem, index) => (
              <li key={index}>
                <p>{textItem}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
