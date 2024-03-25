type ColorValue = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

type ColorNames =
  | 'rose'
  | 'pink'
  | 'fuchsia'
  | 'purple'
  | 'violet'
  | 'indigo'
  | 'blue'
  | 'sky'
  | 'cyan'
  | 'teal'
  | 'emerald'
  | 'green'
  | 'lime'
  | 'yellow'
  | 'amber'
  | 'orange'
  | 'red'
  | 'warmGray'
  | 'trueGray'
  | 'gray'
  | 'coolGray'
  | 'blueGray'
  | 'primary'
  | 'secondary'

export type Colors = Record<ColorNames, Record<ColorValue, string>>
