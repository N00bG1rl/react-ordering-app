// For managing state. Check if shoping bag allready have that
// item and
import { useReducer } from 'react'

import CartContext from './cart-context'

const defaultCartState = {
  items: [],
  totalAmount: 0,
}

// Outside of main comp bec. it does not need anything from inside
const cartReducer = (state, action) => {
  if (action.type === 'ADD_CART_ITEM') {
    // Update total amount
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount

    // Check if that product already exist (with that index)
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    )
    const existingCartItem = state.items[existingCartItemIndex]

    let updatedItems

    // If that item exist already copy existing and
    // update amount with new object
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      }
      // This equals new array where new items are added
      // Updates is immudable = does't trasnform first array in memory
      updatedItems = [...state.items]
      // Override with updated item
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      // If item is not in the bag than add it and change array (concat)
      updatedItems = state.items.concat(action.item)
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }
  return defaultCartState
}

const CartProvider = props => {
  // Using reducer.
  // First arg pointing to reducer func.. (dont execute, just point)
  // Sec arg is inital state
  // Reducer returns array of two elements. So we use array destructurin
  // to pull these elements out of that array and store them at seperate
  // constant
  // The first array element is state snapshot 'cartState', sec is func
  // whitch allows dispatch an action to the reducer
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  )

  const handleAddItemToCart = item => {
    dispatchCartAction({ type: 'ADD_CART_ITEM', item: item })
  }

  const handleRemoveItemFromCart = id => {
    dispatchCartAction({ type: 'REMOVE_CART_ITEM', id: id })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: handleAddItemToCart,
    removeItem: handleRemoveItemFromCart,
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
