export enum DownloadFileModalFormFields {
  SECURITY_CODE = 'securityCode',
}

export type DownloadFileModalForm = {
  [DownloadFileModalFormFields.SECURITY_CODE]: string
}

export type DownloadFileModalContainerProps = {
  isOpen: boolean
  close: () => void
  taxFormId: string
}

export type DownloadFileModalComponentProps = {
  taxFormId: string
}
