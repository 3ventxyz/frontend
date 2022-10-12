import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  .checkbox:checked + .label .inner {
    margin-left: 0;
  }
  .checkbox:checked + .label .switch {
    right: 0px;
  }
`

const ToggleSwitch = ({
  onClick,
  label = ''
}: {
  onClick: (() => void) | undefined
  label: string
}) => {
  return (
    <Container>
      <div className="container flex items-center space-x-4">
        <div
          className="toggle-switch relative inline-block text-left"
        >
          <input
            type="checkbox"
            className="checkbox hidden"
            name={label}
            id={label}
            onClick={onClick}
          />
          <label
            className="label block cursor-pointer overflow-hidden rounded-[20px] border-0 border-[#bbb]"
            htmlFor={label}
          >
            <span
              className="inner transition-margin duration-3 after:color-white before:color-white ml-[-100%] block w-[200%] ease-in before:float-left before:box-border before:h-[36px] before:w-1/2 
before:bg-primary before:p-0 before:pl-[10px] before:text-left before:font-bold before:leading-[36px] before:text-white before:content-['Yes'] after:float-left after:box-border after:h-[36px]  after:w-1/2 after:bg-secondary after:p-0 after:pr-[14px] after:text-right after:font-bold after:leading-[36px] after:text-white after:content-['No']"
            />
            <span className="switch duration-3 absolute top-0 bottom-0 right-[40px] m-[5px] block w-[24px] rounded-[20px] border-0 border-[#bbb] bg-white transition-all ease-in" />
          </label>
        </div>
      </div>
    </Container>
  )
}

export default ToggleSwitch
