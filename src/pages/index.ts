import React from 'react'

export const Pages = {
  HomePage: React.lazy(() => import('./Home')),
  MyRecordPage: React.lazy(() => import('./MyRecord')),
  RecommendPage: React.lazy(() => import('./Recommend')),
  Page404: React.lazy(() => import('./Page404'))
}
