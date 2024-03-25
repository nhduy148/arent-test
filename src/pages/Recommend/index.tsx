import React from 'react'
import RecommendList from './components/RecommendList'
import {
  IRecommendCategory,
  IRecommendItem,
  PaginationResponse
} from 'src/types'
import { showToast } from 'src/components'
import { RequestParams } from './type'
import { getRecommends, getCategories } from './helper'

function RecommendPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [data, setData] = React.useState<IRecommendItem[]>([])
  const [categories, setCategories] = React.useState<IRecommendCategory[]>([])
  const [pagination, setPagination] = React.useState<PaginationResponse>({
    limit: 8,
    page: 1,
    total: 0,
    hasNext: false,
    hasPrev: false
  })

  const handleGetData = React.useCallback(async (params: RequestParams) => {
    if (isLoading) return
    if (params.page === 1) {
      setData([])
    }
    setIsLoading(true)
    try {
      const response = await getRecommends(params)

      setData((prev) => {
        if (response?.pagination?.page === 1) {
          return response?.data
        }
        return prev.concat(response?.data)
      })
      setPagination(response?.pagination)
    } catch (error) {
      showToast({
        message: 'Getting error when fetching data!',
        type: 'error'
      })
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    ;(async () => {
      try {
        const categories = await getCategories()
        setCategories(categories)
        handleGetData({ page: 1, limit: 8, category: categories[0].type })
      } catch (error) {
        showToast({
          message: 'Getting error when fetching data!',
          type: 'error'
        })
      }
    })()
  }, [])

  const renderCategories = React.useMemo(() => {
    return categories.map((category) => {
      return (
        <div
          key={category.id}
          className="relative flex w-56 cursor-pointer flex-col items-center justify-center bg-dark-600 px-2 py-8 transition ease-in-out hover:opacity-80"
          onClick={() =>
            handleGetData({ page: 1, limit: 8, category: category.type })
          }
        >
          <p className="text-center text-2xl font-normal text-primary-300">
            {category.name}
          </p>
          <div className="my-2 h-px w-14 bg-white opacity-50" />
          <p className="text-lg font-light text-white">{category.nameJa}</p>
        </div>
      )
    })
  }, [categories, handleGetData])

  return (
    <div className="relative space-y-10 bg-white">
      <div className="container-lg mx-auto">
        <div className="mt-4 flex justify-between space-x-4">
          {renderCategories}
        </div>
      </div>
      <div className="container-lg mx-auto">
        <RecommendList
          list={data}
          isLoading={isLoading}
          canLoadMore={
            pagination.hasNext || !categories?.length || !data?.length
          }
          onLoadMoreClick={() => {
            if (pagination.hasNext) {
              handleGetData({
                page: pagination.page + 1,
                limit: pagination.limit
              })
            }
          }}
        />
      </div>
    </div>
  )
}

export default React.memo(RecommendPage)
