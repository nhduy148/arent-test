import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/ja'
import 'dayjs/locale/vi'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isToday from 'dayjs/plugin/isToday'
import localeData from 'dayjs/plugin/localeData'
import minMax from 'dayjs/plugin/minMax'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import { isNil } from 'lodash-es'
import {
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  MONTH_YEAR_FORMAT,
  YEAR_FORMAT
} from 'src/constants'

export const datetime = dayjs

export const toTimeZone = (_datetime: any, fallback = new Date()) => {
  const validDatetime = !isNil(_datetime) && datetime(_datetime).isValid()
  const validFallback = !isNil(fallback) && datetime(fallback).isValid()
  return datetime(
    validDatetime ? _datetime : datetime(validFallback ? fallback : new Date())
  )
}

export const formatDateTime = (_datetime: any, fallback = new Date()) => {
  return toTimeZone(_datetime, fallback).format(DATE_TIME_FORMAT)
}

export const formatDate = (_datetime: any, fallback = new Date()) => {
  return toTimeZone(_datetime, fallback).format(DATE_FORMAT)
}

export const formatMonthYear = (_datetime: any, fallback = new Date()) => {
  return toTimeZone(_datetime, fallback).format(MONTH_YEAR_FORMAT)
}

export const formatYear = (_datetime: any, fallback = new Date()) => {
  return toTimeZone(_datetime, fallback).format(YEAR_FORMAT)
}

export const datetimeConfig = () => {
  dayjs.extend(localeData)
  dayjs.extend(utc)
  dayjs.extend(duration)
  dayjs.extend(timezone)
  dayjs.extend(isBetween)
  dayjs.extend(isSameOrAfter)
  dayjs.extend(minMax)
  dayjs.extend(isToday)
  dayjs.extend(customParseFormat)
  dayjs.extend(relativeTime)
  dayjs.locale('ja')
}

export type Datetime = Dayjs
