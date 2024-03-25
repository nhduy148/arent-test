import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { classNames } from 'src/utils'
import { Icons, Images } from 'src/assets'
import { NavItem } from './NavItem'
import { NavLink } from 'react-router-dom'

const navigation = [
  { name: '自分の記録', path: '/my-record', icon: <Icons.Memo /> },
  { name: 'チャレンジ', path: '/a', icon: <Icons.Challenge /> },
  { name: 'お知らせ', path: '/b', icon: <Icons.Info /> }
]

const dropdownMenu = [
  { name: '自分の記録', href: '#' },
  { name: '体重グラフ', href: '#' },
  { name: '目標', href: '#' },
  { name: '選択中のコース', href: '#' },
  { name: 'コラム一覧', href: '/recommend' },
  { name: '設定', href: '#' }
]

interface IProps {}

export const Navbar: React.FC<IProps> = () => {
  return (
    <Disclosure as="nav" className="bg-dark-500" id="navbar">
      {({ open }) => (
        <>
          <div className="container-lg mx-auto">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <NavLink to="/">
                    <img
                      className="h-8 w-auto"
                      src={Images.Logo}
                      alt="Your Company"
                    />
                  </NavLink>
                </div>
                <div className="flex grow justify-end space-x-4 pl-4">
                  {navigation.map((item) => (
                    <NavLink to={item.path} key={item.path}>
                      {({ isActive }) => (
                        <NavItem active={isActive} href={item.path}>
                          <p className="flex items-center">
                            <span className="mr-1">{item.icon}</span>
                            {item.name}
                          </p>
                        </NavItem>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div">
                  <Menu.Button className="relative inline-flex items-center justify-center rounded-md p-2 hover:bg-primary-500/20 hover:text-white focus:outline-none">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <Icons.Close
                        className="block size-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <Icons.Menu className="block size-6" aria-hidden="true" />
                    )}
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-50 mt-2 min-w-72 origin-top-right divide-y bg-gray-400 py-1 shadow-lg focus:outline-none">
                      {dropdownMenu.map((item, index) => (
                        <Menu.Item key={index} as={NavLink} to={item?.href}>
                          {({ active }) => (
                            <div
                              className={classNames(
                                active ? 'bg-gray-500' : '',
                                'block px-8 py-4 text-lg text-white font-light transition ease-in-out border-dark-600'
                              )}
                            >
                              {item.name}
                            </div>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}

Navbar.defaultProps = {}
