import { useRef, useState } from 'react'

import Input from '../../UI/Input'

import styles from './OrderItemForm.module.css'

const OrderItemForm = props => {
  // Check if added amount is valid
  const [amountIsValid, setAmountIsValid] = useState(true)

  const amountInputRef = useRef()

  const handleSubmit = event => {
    event.preventDefault()

    const enteredAmount = amountInputRef.current.value
    const enteredAmountNumber = +enteredAmount

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false)
      return
    }

    props.onAddToCart(enteredAmountNumber)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        ref={amountInputRef}
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
      />
      <button>Add to Cart</button>
      {!amountIsValid && <p>You can only add 1 to 5 items.</p>}
    </form>
  )
}

export default OrderItemForm
