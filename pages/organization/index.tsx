import TextInput from '../../components/textInput'

export default function Organization() {
  return (
    <div className="text-center text-[70px] font-bold text-black">
      Organization
      <TextInput labelText={'organization name'} />
    </div>
  )
}
