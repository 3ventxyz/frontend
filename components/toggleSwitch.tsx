import React from 'react'

const ToggleSwitch = ({
  onClick,
  label = ''
}: {
  onClick: (() => void) | undefined
  label: string
}) => {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative inline-block text-left">
        <input
          type="checkbox"
          className="checkbox hidden"
          name={label}
          id={label}
          onClick={onClick}
        />
        <label
          className="label block h-[25px] w-[50px] cursor-pointer overflow-hidden rounded-[20px] border-0 border-[#bbb]"
          htmlFor={label}
        >
          <span
            className="inner transition-margin duration-3 color-white ml-[-100%] block w-[200%] ease-in before:float-left before:box-border before:h-[36px] before:w-1/2 
before:bg-accent before:p-0 before:pl-[10px] before:text-left before:font-bold before:leading-[36px] before:text-white before:content-[''] 
after:float-left after:box-border after:h-[36px] after:w-1/2 after:bg-secondary after:text-right after:font-bold after:leading-[36px] after:text-white after:content-['']"
          />
          <span className="switch duration-3 absolute top-0 bottom-0 right-[25px] m-[5px] block w-[15px] rounded-full border-0 border-[#bbb] bg-white transition-all ease-in" />
        </label>
      </div>
    </div>
  )
}

export default ToggleSwitch
