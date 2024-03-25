import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  type ChartDataset
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useTailwind } from 'src/hooks'
import { DateTypes } from '../contants'
import { classNames, datetime } from 'src/utils'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

type Props = {
  currentDateType: keyof typeof DateTypes
  labels?: Array<string>
  data?: {
    prop1: Array<number>
    prop2: Array<number>
  }
  onDateTypeChange?: (type: keyof typeof DateTypes) => void
}

const BodyRecordChart: React.FC<Props> = ({
  labels,
  data,
  currentDateType,
  onDateTypeChange
}) => {
  const { theme } = useTailwind()
  const datasets: ChartDataset<'line', number[]>[] = Object.entries(
    data ?? {}
  ).map(([key, value]) => {
    const color = theme.colors[key === 'prop1' ? 'primary' : 'secondary'][300]
    return {
      label: 'Dataset ' + key,
      data: value,
      borderColor: color,
      backgroundColor: color,
      yAxisID: key,
      pointBackgroundColor: color,
      pointRadius: 4,
      pointHoverRadius: 4,
      color
    }
  })

  return (
    <div className="bg-dark-500 p-4 lg:px-8">
      <div className="flex space-x-4">
        <span className="text-white">
          BODY <br /> RECORD
        </span>
        <span className="text-white">{datetime().format('YYYY.MM.DD')}</span>
      </div>
      <div className="w-full overflow-x-auto py-2">
        <Line
          options={{
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
              mode: 'index',
              intersect: false
            },
            scales: {
              prop1: {
                beginAtZero: true,
                display: false
              },
              prop2: {
                beginAtZero: true,
                display: false
              },
              x: {
                beginAtZero: true,
                grid: {
                  tickWidth: 0,
                  color: theme.colors.gray[400]
                },
                border: {
                  display: false
                },
                ticks: {
                  color: theme.colors.white
                }
              }
            }
          }}
          data={{ labels, datasets }}
          height={300}
          width={1200}
        />
      </div>
      <div className="flex space-x-2">
        {Object.entries(DateTypes).map(([type, { label }]) => (
          <div
            key={type}
            className={classNames(
              'w-14 text-center rounded-xl',
              currentDateType === type ? 'bg-primary-300' : 'bg-white',
              currentDateType === type ? 'text-white' : 'text-primary-300',
              currentDateType !== type
                ? 'hover:bg-primary-400/90 hover:text-white cursor-pointer transition'
                : ''
            )}
            onClick={() => {
              if (currentDateType !== type) {
                onDateTypeChange?.(type as keyof typeof DateTypes)
              }
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

export default React.memo(BodyRecordChart)
