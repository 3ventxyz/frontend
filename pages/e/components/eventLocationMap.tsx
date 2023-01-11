import Image from 'next/image'
export default function EventLocationMap({
  lat,
  long
}: {
  lat: number
  long: number
}) {
  return lat === 0 && long === 0 ? (
    <></>
  ) : (
    <div className="relative h-[150px] max-w-[600px] rounded-2xl border-[1px] border-solid border-gray bg-gray-50">
      <a
        rel="noreferrer noopener"
        target="_blank"
        href={`http://maps.google.com?q=${lat},${long}`}
      >
        <Image
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${long}&zoom=15&size=410x160&markers=size:mid%color:blue%7Clabel:E%7C${lat},${long}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`}
          layout="fill"
          loading="lazy"
          objectFit="cover"
          className="rounded-[20px]"
        />
      </a>
    </div>
  )
}
