import { Children, ReactElement } from 'react'

export default function CreateEventFormSection({
  title = '',
  children,
  fatherClassName = '',
  childrenClassName = '',
  id = ''
}: {
  title: string
  children: JSX.Element | JSX.Element[]
  fatherClassName?: string
  childrenClassName?: string
  id?: string
}): JSX.Element {
  return (
    <div id={id} className={fatherClassName}>
      <h4>{title}</h4>
      <hr />
      <div
        className={`
          'h-full' 
          flex flex-col space-y-3 transition-transform ${childrenClassName}`}
      >
        {children}
      </div>
    </div>
  )
}
