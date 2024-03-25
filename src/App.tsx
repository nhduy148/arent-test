import { MainLayout } from 'src/layout'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { datetimeConfig } from './utils'
import { LoadingScreen, Toast } from './components'
import { Suspense } from 'react'
import { Pages } from './pages'

datetimeConfig()

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Toast />
                <Outlet />
              </MainLayout>
            }
          >
            <Route path="/" Component={Pages.HomePage} />
            <Route path="/my-record" Component={Pages.MyRecordPage} />
            <Route path="/recommend" Component={Pages.RecommendPage} />
            <Route path="*" Component={Pages.Page404} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
