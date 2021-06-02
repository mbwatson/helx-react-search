import React, { createContext, useContext, useMemo, useState } from 'react'

const HELX_SEARCH_URL = `https://helx.renci.org/search`

const defaultConfig = {
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

  const doSearch = async (query) => {
    setLoading(true)
    
    const trimmedQuery = query.trim()

    if (trimmedQuery === '') { return }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: trimmedQuery,
        ...defaultConfig,
        ...config,
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
      console.log(result.result.total_items)
    } catch (error) {
      console.log(error)
      setError(`An error occurred while fetching results.`)
    }
    setLoading(false)
  }
  
  return { doSearch, hits, total }
}


export const HelxSearch = ({ children }) => {
  return (
    <SearchContext.Provider>
      { children }
    </SearchContext.Provider>
  )
}
