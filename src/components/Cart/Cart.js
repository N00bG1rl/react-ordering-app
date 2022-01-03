import { useContext, useState, Fragment } from 'react'

import Modal from '../UI/Modal'
import CartItem from './CartItem'
import CartContext from '../../store/cart-context'
import Checkout from './Checkout'

import styles from './Cart.module.css'

const Cart = props => {
  const [isCheckout, setIsCheckOut] = useState(false)
  // UI
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)

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

  // POST userData into firebase server, not good idea, just for this app
  const handleOrderSubmit = async userData => {
    setIsSubmitting(true)

    // Wait for fetch
    // Todo: error handling
    await fetch(
      'https://react-custom-hooks-d9dd9-default-rtdb.europe-west1.firebasedatabase.app/data.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    )
    setIsSubmitting(false)
    setDidSubmit(true)
    // Clear cart items after submit, get from CartProvider.js
    cartCtx.clearCart()
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

  // Refactor from main modal
  // UI
  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {/* If checkout is true,show */}
      {/* Get event onCancel from Checkout.js and use app.js handleCartClose */}
      {isCheckout && (
        <Checkout onConfirm={handleOrderSubmit} onCancel={props.onCartClose} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  )

  const isSubmittingModalContent = <p>Sending order data...</p>

  const didSubmitModalContent = (
    <Fragment>
      <p>Order was successful.</p>
      <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onCartClose}>
          Close
        </button>
      </div>
    </Fragment>
  )

  return (
    /* props.onCartClose comes from app.js through props */
    <Modal onCartClose={props.onCartClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  )
}

export default Cart
