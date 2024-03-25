import React from 'react'
import { NavLink } from 'react-router-dom'

const links = [
  {
    label: '会員登録',
    href: '#'
  },
  {
    label: '運営会社',
    href: '#'
  },
  {
    label: '利用規約',
    href: '#'
  },
  {
    label: '個人情報の取扱について',
    href: '#'
  },
  {
    label: '特定商取引法に基づく表記',
    href: '#'
  },
  {
    label: 'お問い合わせ',
    href: '#'
  }
]
const Footer = () => {
  return (
    <div className="flex h-32 items-center bg-dark-500">
      <div className="container-lg mx-auto w-full">
        <div className="flex space-x-12">
          {links.map((link, index) => (
            <NavLink
              className="text-sm font-light text-white"
              to={link.href}
              key={index}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Footer
