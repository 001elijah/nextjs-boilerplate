import Image from 'next/image'

interface CompanyLogoCardProps {
  logoUrl: string
}

export const CompanyLogoCard = ({ logoUrl }: CompanyLogoCardProps) => {
  return (
    <div className="p-4 h-24 w-76 rounded-lg bg-card">
      <div className="relative w-full h-full">
        <Image
          alt={`Company Logo`}
          fill
          src={logoUrl}
          style={{
            objectFit: 'contain'
          }}
        />
      </div>
    </div>
  )
}
