'use client'

import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Filter, ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Column<T> = {
  field: string
  headerName: string
  flex?: number
  sortable?: boolean
  filterable?: boolean
  renderCell?: (params: { row: T }) => React.ReactNode
  valueGetter?: (params: { row: T }) => string | number
}

export type DataTableProps<T> = {
  columns: Column<T>[]
  rows: T[]
  noRowsContent?: React.ReactNode
  className?: string
}

export function DataTable<T extends { id: string | number }>({ columns, rows, noRowsContent, className }: DataTableProps<T>) {
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [filterOpen, setFilterOpen] = useState<Record<string, boolean>>({})

  // Handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // Handle filtering
  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Apply filters and sorting
  const filteredRows = rows.filter((row) => {
    return Object.entries(filters).every(([field, filterValue]) => {
      if (!filterValue) return true

      const column = columns.find((col) => col.field === field)
      if (!column) return true

      const value = column.valueGetter ? column.valueGetter({ row }) : (row as any)[field]

      return String(value).toLowerCase().includes(filterValue.toLowerCase())
    })
  })

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (!sortField) return 0

    const column = columns.find((col) => col.field === sortField)
    if (!column) return 0

    const aValue = column.valueGetter ? column.valueGetter({ row: a }) : (a as any)[sortField]

    const bValue = column.valueGetter ? column.valueGetter({ row: b }) : (b as any)[sortField]

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  // Render sort icon
  const renderSortIcon = (field: string) => {
    if (sortField !== field) return <ChevronsUpDown className="ml-2 h-4 w-4" />
    return sortDirection === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
  }

  return (
    <div className={cn('rounded-md border border-border', className)}>
      <div className="flex justify-between p-2 border-b border-border">
        <div className="flex items-center">
          <Button variant="outline" size="sm" className="h-8 gap-1 border-border">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="relative overflow-auto min-h-[300px]">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.field} className={cn('relative', column.flex && `w-[${column.flex * 100}%]`)}>
                  <div className="flex items-center">
                    <span>{column.headerName}</span>
                    {column.sortable !== false && (
                      <button className="ml-1 focus:outline-none" onClick={() => handleSort(column.field)}>
                        {renderSortIcon(column.field)}
                      </button>
                    )}
                  </div>

                  {column.filterable !== false && (
                    <DropdownMenu
                      open={filterOpen[column.field]}
                      onOpenChange={(open) => setFilterOpen((prev) => ({ ...prev, [column.field]: open }))}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 absolute right-2 top-1/2 -translate-y-1/2">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[200px] p-2">
                        <Input
                          placeholder={`Filter ${column.headerName}...`}
                          value={filters[column.field] || ''}
                          onChange={(e) => handleFilterChange(column.field, e.target.value)}
                          className="mb-2"
                        />
                        <DropdownMenuItem onClick={() => handleFilterChange(column.field, '')} className="justify-center text-center">
                          Clear
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRows.length > 0 ? (
              sortedRows.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={`${row.id}-${column.field}`}>
                      {column.renderCell
                        ? column.renderCell({ row })
                        : column.valueGetter
                          ? column.valueGetter({ row })
                          : (row as any)[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {noRowsContent || 'No results.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
