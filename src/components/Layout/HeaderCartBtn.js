import CartIcon from "../Cart/CartIcon"

import styles from "./HeaderCartBtn.module.css"

const HeaderCartBtn = props => {
  return (
    <button className={styles.button}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>3</span>
    </button>
  )
}

export default HeaderCartBtn
