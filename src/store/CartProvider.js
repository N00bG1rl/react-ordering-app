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

  if (action.type === 'REMOVE_CART_ITEM') {
    // Find index of existing item
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.id
    )

    // Get the item
    const existingCartItem = state.items[existingCartItemIndex]

    // Update amount
    const updatedTotalAmount = state.totalAmount - existingCartItem.price
    let updatedItems

    // Check if item is last one and remove it then from array
    // Otherwise decrease the amount
    if (existingCartItem.amount === 1) {
      // Filter will return new array where deleted item is not in array anymore
      // Filter out items that is not with that item id and they are kept
      //
      updatedItems = state.items.filter(item => item.id !== action.id)
    } else {
      // If amount is creater than 1 we want to keep item, just
      // change the amount count
      const updatedItem = {
        // Get existing array
        ...existingCartItem,
        // And then remove 1
        amount: existingCartItem.amount - 1,
      }
      // Copy of stated items
      updatedItems = [...state.items]
      // Override with index
      updatedItems[existingCartItemIndex] = updatedItem
    }

    // Return new state object
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
