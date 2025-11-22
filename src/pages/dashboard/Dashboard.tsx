import { useEffect, useState } from 'react'
import ProductApi from '../../api/ProductApi'
import type { Product } from '../../types/Product'

const Dashboard = () => {
  const [product, setProduct] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null);

  const fetchLatestProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await ProductApi.getLatestProduct()
      if (result?.success) {
        setProduct(result.product)
      } else {
        setProduct([]);
        setError(result.message || 'Failed to load products');
      }
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message || 'Network error');
      setProduct([]);
    }
    finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchLatestProduct()
  }, [])

  console.log(product);

  return (
    <>
      {loading && <p className="text-blue-500">Loading latest products...</p>}

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {!loading && product.length === 0 && !error && (
        <p>No products found.</p>
      )}

      {product.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {product.map((products) => (
            <div
              key={products._id}
              className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition relative"
            >
              <div className='absolute right-0 rounded-es-lg rounded-se-lg top-0 p-2 text-white bg-indigo-600'>{products.category.name}</div>
              <h3 className="font-semibold text-lg">{products.name}</h3>
              <p className="text-gray-600">{products.brand}</p>
              <p className="text-green-600 font-bold">
                ${products.discountPrice > 0
                  ? products.discountPrice.toFixed(2)
                  : products.price.toFixed(2)}
                {products.discountPrice > 0 && (
                  <span className="text-red-600 line-through ml-2">
                    ${products.price.toFixed(2)}
                  </span>
                )}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Stock: {products.totalStock}
              </p>
              {products.variants.length > 0 &&
                <div className='flex justify-between mt-1'>
                  <div>Color</div>
                  <div>Size</div>
                  <div>Stock</div>
                </div>
              }
                {
                  products.variants.length > 0 && products.variants.map((variant,index) => (
                    <>
                    <div className='flex justify-between text-[14px]'>
                      <div>
                        {variant.color}
                      </div>
                      <div>
                        {variant.size}
                      </div>
                      <div style={{ color: variant.stock < 10 ? 'red' : 'green' }}>
                        {variant.stock}
                      </div>
                    </div>
                    <div className={`w-full h-0.5 bg-gray-200 my-1  ${index == products.variants.length-1 && 'hidden'}`} ></div>
                    </>
                  ))
                }
              {/* Optional: Show first color image */}
              {products.colorImages[0]?.images[0] && (
                <img
                  src={products.colorImages[0].images[0].url}
                  alt={products.colorImages[0].images[0].alt || products.name}
                  className="w-full object-cover rounded mt-2"
                />
              )}

            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Dashboard