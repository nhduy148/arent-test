import { classNames } from 'src/utils'

type NavItemProps = React.PropsWithChildren & {
  active: boolean
  href: string
}

export const NavItem: React.FC<NavItemProps> = ({ active, children }) => (
  <div
    className={classNames(
      'hover:bg-primary-500/20',
      active ? 'text-primary-400' : 'text-white',
      'font-light transition ease-in-out rounded-md py-1 p-4 text-base'
    )}
  >
    {children}
  </div>
)
