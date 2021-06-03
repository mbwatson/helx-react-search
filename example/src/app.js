import React from 'react'
import { HelxSearch } from 'helx-search'
import { MySearchInterface } from './search-interface'

// import 'helx-search/dist/index.css'

export const App = () => {
  return (
    <HelxSearch>
      HeLx Search
      <MySearchInterface />
    </HelxSearch>
  )
}