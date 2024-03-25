export type PaginationParams = {
  page?: number
  limit?: number
}

export type PaginationResponse = {
  page: number
  limit: number
  total: number
  hasNext: boolean
  hasPrev: boolean
}

export type ResponseData<T> = {
  data: T[]
  pagination: PaginationResponse
}

export interface IMealCategory {
  id: number
  name: string
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
}

export interface IMealItem {
  id: string
  name: string
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  date: string
  image: string
}

export interface IExercise {
  id: string
  name: string
  totalKcal: number
  totalDuration: number
}

export interface IDiary {
  id: string
  date: string
  content: string
  title: string
}

export type IRecommendCategory = {
  id: string
  name: string
  nameJa: string
  type: 'column' | 'diet' | 'beauty' | 'health'
}

export type IRecommendItem = {
  id: string
  title: string
  content: string
  category: IRecommendCategory
  hashtags: string[]
  image: string
  created_date: string
}
