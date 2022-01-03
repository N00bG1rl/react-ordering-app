import { useEffect, useState } from 'react'

import Card from '../UI/Card'
import OrderItem from './OrderItem/OrderItem'

import styles from './AvailableOrders.module.css'

const AvailableProducts = () => {
  // Initially there is no data, but when it is loaded we need to update state
  // so we need to use useState aswell
  const [products, setProducts] = useState([])
  // Handling the loading state
  const [isLoading, setIsLoading] = useState(true)
  // Handle errors
  const [httpError, setHttpError] = useState()

  // useEffect last arg is dependencys array, if it is empty, useEffect
  // only runs once, when content is first loaded
  useEffect(() => {
    // useEfect should not return promise, but we can use cleanup function,
    // a work around, where we can still use async/await
    const fetchProducts = async () => {
      // fetch returns promise, since it is asyncronos task
      const response = await fetch(
        'https://react-custom-hooks-d9dd9-default-rtdb.europe-west1.firebasedatabase.app/orders.json'
      )

      // Check if there is no response from server
      if (!response.ok) {
        // try/catch is getting this message
        throw new Error('Something went wrong.')
      }

      // Gives back object, but we want an array
      const responseData = await response.json()
      // Helper variable to create array
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

      // Call/update state and pass on loadedProducts
      setProducts(loadedProducts)
      setIsLoading(false)
    }

    // We need to add try/catch to catch errors, but since we are inside useEffect,
    // we use another work around
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

  // Helper function
  // products from state
  const orderList = products.map(order => (
    <OrderItem
      id={order.id}
      key={order.id}
      name={order.name}
      description={order.description}
      price={order.price}
    />
  ))

  // Return some jsx code
  return (
    <section className={styles.orders}>
      <Card>
        <ul>{orderList}</ul>
      </Card>
    </section>
  )
}

export default AvailableProducts
