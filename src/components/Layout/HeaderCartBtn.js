import { useContext } from "react"

import CartIcon from "../Cart/CartIcon"
import CartContext from "../../store/cart-context"

import styles from "./HeaderCartBtn.module.css"

const HeaderCartBtn = props => {
  // For shoping cart update
  const cartCtx = useContext(CartContext)

  // Reduce helps to limit to 1 number, it takes two arguments - a function
  // and a starting value 0
  const numberOfCartItems = cartCtx.items.reduce((curNumber, item) => {
    return curNumber + item.amount
  }, 0)

  return (
    /* onClick here is build in and uses header.js name choice */
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartBtn
