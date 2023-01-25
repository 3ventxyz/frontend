import { Children, ReactElement } from 'react'

export default function CreateEventFormSection({
  isExpanded = false,
  title = '',
  children,
  fatherClassName='',
  childrenClassName='',
}: {
  isExpanded: boolean
  title: string
  children: JSX.Element | JSX.Element[]
  fatherClassName?:string,
  childrenClassName?:string,
}): JSX.Element {
  return (
    <div className={fatherClassName}>
      <h4>{title}</h4>
      <hr />
      <div
        className={`${
          isExpanded ? 'h-full' : 'hidden h-[0px]'
        }  flex flex-col space-y-3 transition-transform ${childrenClassName}`}
      >
        {children}
      </div>
    </div>
  )
}