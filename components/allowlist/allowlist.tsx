import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../../contexts/auth'
import {
  AllowlistsInterface,
  AllowlistInterface
} from '../../shared/interface/common'
import { Modal } from '../utils/modal'
import DeleteConfirmation from './deleteConfirmation'
import { Button } from '../buttons/button'
import AllowlistService from '../../services/allowlists'
import Image from 'next/image'
import absoluteUrl from 'next-absolute-url'
import { TableBody, TableRow, TableCell } from '@mui/material'
import TventTable from '../table'

export default function Allowlists() {
  const auth = useAuth()
  const router = useRouter()
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

  const allowlistIndexHeader = [
    { id: 'AllowlistName', label: 'Name', disableSorting: false, display: true },
    { id: 'AllowlistEntries', label: 'Entries', disableSorting: false, display: true },
    { id: 'AllowlistLink', label: 'Application Link', disableSorting: true, display: true }
  ]

  const { TblContainer, TblHead, TblPagination, listAfterPagingAndSorting } =
    TventTable(allowlists, allowlistIndexHeader)

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
          <TblContainer>
            <TblHead />
            <TableBody>
              {listAfterPagingAndSorting().map(
                (list: AllowlistInterface, i) => (
                  <TableRow key={i} className="bg-white">
                    <TableCell>
                      <a href={`/allowlists/${list.allowlist_id}`}>
                        <span className="text-gray-900">{list.title}</span>
                      </a>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-500">
                        {list.allowlist.length}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Image
                        className="hover:cursor-pointer"
                        onClick={async () => {
                          navigator.clipboard.writeText(
                            `${origin}/apply?id=${list.allowlist_id}`
                          )
                          let text = await navigator.clipboard.readText()
                          console.log(text)
                          alert('Text copied')
                        }}
                        alt="copy"
                        src="/assets/copy.svg"
                        height="20"
                        width="20"
                      />
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
            <TblPagination />
          </TblContainer>
        </div>
      </div>
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
