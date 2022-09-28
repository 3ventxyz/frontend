import { useEffect, useState } from 'react'
import { db } from '../../services/firebase_config'
import { useEvents } from '../../contexts/events'
import { useAuth } from '../../contexts/auth'
import { EventInterface } from '../../shared/interface/common'
import { useRouter, Router } from 'next/router'
import Button from '../../components/button'
import EventTile from '../../components/eventTile'
import { collection, deleteDoc, doc, getDocs } from '@firebase/firestore'
import { AllowlistsInterface } from '../../shared/interface/common'
import Image from 'next/image'
import Modal from '../../components/modal'
import CreateAllowlistForm from '../allowlists/components/createAllowlistForm'
import DeleteConfirmation from '../allowlists/components/deleteConfirmation'

export default function Creator() {
  const events = useEvents()
  const auth = useAuth()
  const [fetched, setFetched] = useState(false)
  const [allowlists, setAllowlists] = useState<AllowlistsInterface>([])
  const listsCollectionRef = collection(db, 'lists')
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [currentAllowlist, setCurrentAllowlist] = useState<string | undefined>()

  useEffect(() => {
    const fetchData = async () => {
      let createdEventsData: any
      try {
        const userDocRef = doc(db, 'users', auth.uid)
        if (!events.cachedUpcomingEvents) {
          createdEventsData = await events.fetchEventsData({
            collectionRef: collection(userDocRef, 'upcoming_events')
          })
          events.cacheUpcomingEvents(createdEventsData)
        }
        setFetched(true)
      } catch (e: any) {
        console.log('dashboard: error in retrieving data event')
        console.log(e)
        console.log('=========================================')
      }
    }
    if (!fetched) {
      fetchData()
    }
  }, [])

  useEffect(() => {
    getAllowlists()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAllowlists = async () => {
    const data = await getDocs(listsCollectionRef)

    setAllowlists(
      // Get user allowlists
      data.docs
        .map((doc) => ({
          uid: doc.data().uid.id,
          title: doc.data().title,
          description: doc.data().description,
          allowlist_id: doc.id,
          allowlist: doc.data().allowlist,
          merkle_root: doc.data().merkle_root
        }))
        .filter((doc) => doc.uid === auth.uid)
    )
  }

  const deleteAllowlist = async (id: string | undefined) => {
    if (id) {
      await deleteDoc(doc(db, 'lists', id))
      await getAllowlists()
    }
  }

  return (
    <div className="flex w-screen flex-col space-y-[35px] bg-secondaryBg px-[20px] pb-[106px] pt-[35px] text-center md:px-[112px]">
      <CreatedEventsDisplay
        title={'your created events'}
        eventsData={events.cachedUpcomingEvents}
        isFetching={!fetched}
      />
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center space-y-[20px]">
        <div className="mx-auto flex w-full  flex-row items-end justify-between border-b border-disabled pb-2">
          <p className="text-[25px] font-bold md:text-[32px]">
            your allowlists
          </p>
          <Button
            text={'Create an Allowlist'}
            active={true}
            onClick={() => setShowModal(true)}
          />
        </div>
        <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm text-gray-500 ">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700  ">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Allowlist
                </th>
                <th scope="col" className="py-3 px-6">
                  # addresses
                </th>
                <th scope="col" className="py-3 px-6 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allowlists.map((e, i) => (
                <tr
                  key={i}
                  onClick={() => router.push(`allowlists/${e.allowlist_id}`)}
                  className="cursor-pointer border-b bg-white hover:bg-gray-50"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 "
                  >
                    {e.title}
                  </th>
                  <td className="py-4 px-6">{e.allowlist.length}</td>
                  <td className="flex flex-row justify-end py-4 px-6">
                    <div className="flex w-[50px] flex-row justify-between">
                      <Image
                        onClick={() =>
                          router.push(`allowlists/${e.allowlist_id}`)
                        }
                        alt="details"
                        src="/assets/eye.svg"
                        height="20"
                        width="20"
                      />
                      <Image
                        onClick={() => {
                          setCurrentAllowlist(e?.allowlist_id)
                          setShowDeleteModal(true)
                        }}
                        alt="delete"
                        src="/assets/trash.svg"
                        height="20"
                        width="20"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        visible={showModal}
        onClose={() => setShowModal(false)}
        width="w-3/4"
        height=""
      >
        <CreateAllowlistForm
          onSuccess={() => {
            getAllowlists()
            setShowModal(false)
          }}
        />
      </Modal>
      <Modal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        width=""
        height=""
      >
        <DeleteConfirmation
          onConfirm={() => deleteAllowlist(currentAllowlist)}
          onClose={() => setShowDeleteModal(false)}
          text="Are you sure you want to delete?"
        />
      </Modal>
    </div>
  )
}

function CreatedEventsDisplay({
  title,
  eventsData,
  isFetching
}: {
  title: string
  eventsData: EventInterface[] | null
  isFetching: boolean
}) {
  const titleSectionStyle = 'text-[25px] md:text-[32px] font-bold'
  const router = useRouter()

  return (
    <div className="flex flex-col items-center space-y-[20px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-row items-center justify-between border-b border-disabled pb-2">
        <p className={titleSectionStyle}>{title}</p>
        <Button
          text={'Create an Event'}
          active={true}
          onClick={() => {
            router.push('/e/create')
          }}
        />
      </div>
      {isFetching ? (
        <div className="grid h-fit w-fit grid-cols-1 place-content-center gap-[30px] lg:grid-cols-2 2xl:grid-cols-3">
          <EventTile eventData={null} />
          <EventTile eventData={null} />
          <EventTile eventData={null} />
        </div>
      ) : eventsData?.length === 0 ? (
        <div className="flex w-full flex-col items-center justify-center space-y-4">
          <h4>
            You haven&apos;t created any events yet!{' '}
            <span
              onClick={() => {
                router.push('/e/create')
              }}
              className="cursor-pointer text-blue-500 hover:underline"
            >
              Start here.
            </span>
          </h4>
        </div>
      ) : (
        <div className="grid h-fit w-fit grid-cols-1 place-content-center gap-[30px] lg:grid-cols-2 2xl:grid-cols-3">
          {eventsData &&
            eventsData.map((eventData, index) => {
              return <EventTile key={index.toString()} eventData={eventData} />
            })}
        </div>
      )}
    </div>
  )
}
