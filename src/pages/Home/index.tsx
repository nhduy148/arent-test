import React from 'react'
import { datetime } from 'src/utils'
import Achievement from './components/Achievement'
import AchievementChart from './components/Chart'
import MealHistory from './components/MealHistory'
import { IMealCategory, IMealItem, PaginationResponse } from 'src/types'
import { showToast } from 'src/components'
import { RequestParams } from './type'
import {
  getAchievementChartData,
  getAchievements,
  getCategories
} from './helper'

const last12Months = Array.from({ length: 12 }, (_, i) =>
  datetime()
    .subtract(i + 1, 'month')
    .format('MMM')
)

type ChartData = {
  prop1: number[]
  prop2: number[]
}

function HomePage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [data, setData] = React.useState<IMealItem[]>([])
  const [categories, setCategories] = React.useState<IMealCategory[]>([])
  const [pagination, setPagination] = React.useState<PaginationResponse>({
    limit: 8,
    page: 1,
    total: 0,
    hasNext: false,
    hasPrev: false
  })
  const [chartData, setChartData] = React.useState<ChartData>({
    prop1: [],
    prop2: []
  })

  const handleGetData = React.useCallback(async (params: RequestParams) => {
    if (isLoading) return
    if (params.page === 1) {
      setData([])
    }
    setIsLoading(true)
    try {
      const response = await getAchievements(params)

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

  const handleGetChartData = React.useCallback(async () => {
    const data = await getAchievementChartData()
    setChartData(data)
  }, [])

  React.useEffect(() => {
    handleGetChartData()
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

  return (
    <div className="relative bg-white">
      <div className="container-xl mx-auto flex h-80">
        <Achievement currentDay={7} totalDay={21} percentage={75} />
        <AchievementChart labels={last12Months} data={chartData} />
      </div>
      <div className="container-lg mx-auto">
        <MealHistory
          categories={categories}
          list={data}
          isLoading={isLoading}
          onCategoryClick={(cat) =>
            handleGetData({ page: 1, limit: 8, category: cat.type })
          }
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

export default React.memo(HomePage)
