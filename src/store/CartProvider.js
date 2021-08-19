// For managing state. Check if shoping bag allready have that
// item and
import { useReducer } from "react"

import CartContext from "./cart-context"

const defaultCartState = {
  items: [],
  totalAmount: 0,
}

// Outside of main comp bec. it does not need anything from inside
const cartReducer = (state, action) => {
  if (action.type === "ADD_CART_ITEM") {
    const updatedItems = state.items.concat(action.item)
    // Check same product amount and add price
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount
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
    dispatchCartAction({ type: "ADD_CART_ITEM", item: item })
  }

  const handleRemoveItemFromCart = id => {
    dispatchCartAction({ type: "REMOVE_CART_ITEM", id: id })
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
