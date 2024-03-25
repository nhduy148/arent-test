import React, { FC } from 'react'
import { ButtonSize } from 'src/types'
import { classNames } from 'src/utils'

type Size = 'small' | 'medium' | 'large'

type ButtonProps = React.PropsWithChildren & {
  size?: ButtonSize
  bgcolor?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'linearGradient'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const sizes: Record<Size, string> = {
  small: 'py-2 px-4 text-xs',
  medium: 'py-3 px-6 text-sm',
  large: 'py-3.5 px-7 text-md'
}

const backgroundColors = {
  primary: 'bg-primary-300',
  secondary: 'bg-secondary-300',
  success: 'bg-green-300',
  error: 'bg-red-300',
  warning: 'bg-yellow-300',
  info: 'bg-blue-300',
  linearGradient: 'bg-gradient-to-b from-primary-400 to-primary-300'
}

export const Button: FC<ButtonProps> = ({
  size = 'medium',
  bgcolor = 'primary',
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={classNames(
        'middle none center rounded-lg font-sans font-bold uppercase shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-300/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none',
        sizes[size],
        'text-white font-light',
        backgroundColors[bgcolor ?? 'primary'],
        className
      )}
      data-ripple-light="true"
      {...props}
    >
      {children}
    </button>
  )
}
