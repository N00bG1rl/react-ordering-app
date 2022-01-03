import { useEffect, useState } from 'react'

import Card from '../UI/Card'
import OrderItem from './OrderItem/OrderItem'

import styles from './AvailableOrders.module.css'

const AvailableProducts = () => {
  const [products, setProducts] = useState([])
  // Handling the loading state
  const [isLoading, setIsLoading] = useState(true)
  // Handle errors state
  const [httpError, setHttpError] = useState()

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        'https://react-custom-hooks-d9dd9-default-rtdb.europe-west1.firebasedatabase.app/orders.json'
      )

      // Check if there is no response from server
      if (!response.ok) {
        throw new Error('Something went wrong.')
      }

      const responseData = await response.json()
      const loadedProducts = []

      // Loop through object and push new objects into loadedProducts array
      for (const key in responseData) {
        loadedProducts.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        })
      }

      setProducts(loadedProducts)
      setIsLoading(false)
    }

    fetchProducts().catch(error => {
      setIsLoading(false)
      setHttpError(error.message)
    })
  }, [])

  if (isLoading) {
    return (
      <section className={styles.loading}>
        <p>Loading...</p>
      </section>
    )
  }

  // Show error message
  if (httpError) {
    return (
      <section className={styles.loadingError}>
        <p>{httpError}</p>
      </section>
    )
  }

  const orderList = products.map(order => (
    <OrderItem
      id={order.id}
      key={order.id}
      name={order.name}
      description={order.description}
      price={order.price}
    />
  ))

  return (
    <section className={styles.orders}>
      <Card>
        <ul>{orderList}</ul>
      </Card>
    </section>
  )
}

export default AvailableProducts
