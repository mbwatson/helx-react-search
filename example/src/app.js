import React, { useRef } from 'react'
import ReactJson from 'react-json-view'
import { HelxSearch, useHelxSearch } from 'helx-search'
// import 'helx-search/dist/index.css'

const Hit = ({ hit }) => {
  return (
    <ReactJson
      src={ hit }
      theme="ocean"
      collapsed={ true }
      style={{ padding: '1rem', marginBottom: '1rem', lineHeight: 1.5 }}
    />
  )
}

const MySearchInterface = () => {
  const searchInput = useRef()
  const { doSearch, hits, total } = useHelxSearch({
    size: 8,
    offset: 0,
  })

  const handleSubmit = () => {
    const mySearchTerm = searchInput.current.value

    doSearch(mySearchTerm)
  }

  return (
    <div>
      <hr/>

      <input value="heart" ref={ searchInput }/>
      <button onClick={ handleSubmit }>submit</button>
      
      <hr/>

      { total } hits

      <hr/>

      {
        hits.map(hit => <Hit key={ hit.id } hit={ hit } />)
      }
    </div>
  )
}

export const App = () => {
  return (
    <HelxSearch>
      HeLx Search
      <MySearchInterface />
    </HelxSearch>
  )
}