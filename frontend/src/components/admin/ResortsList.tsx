import { useState } from 'react'
import {
  useAcceptResortMutation,
  useGetResortsQuery,
  useManageBlockUnblockResortMutation,
  useRejectResortMutation
} from '../../slices/adminApiSlice'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table'
import { isApiError } from '../../utils/errorHandling';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { IResort } from '../../types/types';




export default function ResortDataTable() {

  const { data: resorts = [] } = useGetResortsQuery(undefined)
  const [acceptResort] = useAcceptResortMutation()
  const [rejectResort] = useRejectResortMutation()
  const [manageResortBlock] = useManageBlockUnblockResortMutation()
  const [globalFilter, setGlobalFilter] = useState('')
  const [pageSize, setPageSize] = useState(10)


  const acceptResortHandler = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'Do you want to accept this resort?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, accept it!',
        cancelButtonText: 'Cancel',
      });

      if (result.isConfirmed) {
        const res = await acceptResort(id).unwrap()
        if (res.success) {
          toast(<div className='text-green-600'>The resort has been accepted.</div>)
        }
      }
    } catch (err) {
      if (isApiError(err)) {
        toast(<div className="text-red-600">{err.data.message || "Internal Server Error"}</div>)
      } else {
        console.log('An unexpected error occurred:', err)
      }
    }
  }

  const rejectResortHandler = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: 'Reject Resort',
        input: 'textarea',
        inputLabel: 'Reason for rejection',
        inputPlaceholder: 'Type your reason here...',
        inputValidator: (value) => {
          if (!value) {
            return 'You need to provide a reason!';
          }
        },
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, reject it!',
        cancelButtonText: 'Cancel',
      });

      if (result.isConfirmed && result.value) {
        const reason: string = result.value
        const res = await rejectResort({ resortId: id, reason }).unwrap()
        if (res.success) {
          toast(<div className='text-green-600'>The resort has been rejected.</div>)
        }
      }
    } catch (err) {
      if (isApiError(err)) {
        toast(<div className="text-red-600">{err.data.message || "Internal Server Error"}</div>)
      } else {
        console.log('An unexpected error occurred:', err)
      }
    }
  }

  const handleBlockUnblock = async (resortId: string, status: boolean) => {
    const action = status ? 'Block' : 'Unblock'
    const result = await Swal.fire({
      title: `Are you sure you want to ${action} this user?`,
      text: `This user will be ${action.toLowerCase()}ed.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: status ? '#d33' : '#3085d6',
      cancelButtonColor: '#aaa',
      confirmButtonText: `Yes, ${action} them!`
    });

    if (result.isConfirmed) {
      try {

        const response = await manageResortBlock({ id: resortId, status }).unwrap()
        if (response.success) {
          toast(`The user has been ${action.toLowerCase()}ed successfully.`)
        }
      } catch (err) {
        console.error(`Error :`, err)
        toast(`There was a problem ${action.toLowerCase()}ing the user.`)
      }
    }
  }

  const columns: ColumnDef<IResort>[] = [
    {
      accessorKey: 'resortName',
      header: 'Resort Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'city',
      header: 'City',
    },
    {
      header: 'Status',
      cell: ({ row }) => (
        <span
          className={`${row.original.isVerify ? 'text-green-600 font-bold' : 'text-red-600 font-bold'
            }`}
        >
          {row.original.isVerify ? 'Verified' : 'Unverified'}
        </span>
      ),
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div>
          {row.original.isVerify == false ? (<>
            <button
              onClick={() => acceptResortHandler(row.original._id!)}
              className="text-white hover:bg-green-400 bg-green-600 rounded-sm p-1 mr-1"
            >
              Accept
            </button>
            <button
              onClick={() => rejectResortHandler(row.original._id!)}
              className="text-white bg-red-600 hover:bg-red-400  rounded-sm p-1"
            >
              Reject
            </button>
          </>): <span className='font-semibold'>Responded</span>}
          <button
            onClick={() => handleBlockUnblock(row.original._id!, !row.original.isBlock)}
            className={`px-3 py-1 text-sm rounded ms-2 ${row.original.isBlock
              ? 'bg-red-600 text-white hover:bg-red-400'
              : 'bg-green-600 text-white hover:bg-green-400'
              }`}
          >
            {row.original.isBlock ? 'Unblock' : 'Block'}
          </button>
        </div>
      ),
    },
  ]


  const table = useReactTable({
    data: resorts,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })


  return (
    <div className="p-1 mt-16 flex justify-center w-full">
      <div>
        <ToastContainer />
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Search..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="border p-2 rounded-md w-1/3"
          />
          <div>
            <label>Show </label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="border p-2 rounded-md"
            >
              {[10, 20, 30, 40, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <label> entries</label>
          </div>
        </div>

        <div className="rounded-md border-2 w-full overflow-x-auto">
          <Table className='min-w-full'>
            <TableHeader className='bg-blue-100 h-12'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className='text-balck'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} className='h-10'>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-4 py-2 bg-gray-300 rounded "
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-4 py-2 bg-gray-300 rounded "
            >
              Next
            </button>
          </div>
          <div>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
        </div>
      </div>
    </div>
  )
}

