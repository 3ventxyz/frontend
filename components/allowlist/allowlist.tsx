import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../contexts/auth'
import { AllowlistsInterface } from '../../shared/interface/common'
import Modal from '../utils/modal'
import CreateAllowlistForm from './createAllowlistForm'
import DeleteConfirmation from './deleteConfirmation'
import Button from '../buttons/button'
import AllowlistService from '../../services/allowlists'
import Image from 'next/image'
import absoluteUrl from 'next-absolute-url'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@mui/material'

export default function Allowlists() {
  const auth = useAuth()
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [allowlists, setAllowlists] = useState<AllowlistsInterface>([])
  const [currentAllowlist, setCurrentAllowlist] = useState<string | undefined>()
  const allowlistService = new AllowlistService()
  const { origin } = absoluteUrl()

  useEffect(() => {
    getAllowlists()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getAllowlists = async () => {
    const allowlists = await allowlistService.getUserAllowlists(
      auth.currentUser?.uid ?? ''
    )
    setAllowlists(allowlists)
  }

  const deleteAllowlist = async (id: string | undefined) => {
    var response = await allowlistService.delete(
      id,
      auth.currentUser?.uid ?? ''
    )
    console.log(response.message)
    router.push('/allowlists')
  }

  return (
    <>
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center space-y-[20px] bg-secondaryBg">
        <div className="mx-auto flex w-full  flex-row items-center justify-between border-b border-disabled pb-2">
          <p className="text-[25px] font-bold md:text-[32px]">
            your allowlists
          </p>
          <Button
            text={'Create Allowlist'}
            active={true}
            onClick={() => router.push('allowlists/create')}
          />
        </div>
        <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg">
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-50">
                  <TableCell>
                    <span className="text-xs font-bold uppercase text-gray-700">
                      name
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-bold uppercase text-gray-700">
                      # entries
                    </span>
                  </TableCell>
                  <TableCell align="center">
                    <span className="text-xs font-bold uppercase text-gray-700">
                      application link
                    </span>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allowlists.map((e, i) => (
                  <TableRow key={i}>
                    <TableCell
                    align="left"
                      key={i}
                      onClick={() =>
                        router.push(`allowlists/${e.allowlist_id}`)
                      }
                      padding="none"
                    >
                      <span className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 text-left">
                        {e.title}
                      </span>
                    </TableCell>
                    <TableCell key={i} align="left">
                      <span className="py-4 px-6 text-sm text-gray-500 text-left">
                        {e.allowlist.length}
                      </span>
                    </TableCell>
                    <TableCell key={i} align="left">
                      <span className="hover:cursor-default whitespace-nowrap py-4 px-6 font-medium text-sm text-gray-500 text-left">{`${origin}/apply?id=${e.allowlist_id}`}</span>
                    <Image
                      className="hover:cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${origin}/apply?id=${e.allowlist_id}`
                        )
                        alert('Text copied')
                      }}
                      alt="copy"
                      src="/assets/copy.svg"
                      height="20"
                      width="20"
                    />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
          onConfirm={() =>
            allowlistService.delete(
              currentAllowlist,
              auth.currentUser?.uid ?? ''
            )
          }
          onClose={() => {
            getAllowlists()
            setShowDeleteModal(false)
          }}
          text="Are you sure you want to delete?"
        />
      </Modal>
    </>
  )
}
