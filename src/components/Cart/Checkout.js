import styles from './Checkout.module.css'

// Create new functional component
const Checkout = props => {
  const handleConfirm = event => {
    // Dont send request right away, wait for button click that triggers
    event.preventDefault()
  }

  return (
    <form onSubmit={handleConfirm}>
      <div className={styles.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' />
      </div>
      <div className={styles.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' />
      </div>
      <div className={styles.control}>
        <label htmlFor='postal'>Postal</label>
        <input type='text' id='postal' />
      </div>
      <div className={styles.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' />
      </div>
      {/* Type added because it would not submit form */}
      {/* Send onClick event through props into Cart.js, add event name onCancel */}
      <button type='button' onClick={props.onCancel}>
        Cancel
      </button>
      {/* Confirmation is added to form elem */}
      <button>Confirm</button>
    </form>
  )
}

export default Checkout
