import { useContext } from 'react'

import MealItemForm from './OrderItemForm'
import CartContext from '../../../store/cart-context'

import styles from './OrderItem.module.css'

const MealItem = props => {
  const cartCtx = useContext(CartContext)
  // Helper constant (with template literal?) for formating to two decimals
  const price = `$${props.price}`

  const handleAddToCart = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    })
  }

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={handleAddToCart} />
      </div>
    </li>
  )
}

export default MealItem
