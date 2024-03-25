import { Images } from 'src/assets'
import { datetime } from 'src/utils'

export const SECTIONS = {
  'body-record': {
    label: 'Body Record',
    labelJa: '自分のカラダの記録',
    image: Images.MyRecordPage.BodyRecord
  },
  'my-excercise': {
    label: 'My Excercise',
    labelJa: '自分の運動の記録',
    image: Images.MyRecordPage.MyExcercise
  },
  'my-diary': {
    label: 'My Diary',
    labelJa: '自分の日記',
    image: Images.MyRecordPage.MyDiary
  }
}

export const DateTypes = {
  day: {
    label: '日',
    chartLabels: Array.from({ length: 24 }, (_, i) => i + '時')
  },
  week: {
    label: '週',
    chartLabels: datetime.weekdaysShort()
  },
  month: {
    label: '月',
    chartLabels: Array.from(
      { length: datetime().daysInMonth() },
      (_, i) => i + 1 + '日'
    )
  },
  year: {
    label: '年',
    chartLabels: Array.from({ length: 12 }, (_, i) =>
      datetime().subtract(i, 'month').format('MMM')
    )
  }
}
