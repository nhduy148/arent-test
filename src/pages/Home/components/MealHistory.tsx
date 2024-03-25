import React from 'react'
import { Icons } from 'src/assets'
import { Button } from 'src/components'
import { useTailwind } from 'src/hooks'
import { IMealCategory, IMealItem } from 'src/types'
import { datetime } from 'src/utils'

const CategoryBackground = (props: React.SVGProps<SVGSVGElement>) => {
  const { theme } = useTailwind()
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={116}
      height={134}
      fill="none"
      {...props}
    >
      <path fill="url(#a)" d="M0 33.5 58 0l58 33.5v67L58 134 0 100.5v-67Z" />
      <defs>
        <linearGradient
          id="a"
          x1={25.956}
          x2={147.019}
          y1={165.202}
          y2={118.302}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={theme.colors.primary[300]} />
          <stop offset={1} stopColor={theme.colors.primary[400]} />
        </linearGradient>
      </defs>
    </svg>
  )
}

type Props = {
  categories: IMealCategory[]
  list: IMealItem[]
  isLoading?: boolean
  onCategoryClick?: (category: IMealCategory) => void
  canLoadMore?: boolean
  onLoadMoreClick?: () => void
}

const MealHistory: React.FC<Props> = ({
  categories,
  list,
  isLoading,
  onCategoryClick,
  canLoadMore,
  onLoadMoreClick
}) => {
  const renderCategories = React.useMemo(() => {
    return categories.map((category) => {
      const icon =
        category.type === 'breakfast' ? <Icons.Knite /> : <Icons.Cup />
      return (
        <div className="size-34 px-2.5 " key={category.id}>
          <div
            className="relative flex size-full cursor-pointer items-center justify-center transition ease-in-out hover:opacity-80"
            onClick={() => onCategoryClick?.(category)}
          >
            <div className="z-10 flex flex-col items-center justify-center">
              {icon}
              <p className="text-center text-xl font-normal text-white">
                {category.name}
              </p>
            </div>
            <CategoryBackground className="absolute z-0" />
          </div>
        </div>
      )
    })
  }, [categories, onCategoryClick])

  const renderSkeleton = React.useCallback(
    (_: any, index: number) => (
      <div
        key={index}
        className="size-58 animate-pulse rounded-md border bg-slate-300 shadow"
      />
    ),
    []
  )

  const renderItem = React.useCallback((item: IMealItem) => {
    return (
      <div
        className="relative flex size-58 items-center space-x-4 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${item.image})` }}
        key={item?.id}
      >
        <div className="absolute bottom-0 left-0 bg-primary-300 px-2 py-1 text-sm font-normal text-white">
          {datetime(item.date).format('DD.MM.')}
          {item?.type?.toUpperCase?.()}
        </div>
      </div>
    )
  }, [])

  const renderLoading = React.useMemo(() => {
    if (isLoading) return Array.from({ length: 8 }, renderSkeleton)
    return null
  }, [isLoading, renderSkeleton])

  return (
    <div className="py-8">
      <div className="flex items-center justify-center space-x-16">
        {renderCategories}
      </div>
      <div className="my-6">
        <div className="grid grid-flow-row grid-cols-4 gap-4">
          {list.map(renderItem)}
          {renderLoading}
        </div>
      </div>
      {list?.length > 0 && (
        <div className="flex justify-center">
          <Button
            disabled={!canLoadMore || isLoading}
            onClick={onLoadMoreClick}
            bgcolor="linearGradient"
          >
            記録をもっと見る
          </Button>
        </div>
      )}
    </div>
  )
}

export default React.memo(MealHistory)
