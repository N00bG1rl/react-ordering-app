import { useContext, useState } from 'react'

import Modal from '../UI/Modal'
import CartItem from './CartItem'
import CartContext from '../../store/cart-context'
import Checkout from './Checkout'

import styles from './Cart.module.css'

const Cart = props => {
  // Set state for order button
  const [isCheckout, setIsCheckOut] = useState(false)
  const cartCtx = useContext(CartContext)

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  // Check if there is items in bag
  const hasItems = cartCtx.items.length > 0

  // Add items to card at overlay
  const handleCartItemAdd = item => {
    cartCtx.addItem({ ...item, amount: 1 })
  }

  // Remove items from card at overlay
  const handleCartItemRemove = id => {
    cartCtx.removeItem(id)
  }

  // Set state for order button
  const handleOrder = () => {
    setIsCheckOut(true)
  }

  const cartItems = (
    <ul className={styles['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          /* Bind ensures that added or removed id-s.... 145 */
          onAdd={handleCartItemAdd.bind(null, item)}
          onRemove={handleCartItemRemove.bind(null, item.id)}
        />
      ))}
    </ul>
  )

  // Refactor from main modal
  const modalActions = (
    <div className={styles.actions}>
      {/* { props.onCartClose comes from app.js through props } */}
      <button className={styles['button--alt']} onClick={props.onCartClose}>
        Close
      </button>
      {/* Render order btn only when there is items in bag */}
      {hasItems && (
        <button className={styles.button} onClick={handleOrder}>
          Order
        </button>
      )}
    </div>
  )

  return (
    /* props.onCartClose comes from app.js through props */
    <Modal onCartClose={props.onCartClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {/* If checkout is true,show */}
      {/* Get event onCancel from Checkout.js and use app.js handleCartClose */}
      {isCheckout && <Checkout onCancel={props.onCartClose} />}
      {!isCheckout && modalActions}
    </Modal>
  )
}

export default Cart
