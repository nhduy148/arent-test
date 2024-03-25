export type ToastType = 'info' | 'success' | 'warning' | 'error'

export type TToastItem = {
  id: string
  type: ToastType
  message: string | React.ReactNode
  interval?: number
}

export type DataToast = {
  message: string | React.ReactNode
  type: ToastType
  interval?: number
}
