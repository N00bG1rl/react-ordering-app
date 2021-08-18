import CartIcon from "../Cart/CartIcon"

import styles from "./HeaderCartBtn.module.css"

const HeaderCartBtn = props => {
  return (
    /* onClick here is build in and uses header.js name choice */
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>3</span>
    </button>
  )
}

export default HeaderCartBtn
