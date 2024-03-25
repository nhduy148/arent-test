import _delay from 'lodash/delay'

export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

export const sleep = (ms: number) =>
  new Promise((resolve) =>
    _delay(() => {
      resolve(true)
    }, ms)
  )
