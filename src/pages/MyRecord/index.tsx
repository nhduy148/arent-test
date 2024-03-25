import React, { LegacyRef } from 'react'
import BodyRecordChart from './components/Chart'
import { DateTypes, SECTIONS } from './contants'
import { getBodyRecords, getMyDiary, getMyExercises } from './helpers'
import {
  IDiary,
  IExercise,
  PaginationParams,
  PaginationResponse
} from 'src/types'
import ExerciseList from './components/ExerciseList'
import DiaryList from './components/DiaryList'
import { showToast } from 'src/components'

type SectionRefs = Record<keyof typeof SECTIONS, HTMLDivElement | null>

type BodyRecords = {
  prop1: number[]
  prop2: number[]
}

function MyRecord() {
  const [dateType, setDateType] = React.useState<keyof typeof DateTypes>('day')
  const [bodyRecords, setBodyRecords] = React.useState<BodyRecords>({
    prop1: [],
    prop2: []
  })
  const [myExercises, setMyExercises] = React.useState<IExercise[]>([])
  const [isMyDiaryLoading, setIsMyDiaryLoading] = React.useState(false)
  const [myDiaryList, setMyDiaryList] = React.useState<IDiary[]>([])
  const [myDiaryPagination, setMyDiaryPagination] =
    React.useState<PaginationResponse>({
      limit: 8,
      page: 1,
      total: 0,
      hasNext: false,
      hasPrev: false
    })

  const sectionRefs = React.useRef<SectionRefs>({
    'body-record': null,
    'my-excercise': null,
    'my-diary': null
  })

  const handleGetBodyRecords = React.useCallback(
    async (type: keyof typeof DateTypes) => {
      setDateType(type)
      const data = await getBodyRecords(type)
      setBodyRecords(data.data)
    },
    []
  )

  const handleGetMyExercises = React.useCallback(async () => {
    const data = await getMyExercises()
    setMyExercises(data)
  }, [])

  const handleGetDiary = React.useCallback(async (params: PaginationParams) => {
    if (isMyDiaryLoading) return
    if (params.page === 1) {
      setMyDiaryList([])
    }
    setIsMyDiaryLoading(true)
    try {
      const response = await getMyDiary(params)

      setMyDiaryList((prev) => {
        if (response?.pagination?.page === 1) {
          return response?.data
        }
        return prev.concat(response?.data)
      })
      setMyDiaryPagination(response?.pagination)
    } catch (error) {
      showToast({
        message: 'Getting error when fetching data!',
        type: 'error'
      })
    } finally {
      setIsMyDiaryLoading(false)
    }
  }, [])

  React.useEffect(() => {
    handleGetBodyRecords(dateType)
    handleGetMyExercises()
    handleGetDiary({ page: 1, limit: 8 })
  }, [])

  return (
    <div className="container-lg mx-auto py-14">
      <div className="space-y-14">
        <div className="grid grid-flow-row grid-cols-3 gap-12">
          {Object.entries(SECTIONS).map(([key, { label, labelJa, image }]) => {
            return (
              <div
                key={key}
                className="relative flex size-72 cursor-pointer overflow-hidden border-[24px] border-primary-300 shadow transition hover:opacity-80"
                onClick={() => {
                  sectionRefs.current?.[
                    key as keyof typeof SECTIONS
                  ]?.scrollIntoView?.({
                    behavior: 'smooth'
                  })
                }}
              >
                <div
                  className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat shadow"
                  style={{
                    backgroundImage: `url(${image})`,
                    filter: 'grayscale(100%)'
                  }}
                />
                <div className="z-10 flex size-full flex-col items-center justify-center bg-black/50">
                  <p className="mb-3 text-center text-2xl font-normal uppercase text-primary-300">
                    {label}
                  </p>
                  <p className="w-40 bg-primary-400 px-4 py-1 text-center text-sm text-white">
                    {labelJa}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div
          ref={sectionRefs.current['body-record'] as LegacyRef<HTMLDivElement>}
        >
          <BodyRecordChart
            labels={DateTypes[dateType].chartLabels}
            data={{
              prop1: bodyRecords.prop1,
              prop2: bodyRecords.prop2
            }}
            currentDateType={dateType}
            onDateTypeChange={handleGetBodyRecords}
          />
        </div>
        <div
          ref={sectionRefs.current['my-excercise'] as LegacyRef<HTMLDivElement>}
        >
          <ExerciseList list={myExercises} />
        </div>
        <div ref={sectionRefs.current['my-diary'] as LegacyRef<HTMLDivElement>}>
          <DiaryList
            isLoading={isMyDiaryLoading}
            list={myDiaryList}
            canLoadMore
            onLoadMoreClick={() => {
              if (myDiaryPagination.hasNext) {
                handleGetDiary({
                  page: myDiaryPagination.page + 1,
                  limit: myDiaryPagination.limit
                })
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default React.memo(MyRecord)
