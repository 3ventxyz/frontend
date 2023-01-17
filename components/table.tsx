import React, { useState } from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  makeStyles,
  TablePagination,
  TableSortLabel
} from '@material-ui/core'
import { AllowlistTableHeader } from '../shared/interface/common'
import { recoverAddress } from 'ethers/lib/utils'

export default function TventTable(
  list: Array<Object>,
  headCells: Array<AllowlistTableHeader>
) {
  type Order = 'asc' | 'desc' | undefined
  const pages = [5, 10, 25]
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pages[page])
  const [order, setOrder] = useState<Order>()
  const [orderBy, setOrderBy] = useState('')

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
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={() => {
                    handleSortRequest(headCell.id)
                  }}
                >
                  {headCell.label}
                </TableSortLabel>
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
/* Sorting Functions stableSort, getComparator and descendingComparator are used to sort the list of objects, in this case the list collection
I'm not sure if I'm sorting correctly on line 85 or if I'm having type errors and that's why it's not running correctly*/
  function stableSort<T>(array: Array<Object>, comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const listAfterPagingAndSorting = () => {
    return stableSort(list, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      (page + 1) * rowsPerPage
    )
  }

  return { TblContainer, TblHead, TblPagination, listAfterPagingAndSorting }
}

/*
    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
     */