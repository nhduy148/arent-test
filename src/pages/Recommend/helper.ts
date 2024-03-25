import { IRecommendCategory, IRecommendItem, ResponseData } from 'src/types'
import { sleep } from 'src/utils'
import { faker } from '@faker-js/faker'
import { RequestParams } from './type'

const fixedCategories: IRecommendCategory[] = [
  {
    id: faker.string.nanoid(),
    name: 'RECOMMENDED COLUMN',
    nameJa: 'オススメ',
    type: 'column'
  },
  {
    id: faker.string.nanoid(),
    name: 'RECOMMENDED DIET',
    nameJa: 'ダイエット',
    type: 'diet'
  },
  {
    id: faker.string.nanoid(),
    name: 'RECOMMENDED BEAUTY',
    nameJa: '美容',
    type: 'beauty'
  },
  {
    id: faker.string.nanoid(),
    name: 'RECOMMENDED HEALTH',
    nameJa: '健康',
    type: 'health'
  }
]

export const getCategories = async (): Promise<IRecommendCategory[]> => {
  await sleep(300)
  return fixedCategories
}

export const getRecommends = async ({
  page = 1,
  limit = 8
}: RequestParams): Promise<ResponseData<IRecommendItem>> => {
  const data: IRecommendItem[] = Array.from({ length: 8 }, () => ({
    id: faker.string.nanoid(),
    title: faker.commerce.productName(),
    content: '魚を食べて頭もカラダも元気に！知っておきたい魚を食べるメリ…',
    category: faker.helpers.arrayElement(fixedCategories),
    hashtags: Array.from({ length: 3 }, () => faker.lorem.word()),
    type: faker.helpers.arrayElement(['column', 'diet', 'beauty', 'health']),
    created_date: faker.date.anytime().toISOString(),
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
