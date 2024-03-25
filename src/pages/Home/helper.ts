import { IMealCategory, IMealItem, ResponseData } from 'src/types'
import { sleep } from 'src/utils'
import { faker } from '@faker-js/faker'
import { RequestParams } from './type'

export const getCategories = async (): Promise<IMealCategory[]> => {
  await sleep(300)
  return [
    {
      id: 1,
      name: 'Morning',
      type: 'breakfast'
    },
    {
      id: 2,
      name: 'Lunch',
      type: 'lunch'
    },
    {
      id: 3,
      name: 'Dinner',
      type: 'dinner'
    },
    {
      id: 4,
      name: 'Snack',
      type: 'snack'
    }
  ]
}

export const getAchievements = async ({
  page = 1,
  limit = 8
}: RequestParams): Promise<ResponseData<IMealItem>> => {
  const data: IMealItem[] = Array.from({ length: 8 }, () => ({
    id: faker.string.nanoid(),
    name: faker.commerce.productName(),
    type: faker.helpers.arrayElement(['breakfast', 'lunch', 'dinner', 'snack']),
    date: faker.date.anytime().toISOString(),
    image: faker.image.urlLoremFlickr({
      category: 'food',
      width: 200,
      height: 200
    })
  }))
  await sleep(300)

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

export const getAchievementChartData = async () => {
  await sleep(300)
  return {
    prop1: Array.from({ length: 12 }, () =>
      faker.number.int({ min: 0, max: 1000 })
    ),
    prop2: Array.from({ length: 12 }, () =>
      faker.number.int({ min: 0, max: 1000 })
    )
  }
}
