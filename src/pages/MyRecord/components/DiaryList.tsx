import React from 'react'
import { Button } from 'src/components'
import { IDiary } from 'src/types'
import { datetime } from 'src/utils'

type Props = {
  list: IDiary[]
  isLoading?: boolean
  canLoadMore?: boolean
  onLoadMoreClick?: () => void
}

const DiaryList: React.FC<Props> = ({
  list,
  isLoading,
  canLoadMore,
  onLoadMoreClick
}) => {
  const renderSkeleton = React.useCallback(
    (_: any, index: number) => (
      <div
        key={index}
        className="size-58 animate-pulse rounded-md border bg-slate-300 shadow"
      />
    ),
    []
  )
  const renderItem = React.useCallback((item: IDiary) => {
    return (
      <div className="size-58 border border-gray-350 p-4" key={item?.id}>
        <p className="mb-3 text-lg">
          {datetime(item.date).format('YYYY.DD.MM')}
          <br />
          {datetime(item.date).format('HH:mm')}
        </p>
        <p className="text-sm font-light">{item.title}</p>
        <p className="line-clamp-4 font-normal">{item.content}</p>
      </div>
    )
  }, [])

  const renderLoading = React.useMemo(() => {
    if (isLoading) return Array.from({ length: 8 }, renderSkeleton)
    return null
  }, [isLoading, renderSkeleton])

  return (
    <div>
      <p className="mb-1 text-2xl">MY DIARY</p>
      <div className="grid grid-flow-row grid-cols-4 gap-4">
        {list.map(renderItem)}
        {renderLoading}
      </div>
      <div className="mt-6 flex justify-center">
        <Button
          disabled={!canLoadMore}
          onClick={onLoadMoreClick}
          bgcolor="linearGradient"
        >
          自分の日記をもっと見る
        </Button>
      </div>
    </div>
  )
}

export default React.memo(DiaryList)
