import React from 'react'
import { DURATION_ANIMATED } from './constants'
import { ToastType, TToastItem } from './types'

interface IProps<T> {
  item: T
  onPop: (item: T) => void
}

const ToastItem: React.FC<IProps<TToastItem>> = ({ item, onPop }) => {
  const [isShow, setIsShow] = React.useState<boolean>(true)
  const timerRef = React.useRef<any>(null)

  React.useEffect(() => {
    timerRef.current = setTimeout(
      () => {
        setIsShow(false)
        onPop(item)
      },
      (item?.interval ?? 0) + DURATION_ANIMATED
    )

    return () => {
      clearTimeout(timerRef.current)
    }
  }, [])

  const handleClose = React.useCallback(
    (item: TToastItem) => {
      clearTimeout(timerRef.current)
      setIsShow(false)
      onPop(item)
    },
    [onPop]
  )

  if (!isShow) {
    return null
  }
  switch (item.type) {
    case 'info':
      return (
        <div
          id="alert-border-1"
          className="mb-4 flex items-center border-t-4 border-blue-300 bg-blue-50 p-4 text-blue-800 dark:border-blue-800 dark:bg-gray-800 dark:text-blue-400"
          role="alert"
        >
          {AlertIcon[item.type]}
          <div className="ms-3 text-sm font-medium">{item.message}</div>
          <button
            type="button"
            className="-m-1.5 ms-auto inline-flex size-8 items-center justify-center rounded-lg bg-blue-50 p-1.5 text-blue-500 hover:bg-blue-200 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
            aria-label="Close"
            onClick={() => handleClose(item)}
          >
            <span className="sr-only">Dismiss</span>
            <svg
              className="size-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )
    case 'error':
      return (
        <div
          id="alert-border-2"
          className="mb-4 flex items-center border-t-4 border-red-300 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {AlertIcon[item.type]}
          <div className="ms-3 text-sm font-medium">{item.message}</div>
          <button
            type="button"
            className="-m-1.5 ms-auto inline-flex size-8 items-center justify-center rounded-lg bg-red-50 p-1.5 text-red-500 hover:bg-red-200 focus:ring-2 focus:ring-red-400 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
            aria-label="Close"
            onClick={() => handleClose(item)}
          >
            <span className="sr-only">Dismiss</span>
            <svg
              className="size-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )
    case 'success':
      return (
        <div
          id="alert-border-3"
          className="mb-4 flex items-center border-t-4 border-green-300 bg-green-50 p-4 text-green-800 dark:border-green-800 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          {AlertIcon[item.type]}
          <div className="ms-3 text-sm font-medium">{item.message}</div>
          <button
            type="button"
            className="-m-1.5 ms-auto inline-flex size-8 items-center justify-center rounded-lg bg-green-50 p-1.5 text-green-500 hover:bg-green-200 focus:ring-2 focus:ring-green-400 dark:bg-gray-800 dark:text-green-400 dark:hover:bg-gray-700"
            aria-label="Close"
            onClick={() => handleClose(item)}
          >
            <span className="sr-only">Dismiss</span>
            <svg
              className="size-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )
    case 'warning':
      return (
        <div
          id="alert-border-4"
          className="mb-4 flex items-center border-t-4 border-yellow-300 bg-yellow-50 p-4 text-yellow-800 dark:border-yellow-800 dark:bg-gray-800 dark:text-yellow-300"
          role="alert"
        >
          {AlertIcon[item.type]}
          <div className="ms-3 text-sm font-medium">{item.message}</div>
          <button
            type="button"
            className="-m-1.5 ms-auto inline-flex size-8 items-center justify-center rounded-lg bg-yellow-50 p-1.5 text-yellow-500 hover:bg-yellow-200 focus:ring-2 focus:ring-yellow-400 dark:bg-gray-800 dark:text-yellow-300 dark:hover:bg-gray-700"
            aria-label="Close"
            onClick={() => handleClose(item)}
          >
            <span className="sr-only">Dismiss</span>
            <svg
              className="size-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )
  }
}

const AlertIcon: Record<ToastType, React.ReactNode> = {
  info: (
    <svg
      className="size-4 shrink-0"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
    </svg>
  ),
  error: (
    <svg
      className="size-4 shrink-0"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
    </svg>
  ),
  success: (
    <svg
      className="size-4 shrink-0"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
    </svg>
  ),
  warning: (
    <svg
      className="size-4 shrink-0"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
    </svg>
  )
}

export default React.memo(ToastItem)
