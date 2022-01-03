import { useContext, useState, Fragment } from 'react'

import Modal from '../UI/Modal'
import CartItem from './CartItem'
import CartContext from '../../store/cart-context'
import Checkout from './Checkout'

import styles from './Cart.module.css'

const Cart = props => {
  const [isCheckout, setIsCheckOut] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)

  const cartCtx = useContext(CartContext)

  const totalAmount = `€${cartCtx.totalAmount.toFixed(2)}`
  // Check if there is items in bag
  const hasItems = cartCtx.items.length > 0

  // Incrase item quantity in cart modal
  const handleCartItemAdd = item => {
    cartCtx.addItem({ ...item, amount: 1 })
  }

  // Remove item from cart
  const handleCartItemRemove = id => {
    cartCtx.removeItem(id)
  }

  const handleOrder = () => {
    setIsCheckOut(true)
  }

  // POST userData into firebase server, not good idea, just for this app
  const handleOrderSubmit = async userData => {
    setIsSubmitting(true)
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
          onAdd={handleCartItemAdd.bind(null, item)}
          onRemove={handleCartItemRemove.bind(null, item.id)}
        />
      ))}
    </ul>
  )

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles['button--alt']} onClick={props.onCartClose}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={handleOrder}>
          Order
        </button>
      )}
    </div>
  )

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
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
    <Modal onCartClose={props.onCartClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  )
}

export default Cart
