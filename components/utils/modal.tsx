import { ReactElement } from 'react'

interface ModalProps {
  /**
   * set modal visibility
   */
  visible: boolean
  /**
   * passed function for closing modal component.
   */
  onClose: () => void
  /**
   * children that will appear inside the modal component.
   */
  children: ReactElement
  /**
   * width of the modal component.
   */
  width: string
  /**
   * height of the modal component.
   */
  height: string
}

// author: marthel
export function Modal({
  visible,
  onClose,
  children,
  width,
  height
}: ModalProps): JSX.Element {
  const handleOnClose = (e: any) => {
    if (e.target.id === 'container') {
      onClose()
    }
  }

  if (!visible) return <></>
  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 z-10 mt-[75px] flex items-center justify-center  bg-opacity-30 backdrop-blur-sm"
    >
      <div
        className={`${height} ${width} overflow-y-scroll rounded-[20px] bg-white p-2 shadow-xl`}
      >
        {children}
      </div>
    </div>
  )
}
