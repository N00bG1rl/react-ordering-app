import { useContext, useEffect, useState } from 'react'

import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'

import styles from './HeaderCartBtn.module.css'

const HeaderCartBtn = props => {
  // Call useState for buttons animations
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)

  // For shoping cart update
  const cartCtx = useContext(CartContext)

  // Use object destructuring to pull out items to get them out of cart
  // and use instead of cartCtx - items?
  const { items } = cartCtx

  // Reduce helps to limit to 1 number, it takes two arguments - a function
  // and a starting value 0
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount
  }, 0)

  // Adding animation to buttons
  const btnStyles = `${styles.button} ${btnIsHighlighted ? styles.bump : ''}`

  // Call useEffect to animate button
  useEffect(() => {
    // If there is no items in bag, do nothing
    if (items.length === 0) {
      return
    }
    setBtnIsHighlighted(true)

    // Remove class after animation finish
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false)
    }, 300)

    // Cleanup function to clear the timer - good practice?
    return () => {
      clearTimeout(timer)
    }
  }, [items])

  return (
    /* onClick here is build in and uses header.js name choice */
    <button className={btnStyles} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartBtn
