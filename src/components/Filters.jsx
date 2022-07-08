import { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import useLocation from '../hooks/useLocation'

export default function Filter({ onChange }) {
  const { queryParams } = useLocation()
  const [name, setName] = useState('')
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(0)
  const [status, setStatus] = useState(0)

  useEffect(() => {
    if (queryParams.name) setName(queryParams.name)
    if (queryParams.from) setFrom(queryParams.from)
    if (queryParams.to) setTo(queryParams.to)
    if (queryParams.status) setStatus(queryParams.status)

    onChange({
      productName_like: name,
      price_gte: from,
      price_lte: to,
      isAvailable: status,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams])

  const handleFiltering = useCallback(() => {
    onChange({
      productName_like: name,
      price_gte: from,
      price_lte: to,
      isAvailable: status,
    })

    const params = { name, from, to, status }
    const query = Object.keys(params).reduce((url, k) => {
      const param = k
      const value = params[k]
      if (value) return url ? `${url}&${param}=${value}` : `${param}=${value}`

      return url
    }, '')
    window.history.pushState(null, null, '?' + query)
  }, [name, from, to, status, onChange])

  return (
    <div className="flex">
      <div className="m-5">
        <input
          type="text"
          name="name"
          placeholder="product name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="m-5">
        <input
          type="range"
          value={from}
          min="0"
          max="1000"
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="range"
          min="0"
          max="1000"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>
      <div className="m-5">
        <select
          name="status"
          id=""
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Select availability</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
      </div>
      <button className="button bg-green-300" onClick={handleFiltering}>
        Enviar
      </button>
    </div>
  )
}
