import { useEffect } from 'react'
import { useState } from 'react'

function parseQueryParams(query) {
  const params = query.replace('?', '').split('&')

  return params
    .filter((p) => {
      const [_, value] = p.split('=')
      return value !== 'undefined' && value !== 'null' && value !== '[]'
    })
    .reduce((allParams, param) => {
      const [key, value] = param.split('=')
      return {
        ...allParams,
        [key]: decodeURIComponent(value),
      }
    }, {})
}

export default function useLocation() {
  const [url, setUrl] = useState()
  const [queryParams, setQueryParams] = useState({})

  useEffect(() => {
    setUrl(window.location.href)
    if (window.location.search)
      setQueryParams(parseQueryParams(window.location.search))
  }, [])

  return {
    url,
    queryParams,
  }
}
