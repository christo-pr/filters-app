export default function ProductList({ products }) {
  return (
    <div className="flex flex-col items-center justify-center">
      {products?.map((p) => (
        <div key={p.id} className="w-full">
          <p>{p.productName}</p>
          <p>{p.price}</p>
          <div
            className={`w-5 h-5 rounded-full ${
              p.isAvailable ? 'bg-green-500' : 'bg-red-500'
            }`}
          ></div>
          <hr />
        </div>
      ))}
    </div>
  )
}
