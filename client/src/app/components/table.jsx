'use client'

import { useState, useEffect, useMemo } from 'react';
import DebouncedInput from './Base/debouncedInput';
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	getSortedRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
  } from '@tanstack/react-table'
  import {
	rankItem,
} from '@tanstack/match-sorter-utils'
import Button from './Base/button'
import { handlePagination } from '@/app/Utilities/table';
import Select from 'react-select';
import EmptyMsg from './emptyMsg';

const Table = ({data, col, panel, panelConfig, additionalBtns}) => {
    const [globalFilter, setGlobalFilter] = useState('')
    const [paginationRows, setPaginationRows] = useState([])

    const columns = useMemo(
		() =>  [...col]
	, [])
    

    const fuzzyFilter = (row, columnId, value, addMeta) => {
		// Rank the item
		const itemRank = rankItem(row.getValue(columnId), value)
		// Store the itemRank info
		addMeta({
		  itemRank,
		})
		// Return if the item should be filtered in/out
		return itemRank.passed
	}

    const table = useReactTable({
		data,
		columns,
		state: {globalFilter},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onGlobalFilterChange: setGlobalFilter,
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		globalFilterFn: fuzzyFilter
	})

    useEffect(() => {
        let data = handlePagination(table)
        setPaginationRows(data)
	}, [table.getPageCount(), table.getState().pagination.pageIndex])
    
    const handlePanel = (head, footer) => {
        panel.setPanelOpen(!panel.panelOpen)
        panelConfig.setPanel({panelHeader: head, panelFooter: footer, panelType: 'Add'})
    }
    return <>   
            <div>
                <div className='flex justify-between items-center mt-8'>
                    <div className='flex items-center'>
                        <DebouncedInput
                            value={globalFilter ?? ''}
                            onChange={value => setGlobalFilter(String(value))}
                            className="p-2 font-lg shadow border border-block"
                            placeholder="Search all columns..."
                        /> 
                    </div>
                    {
                        additionalBtns ?
                        <div className='flex'>
                            <Button type='primary' className='btn-primary' name='New Job' icon={''} onClick={() => handlePanel('Add New Job', "Add", "Add")} />
                        </div>
                        : ''
                    }
                </div>
                {
                        data?.length ?
                        <>      
                        <div className='overflow-auto'>
                            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-5 rounded shadow border-2'>
                                <thead className='text-xs text-gray-700 border-b dark:border-gray-400 uppercase'>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id}>
                                    {headerGroup.headers.map(header => (
                                        <th className='px-6 py-3 border-r dark:border-gray-400' key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : (
                                                <>
                                                    <div
                                                        {...{
                                                            className: header.column.getCanSort()
                                                            ? 'cursor-pointer select-none'
                                                            : '',
                                                            onClick: header.column.getToggleSortingHandler(),
                                                        }}
                                                    >
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                        {{
                                                        asc: ' 🔼',
                                                        desc: ' 🔽',
                                                    }[header.column.getIsSorted()] ?? null}
                                                    </div>
                                                </>
                                            )}
                                                </th>
                                        ))}
                                    </tr>
                                ))}
                                </thead>
                                <tbody>
                                {table.getRowModel().rows.map(row => (
                                    <tr className='border-b dark:border-gray-400' key={row.id}>
                                    {row.getVisibleCells().map(cell => (
                                        <td className='px-6 py-4 border-r dark:border-gray-400' key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="hidden mt-4 sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div className='flex items-center'>
                                <div>
                                    <p>Page <span className='font-bold'>{table.getState().pagination.pageIndex + 1}</span> of <span className='font-bold'>{table.getPageCount()} |</span></p> 
                                </div>
                                <div className='flex items-center ml-2'>
                                    <label>Show</label>
                                    <Select 
                                        className='ml-2'
                                        options={[{label:10, value:10},{label:20, value:20},{label:30, value:30},{label:40, value:40},{label:50, value:50},]}
                                        components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                                        defaultValue={{label:10, value:10}}
                                        placeholder=' '
                                        onChange={val => {
                                            table.setPageSize(Number(val.value))
                                        }} />
                                </div>
                                
                            </div>
                            <div>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                    <a href="#" className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}>
                                        <span className="sr-only">Previous</span>
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                    {paginationRows}
                                    <a href="#" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                        onClick={() => table.nextPage()}
                                        disabled>
                                        <span className="sr-only">Next</span>
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </nav>
                            </div>
                        </div>
                        </>
                    :
                    <EmptyMsg icon={<BuildingOffice2Icon className="h-60" />} msg={'No results found'}/>
                }
            </div>
        </>
}

export default Table