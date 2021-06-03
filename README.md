# helx-search

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/helx-search.svg)](https://www.npmjs.com/package/@renci/helx-react-search) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @renci/helx-react-search
```

## Usage

### The `HelxSearch` Context

The names export `HelxSearch` is a context provider that should wrap any and all HeLx search functionality in your application.

```jsx
// app.js
import React, { Component } from 'react'
import { HelxSearch } from '@renci-helx-search'
import { MyCustomSearchInterface } from './my-search-interface'

export const App = () => {
  return (
    <HelxSearch>
      <h1>HeLx Search</h1>

      <MyCustomSearchInterface />

    </HelxSearch>
  )
}
```

Any child component, such as the `<MyCustomSearchInterface />` component in the above example, has access to the search context.

The search context provides access to
- the search function;
- the loading state;
- the results;
- the number of pages of results (depends on `page` and `perPage` config options).

### The `useHelxSearch` Hook 

```jsx
// my-search-interface.js
import React, { Fragment, useRef, useState } from 'react'
import { useHelxSearch } from 'helx-search'

export const MyCustomSearchInterface = () => {
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
              hits.map(hit => <div key={ hit.id }>{ hit.id } :: { hit.name }</div>)
            }
          </Fragment>
        )
      }

    </div>
  )
}

```
## License

MIT © [mbwatson](https://github.com/mbwatson)
