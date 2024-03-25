import React from 'react'
import { IExercise } from 'src/types'
import { datetime } from 'src/utils'

type Props = {
  list: IExercise[]
}

const ExerciseList = ({ list }: Props) => {
  const renderItem = React.useCallback(
    (item: IExercise) => (
      <div key={item.id} className="flex border-b border-b-gray-400 p-2">
        <div className="mr-2 mt-[8px] size-[5px] rounded-xl bg-white" />
        <div className="flex-1">
          <p className="font-light text-white">{item.name}</p>
          <p className="text-primary-300">{item.totalKcal} kcal</p>
        </div>
        <p className="text-lg text-primary-300">{item.totalDuration} min</p>
      </div>
    ),
    []
  )
  const renderTitle = React.useMemo(
    () => (
      <div className="flex space-x-4">
        <span className="text-white">
          MY <br /> EXERCISE
        </span>
        <span className="text-white">{datetime().format('YYYY.MM.DD')}</span>
      </div>
    ),
    []
  )
  if (!list.length) {
    return (
      <div className="h-66 bg-dark-500 p-4 lg:px-8">
        {renderTitle}
        <div className="flex items-center justify-center text-center text-gray-500">
          No data
        </div>
      </div>
    )
  }
  return (
    <div className="h-66 overflow-y-auto bg-dark-500 p-4 lg:px-8">
      <div className="sticky top-0 bg-dark-500">{renderTitle}</div>
      <div className="grid grid-flow-row grid-cols-1 gap-x-4 gap-y-1 md:grid-cols-2">
        {list.map(renderItem)}
      </div>
    </div>
  )
}

export default ExerciseList
