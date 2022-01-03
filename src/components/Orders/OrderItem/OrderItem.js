import { useContext } from 'react'

import OrderItemForm from './OrderItemForm'
import CartContext from '../../../store/cart-context'

import styles from './OrderItem.module.css'

const OrderItem = props => {
  const cartCtx = useContext(CartContext)
  const price = `€${props.price}`

  const handleAddToCart = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    })
  }

  return (
    <li className={styles.order}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <OrderItemForm onAddToCart={handleAddToCart} />
      </div>
    </li>
  )
}

export default OrderItem
