import { sleep } from 'src/utils'
import { DateTypes } from './contants'
import { faker } from '@faker-js/faker'
import { IDiary, IExercise, PaginationParams } from 'src/types'

export const getBodyRecords = async (type: keyof typeof DateTypes) => {
  await sleep(1000)
  return {
    labels: DateTypes[type].chartLabels,
    data: {
      prop1: DateTypes[type].chartLabels.map(() =>
        faker.number.int({ min: 0, max: 1000 })
      ),
      prop2: DateTypes[type].chartLabels.map(() =>
        faker.number.int({ min: 0, max: 1000 })
      )
    }
  }
}

export const getMyExercises = async (): Promise<IExercise[]> => {
  await sleep(1000)
  return Array.from({ length: 30 }, () => ({
    id: faker.string.nanoid(),
    name: '家事全般（立位・軽い）',
    totalKcal: faker.number.int({ min: 0, max: 1000 }),
    totalDuration: faker.number.int({ min: 0, max: 100 })
  }))
}

export const getMyDiary = async ({ page = 1, limit = 8 }: PaginationParams) => {
  await sleep(300)
  const data: IDiary[] = Array.from({ length: limit }, () => ({
    id: faker.string.nanoid(),
    date: faker.date.recent().toISOString(),
    content:
      'テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト',
    title: '私の日記の記録が一部表示されます。'
  }))

  return {
    pagination: {
      page,
      limit,
      total: limit * page,
      hasNext: true,
      hasPrev: page > 1
    },
    data
  }
}
