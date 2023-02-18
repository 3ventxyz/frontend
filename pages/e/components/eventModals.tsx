import { Modal } from '../../../components/utils/modal'
import { EventModalOptions } from '../../../shared/enums/enums'
import DisplayQRCode from '../../u/components/displayQRCode'

export default function EventModals({
  showModal,
  handleOnClose,
  modalOption
}: {
  showModal: boolean
  handleOnClose: () => void
  modalOption: EventModalOptions
}) {
  // const num: number = 0
  switch (modalOption) {
    case EventModalOptions.registrationForm:
      return (
        <Modal
          visible={showModal}
          onClose={handleOnClose}
          width={'w-[500px]'}
          height={'h-[500px]'}
        >
          <div className="h-[400px] w-[400px] bg-green-300 ">
            ok let's update your new info for the event.
          </div>
        </Modal>
      )
    case EventModalOptions.seeAllAttendees:
      return (
        <Modal
          visible={showModal}
          onClose={handleOnClose}
          width={'w-[500px]'}
          height={'h-[500px]'}
        >
          <div className="h-[400px] w-[400px] bg-red-300 ">
            Showing all attendees
          </div>
        </Modal>
      )
    case EventModalOptions.viewAllPosts:
      return (
        <Modal
          visible={showModal}
          onClose={handleOnClose}
          width={'w-[500px]'}
          height={'h-[500px]'}
        >
          <div className="h-[500px] w-[500px] bg-blue-500 ">
            viewing all posts and comments
          </div>
        </Modal>
      )
    default:
      return (
        <Modal
          visible={showModal}
          onClose={handleOnClose}
          width={'w-[500px]'}
          height={'h-[500px]'}
        >
          <DisplayQRCode />
        </Modal>
      )
  }
}
