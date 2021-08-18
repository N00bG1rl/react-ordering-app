import Modal from "../UI/Modal"

import styles from "./Cart.module.css"

const Cart = props => {
  const cartItems = (
    <ul className={styles["cart-items"]}>
      {[{ id: "c1", name: "Candy", amount: "2", price: 12.5 }].map(item => (
        <li>{item.name}</li>
      ))}
    </ul>
  )

  return (
    <Modal onCartClose={props.onCartClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>12.50</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onCartClose}>
          Close
        </button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  )
}

export default Cart
