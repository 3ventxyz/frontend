import React, { useState } from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  TableSortLabel
} from '@material-ui/core'
import { AllowlistTableHeader, AllowlistInterface } from '../shared/interface/common'

export default function TventTable(
  list: Array<AllowlistInterface>,
  headCells: Array<AllowlistTableHeader>
) {
  type Order = 'asc' | 'desc' | undefined
  const pages = [5, 10, 25]
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pages[page])
  const [order, setOrder] = useState<Order>()
  const [orderBy, setOrderBy] = useState("")

  const TblContainer = (props: any) => {
    return <Table>{props.children}</Table>
  }

  const TblHead = (props: any) => {
    const handleSortRequest = (cellId: string) => {
      const isAsc = orderBy === cellId && order === "asc";
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(cellId)
  }
    return (
      <TableHead>
        <TableRow className="bg-gray-50">
          {headCells.map((headCell) => (
            <TableCell key={headCell.id}>
              <span className="text-xs font-bold uppercase text-gray-700">
                {headCell.disableSorting?headCell.label:
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={() => {
                    handleSortRequest(headCell.id)
                  }}
                >
                  {headCell.label}
                </TableSortLabel>}
              </span>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const TblPagination = () => (
    <TablePagination
      rowsPerPageOptions={pages}
      component="div"
      count={list.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  )
  function stableSort<AllowlistsInterface>(array: Array<AllowlistsInterface>, comparator: (a: AllowlistInterface, b: AllowlistInterface) => number) {
    
    const stabilizedThis = array.map((el, index) => [el, index] as [AllowlistInterface, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function compareEntries(
    order: Order,
    orderBy: string,
  ): (
    a: AllowlistInterface,
    b: AllowlistInterface
  ) => number {
    return order === 'desc'
      ? (a, b) => allowlistLengthComparator(a, b)
      : (a, b) => -allowlistLengthComparator(a, b);
  }

  function allowlistLengthComparator(a: AllowlistInterface, b: AllowlistInterface) {
    if (b.allowlist.length < a.allowlist.length) {
      return -1;
    }
    if (b.allowlist.length > a.allowlist.length) {
      return 1;
    }
    return 0;
  }

  function compareNames(
    order: Order,
    orderBy: string,
  ): (
    a: AllowlistInterface,
    b: AllowlistInterface
  ) => number {
    return order === 'desc'
      ? (a, b) => allowlistNameComparator(a, b)
      : (a, b) => -allowlistNameComparator(a, b);
  }

  function allowlistNameComparator(a: AllowlistInterface, b: AllowlistInterface) {
    if (b.title < a.title) {
      return -1;
    }
    if (b.title > a.title) {
      return 1;
    }
    return 0;
  }

  const listAfterPagingAndSorting = () => {
    if(orderBy === 'AllowlistName') {
      return stableSort(list, compareNames(order, orderBy)).slice(
        page * rowsPerPage,
        (page + 1) * rowsPerPage
      )
    }
    return stableSort(list, compareEntries(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    )
  }

  return { TblContainer, TblHead, TblPagination, listAfterPagingAndSorting }
}
