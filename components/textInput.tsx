import Button from './button'

export default function TextInput({ labelText }: { labelText: string }) {
  return (
    <div className="p1">
      <form>
        <label>{labelText}</label>
        <input
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          id="username"
          type="text"
          placeholder="Username"
        />
      </form>
    </div>
  )
}
