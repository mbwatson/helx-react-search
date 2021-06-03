import React, { Fragment, useRef, useState } from 'react'
import ReactJson from 'react-json-view'
import { useHelxSearch } from 'helx-search'

export const MySearchInterface = () => {
  const searchInput = useRef()
  const { doSearch, hits, loading, pageCount, total } = useHelxSearch({
    index: 'concepts_index',
  })
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)

  const handleSubmit = () => {
    const mySearchTerm = searchInput.current.value

    doSearch(mySearchTerm, { perPage: perPage, page: page })
  }

  return (
    <div>
      <hr/>

      <input value="heart" ref={ searchInput }/>
      <button onClick={ handleSubmit }>submit</button>
      
      <hr/>

      {
        loading && <div>Searching...</div>
      }

      {
        !loading && (
          <Fragment>
            { total } hits<br/>
            { pageCount } pages<br/>

            <hr/>

            {
              hits.map(hit => (
                <ReactJson
                  key={ hit.id }
                  src={ hit }
                  theme="ocean"
                  collapsed={ true }
                  style={{ padding: '1rem', marginBottom: '1rem', lineHeight: 1.5 }}
                />
              ))
            }
          </Fragment>
        )
      }

    </div>
  )
}
