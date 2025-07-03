import React from 'react'
import { Typography } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import { DataTable, Column } from '@/components/ui/data-table'

import { DashboardReportsComponentProps } from './Reports.types'

const getDocumentName = (s3Key: string) => {
  const split = s3Key.split('_')
  split.splice(0, 1)
  return split.join('_')
}

function CustomNoRowsOverlay() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-4/5 box-border p-4">
        <Typography className="text-center">
          For vaults with tax tracking enabled: Recipients will be prompted to complete W9/W8-BEN forms, and 1099s will generate for payments over 600 USDC. All tax forms will appear here.
        </Typography>
      </div>
    </div>
  )
}

export const DashboardReportsComponent: React.FC<DashboardReportsComponentProps> = ({
  taxForms,
  taxFormId,
  handleRequestAccess,
  isRequestAccessLoading,
}) => {
  const columns: Column<any>[] = [
    {
      field: 's3Key',
      headerName: 'Name',
      valueGetter: (params) => getDocumentName(params.row.s3Key),
      flex: 1,
    },
    {
      field: 'formType',
      headerName: 'Document type',
      flex: 1,
    },
    {
      field: 'vaultName',
      headerName: 'Vault',
      flex: 1,
    },
    {
      field: 'taxYear',
      headerName: 'Year',
      flex: 1,
    },
    {
      field: 'download',
      headerName: 'Download document',
      renderCell: (params) => (
        <Button
          variant="outline"
          size="sm"
          disabled={isRequestAccessLoading && taxFormId === params.row.id}
          onClick={() => handleRequestAccess(params.row.id)}
          className="text-xs rounded py-1 px-2.5"
        >
          Request Access
        </Button>
      ),
      flex: 1,
      sortable: false,
      filterable: false,
    },
  ]

  const rows = taxForms.map((taxForm) => {
    return {
      id: taxForm.id,
      s3Key: taxForm.s3Key,
      formType: taxForm.formType,
      vaultName: taxForm.projectName,
      taxYear: taxForm.taxYear,
    }
  })

  return (
    <div className="font-sans">
      <DataTable
        columns={columns}
        rows={rows}
        noRowsContent={<CustomNoRowsOverlay />}
        className="min-h-[300px] rounded-md"
      />
    </div>
  )
}