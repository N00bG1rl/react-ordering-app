import { useRef, useState } from 'react'

import styles from './Checkout.module.css'

// Basic form input fields validation, helper functions
const isEmpty = value => value.trim() === ''
const isFiveChars = value => value.trim().length === 5

// Create new functional component
const Checkout = props => {
  // Manage 4 input states
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  })

  // useRef for getting all input fields values once, not with keystrokes
  const nameInputRef = useRef()
  const streetInputRef = useRef()
  const postalInputRef = useRef()
  const cityInputRef = useRef()

  const handleConfirm = event => {
    // Dont send request right away, wait for button click that triggers
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

    // Update state to inform users

    if (!formIsValid) {
      return
    }
    // Proceed if all input fields returns true
    // Submit the cart data
  }

  // Refactor from form
  const formNameStyles = `${styles.control}  ${
    formInputsValidity.name ? '' : styles.invalid
  }`
  const formStreetStyles = `${styles.control}  ${
    formInputsValidity.street ? '' : styles.invalid
  }`
  const formPostalStyles = `${styles.control}  ${
    formInputsValidity.postal ? '' : styles.invalid
  }`
  const formCityStyles = `${styles.control}  ${
    formInputsValidity.city ? '' : styles.invalid
  }`

  return (
    <form className={styles.form} onSubmit={handleConfirm}>
      <div className={formNameStyles}>
        <label htmlFor='name'>Your Name</label>
        {/* Connect useRef with input field */}
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a name.</p>}
      </div>
      <div className={formStreetStyles}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a street.</p>}
      </div>
      <div className={formPostalStyles}>
        <label htmlFor='postal'>Postal</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!formInputsValidity.postal && (
          <p>Please enter a correct postal code.</p>
        )}
      </div>
      <div className={formCityStyles}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid name.</p>}
      </div>
      <div className={styles.actions}>
        {/* Type added because it would not submit form */}
        {/* Send onClick event through props into Cart.js, add event name onCancel */}
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        {/* Confirmation is added to form elem */}
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  )
}

export default Checkout
