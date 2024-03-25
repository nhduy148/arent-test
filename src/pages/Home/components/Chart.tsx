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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip)

type Props = {
  labels?: Array<string>
  data?: {
    prop1: Array<number>
    prop2: Array<number>
  }
}

const AchievementChart: React.FC<Props> = ({ labels, data }) => {
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
    <div className="w-full overflow-x-auto bg-dark-600 p-4 lg:px-8">
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
      />
    </div>
  )
}

export default React.memo(AchievementChart)
