import { faker } from '@faker-js/faker'
import React, {
  createRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
import { DURATION_HIDE } from './constants'
import { DataToast, TToastItem } from './types'
import ToastItem from './ToastItem'

const ToastComponent = forwardRef(function Component(_, ref) {
  useImperativeHandle(
    ref,
    () => ({
      show: ({
        message,
        type = 'info',
        interval = DURATION_HIDE
      }: DataToast) => {
        setQueueData((d) =>
          d.concat([{ id: faker.string.nanoid(), message, type, interval }])
        )
      }
    }),
    []
  )

  const [queueData, setQueueData] = useState<Array<TToastItem>>([])
  const [data, setData] = useState<TToastItem[]>([])

  const onPop = useCallback((item: TToastItem) => {
    setQueueData((d) => {
      const _queueData = d.filter((x) => x.id !== item.id)
      setData(_queueData)
      return _queueData
    })
  }, [])

  const _renderItem = (item: TToastItem) => {
    return <ToastItem key={item.id} item={item} onPop={onPop} />
  }

  useEffect(() => {
    if (queueData.length > 0) {
      setData([queueData[0]])
    }
  }, [queueData])

  return data.map(_renderItem)
})

type Toast = {
  show: (data: DataToast) => void
}
export const confirmDialogRef = createRef<Toast>()
export const Toast = () => <ToastComponent ref={confirmDialogRef} />

export const showToast = (props: DataToast) => {
  confirmDialogRef.current?.show(props)
}
