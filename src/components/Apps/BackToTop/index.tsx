import React from 'react'

const BackToTop = () => {
  // const checkIsScrollBottom = (el: HTMLElement | null) => {
  //   if (isNil(el)) return false
  //   return el.getBoundingClientRect().bottom <= window.innerHeight / 2
  // }
  // const trackScrolling = () => {
  //   const wrappedElement = document.getElementById('navbar')
  //   if (checkIsScrollBottom(wrappedElement)) {
  //     console.log('header bottom reached')
  //     document.removeEventListener('scroll', trackScrolling)
  //   }
  // }

  // React.useEffect(() => {
  //   document.addEventListener('scroll', trackScrolling)
  //   return () => {
  //     document.removeEventListener('scroll', trackScrolling)
  //   }
  // }, [])

  return (
    <div
      className="fixed bottom-4 right-4 z-50"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <button className="flex size-12 items-center justify-center rounded-full border border-gray-400 bg-white p-2 shadow-md">
        <svg
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.5852 9.04198L8.00017 2.65788L1.41513 9.04198L0.53894 8.19253L8.00018 0.958984L15.4614 8.19253L14.5852 9.04198Z"
            className="fill-gray-400"
          />
        </svg>
      </button>
    </div>
  )
}

export default BackToTop
