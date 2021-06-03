import React, { createContext, useContext, useMemo, useState } from 'react'

const HELX_SEARCH_URL = `https://helx.renci.org/search`

const DEFAULT_OPTIONS = {
  index: 'concepts_index',
  size: 10,
  offset: 0,
}

const SearchContext = createContext({})

export const useHelxSearch = config => {
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(false)
  const [hits, setHits] = useState([])
  const [total, setTotal] = useState(0)
  const [error, setError] = useState()
  const [pageCount, setPageCount] = useState(0)


  const doSearch = async (query, options) => {
    setLoading(true)

    const size = options.perPage || DEFAULT_OPTIONS.size
    const offset = (options.page - 1) * options.perPage || DEFAULT_OPTIONS.size
    
    const trimmedQuery = query.trim()
    if (trimmedQuery === '') { return }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...config,
        query: trimmedQuery,
        size,
        offset,
      }),
    }
    console.log(requestOptions)

    try {
      const response = await fetch(HELX_SEARCH_URL, requestOptions)

      let result = await response.json()

      if (!response || response.status !== 200) {
        throw new Error('Failed response')
      }

      setHits(result.result.hits.hits.map(r => r._source))
      setTotal(result.result.total_items)
      setPageCount(Math.ceil(result.result.total_items / size))
    
      console.log(result.result.total_items)
    } catch (error) {
      console.log(error)
      setError(`An error occurred while fetching results.`)
    }
    setLoading(false)
  }
  
  return { doSearch, hits, loading, pageCount, total }
}


export const HelxSearch = ({ children }) => {
  return (
    <SearchContext.Provider>
      { children }
    </SearchContext.Provider>
  )
}
