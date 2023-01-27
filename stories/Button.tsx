import React from 'react'
import './button.css'

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean
  /**
   * What background color to use
   */
  backgroundColor?: string
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Button contents
   */
  label: string
  /**
   * Optional click handler
   */
  onClick?: () => void
  /**
   * custom class names
   */
  classes: string
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  classes,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? 'storybook-button--primary'
    : 'storybook-button--secondary'
  return (
    // <div className="w-[100px] bg-green-800">
    //   yest
      <button
        type="button"
        // className={`bg-red-500 font-bold ${classes}`}
        className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
        style={{ backgroundColor }}
        {...props}
      >
        {label}
      </button>
    // </div>
  )
}
