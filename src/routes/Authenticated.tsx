import { Pages } from 'src/pages'
import { createBrowserRouter } from 'react-router-dom'

export const AuthenticatedRouter = createBrowserRouter([
  {
    path: '/',
    Component: Pages.HomePage
  },
  {
    path: '/my-record',
    Component: Pages.MyRecordPage
  }
])
