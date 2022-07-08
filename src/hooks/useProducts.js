import { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const API_URL =
  'https://my-json-server.typicode.com/fernandoAlonsoV/AngularProjectMockedData/products'

export default function useProducts() {
  const [products, setProducts] = useState()
  const [meta, setMeta] = useState()
  const fetchApi = useCallback((params) => {
    console.log('params', params)
    // Params = {}
    return fetch(`${API_URL}?${params}`).then((res) => res.json())
  }, [])

  useEffect(() => {
    async function callAPI() {
      const data = await fetchApi()
      setProducts(data)
    }

    callAPI()
  }, [])

  const onFilter = async (params) => {
    // param=value&param2=value
    const queryParams = Object.keys(params).reduce((url, k) => {
      const param = k
      const value = params[k]
      if (value) return url ? `${url}&${param}=${value}` : `${param}=${value}`

      return url
    }, '')

    const data = await fetchApi(queryParams)
    setProducts(data)
  }

  return {
    products,
    onFilter,
  }
}
