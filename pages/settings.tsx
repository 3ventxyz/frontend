import TextInputDisplay from '../components/textInputDisplay'

export default function Settings() {
  return (
    <div className="flex flex-grow bg-secondaryBg pt-[78px]">
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-start justify-start space-y-8 px-2 sm:px-0">
        {/* TITLE AND HEADER */}
        <h3 className="w-full border-b border-disabled">Settings</h3>
        {/* PROFILE INFORMATION */}
        <div className="flex w-full flex-col space-y-5 pl-2 md:pl-8">
          <TextInputDisplay
            labelText={'Phone Number'}
            bodyText={'(222)-333-4444'}
          />
          <TextInputDisplay
            labelText={'Public Address'}
            bodyText={'0x4444...4444'}
          />
        </div>
      </div>
    </div>
  )
}
