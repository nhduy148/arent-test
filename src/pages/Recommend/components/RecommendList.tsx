import React from 'react'
import { Button } from 'src/components'
import { IRecommendItem } from 'src/types'
import { datetime } from 'src/utils'

type Props = {
  list: IRecommendItem[]
  isLoading?: boolean
  canLoadMore?: boolean
  onLoadMoreClick?: () => void
}

const RecommendList: React.FC<Props> = ({
  list,
  isLoading,
  canLoadMore,
  onLoadMoreClick
}) => {
  const renderSkeleton = React.useMemo(
    () => (
      <div className="size-58 animate-pulse rounded-md border bg-slate-300 shadow" />
    ),
    []
  )

  const renderItem = React.useCallback((item: IRecommendItem) => {
    return (
      <div
        className="cursor-pointer overflow-hidden transition hover:opacity-80"
        key={item?.id}
      >
        <div
          className="relative flex h-36 w-58 items-center space-x-4 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${item.image})` }}
        >
          <div className="absolute bottom-0 left-0 bg-primary-300 px-2 py-1 text-sm font-normal text-white">
            {datetime(item.created_date).format('YYYY.MM.DD   HH:mm')}
          </div>
        </div>
        <p className="mt-2 line-clamp-3 text-base font-light">{item.content}</p>
        <div className="flex flex-wrap space-x-1">
          {item.hashtags.map((hashtag, index) => (
            <span
              key={index}
              className="cursor-pointer text-sm text-primary-400"
            >
              #{hashtag}
            </span>
          ))}
        </div>
      </div>
    )
  }, [])

  const renderLoading = React.useMemo(() => {
    if (isLoading) return Array.from({ length: 8 }, () => renderSkeleton)
    return null
  }, [isLoading, renderSkeleton])

  return (
    <div className="py-8">
      <div className="my-6">
        <div className="grid grid-flow-row grid-cols-4 gap-4">
          {list.map(renderItem)}
          {renderLoading}
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          disabled={!canLoadMore}
          onClick={onLoadMoreClick}
          bgcolor="linearGradient"
        >
          記録をもっと見る
        </Button>
      </div>
    </div>
  )
}

export default React.memo(RecommendList)
