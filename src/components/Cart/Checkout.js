import { useRef, useState } from 'react'

import styles from './Checkout.module.css'

// Basic form input fields validation
const isEmpty = value => value.trim() === ''
const isFiveChars = value => value.trim().length === 5

const Checkout = props => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  })

  const nameInputRef = useRef()
  const streetInputRef = useRef()
  const postalInputRef = useRef()
  const cityInputRef = useRef()

  const handleConfirm = event => {
    event.preventDefault()

    // Get access to input fields values with useRef
    const enteredName = nameInputRef.current.value
    const enteredStreet = streetInputRef.current.value
    const enteredPostal = postalInputRef.current.value
    const enteredCity = cityInputRef.current.value

    // Basic form input fields validation
    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredPostalIsValid = isFiveChars(enteredPostal)
    const enteredCityIsValid = !isEmpty(enteredCity)

    // Override state with new values
    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postal: enteredPostalIsValid,
      city: enteredCityIsValid,
    })

    // Check if all fields returns true
    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid

    if (!formIsValid) {
      return
    }

    // Proceed if all input fields returns true, submit the cart data
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postal: enteredPostal,
      city: enteredCity,
    })
  }

  const formStyles = formInputField => {
    return `${styles.control} ${
      formInputsValidity[formInputField] ? '' : styles.invalid
    }`
  }

  return (
    <form className={styles.form} onSubmit={handleConfirm}>
      <div className={formStyles('name')}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a name.</p>}
      </div>
      <div className={formStyles('street')}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a street.</p>}
      </div>
      <div className={formStyles('postal')}>
        <label htmlFor='postal'>Postal</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!formInputsValidity.postal && (
          <p>Please enter a correct postal code.</p>
        )}
      </div>
      <div className={formStyles('city')}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a city.</p>}
      </div>
      <div className={styles.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  )
}

export default Checkout
