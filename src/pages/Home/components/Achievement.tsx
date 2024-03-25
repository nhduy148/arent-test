import React from 'react'

type Props = {
  currentDay: number
  totalDay: number
  percentage: number
}

const circumference = ((2 * 22) / 7) * 120
const Achievement: React.FC<Props> = ({ currentDay, totalDay, percentage }) => {
  const calculatePercentage = circumference - (percentage / 100) * circumference
  return (
    <div className="h-full w-fixed-540 bg-white bg-achievement bg-cover bg-center bg-no-repeat">
      <div className="flex items-center justify-center">
        <svg className="size-72 -rotate-90">
          <circle
            cx="145"
            cy="145"
            r="120"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            className="text-transparent"
          />

          <circle
            cx="145"
            cy="145"
            r="120"
            stroke="currentColor"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={calculatePercentage}
            className="text-white"
          />
        </svg>
        <p className="absolute text-white">
          <span className="text-lg font-normal">
            {currentDay}/{totalDay}
          </span>
          <span className="ml-2 text-2xl font-normal">{percentage}%</span>
        </p>
      </div>
    </div>
  )
}

export default React.memo(Achievement)
