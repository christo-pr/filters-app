import { Filters, ProductsList, Pagination } from './components'
import useProducts from './hooks/useProducts'

function App() {
  const { products, onFilter, meta } = useProducts()

  return (
    <div className="container mx-auto w-full">
      <Filters onChange={onFilter} />
      <ProductsList products={products} />
      <Pagination meta={meta} />
    </div>
  )
}

export default App
