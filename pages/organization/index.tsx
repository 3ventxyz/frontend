import TextInput from '../../components/textInput'

export default function Organization() {
  return (
    <div className="flex flex-col items-stretch text-center text-[70px] font-bold text-black">
      Organization
      <TextInput
        labelText="Email"
        id="org_name"
        placeholder="contact@3vent.xyz"
        maxWidth={500}
      />
      <TextInput labelText="Password" id="org_name" placeholder="·········" />
    </div>
  )
}
