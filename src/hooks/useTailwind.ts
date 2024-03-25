import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from 'tailwind.config.mjs'

export default function useTailwind() {
  return resolveConfig(tailwindConfig)
}
