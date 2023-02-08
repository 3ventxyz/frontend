import { useEffect } from 'react'
import React from 'react'
interface ButtonProps {
  /**
   * text that will display on the button
   */
  text: string
  /**
   * what function will execute on clicking.
   */
  onClick?: (() => void) | undefined
  /**
   * is the butoon active or not?
   */
  active: boolean
  /**
   * what type of button will be.
   */
  type?: 'button' | 'submit' | 'reset' | undefined
  /**
   * expands the button to the whole width.
   */
  isExpanded?: boolean
  /**
   *
   */
  id?: string
  /**
   * safety lock to run when auth is needed.
   */
  auth?: boolean
  /**
   * make it reactive.
   */
  activeStyling?: boolean
}

/**
 * Primary UI Button. It will execute the passed function when pressed.
 */
export function Button({
  text,
  onClick,
  active,
  type = 'button',
  isExpanded = false,
  id = '',
  auth = false,
  activeStyling = false
}: ButtonProps) {
  if (auth) {
    return (
      <button
        id={id}
        type={type}
        disabled={!active}
        onClick={onClick}
        className={`h-[56px] items-center justify-center rounded-[16px] bg-primary px-[20px] py-[10px] text-[16px] font-bold leading-[] text-white ${
          isExpanded ? 'w-full' : 'w-fit'
        }`}
      >
        {text}
      </button>
    )
  }
  return (
    <button
      type={type}
      disabled={!active}
      onClick={onClick}
      className={`  h-[40px] items-center justify-center rounded-[6px]  px-[20px] py-[10px] text-[14px] font-semibold leading-[]  ${
        isExpanded ? 'w-full' : 'w-fit'
      } ${
        !activeStyling
          ? !active
            ? 'bg-white text-disabled'
            : 'bg-black text-white'
          : !active
          ? 'cursor-pointer bg-black text-white'
          : 'cursor-pointer bg-slate-50 text-disabled hover:bg-black hover:text-white'
      }`}
    >
      {text}
    </button>
  )
}
