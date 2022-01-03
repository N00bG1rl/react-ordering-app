import { useReducer } from 'react'
import CartContext from './cart-context'

const defaultCartState = {
  items: [],
  totalAmount: 0,
}

const cartReducer = (state, action) => {
  if (action.type === 'ADD_CART_ITEM') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount

    // Check if that product already exist (with that index)
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    )
    const existingCartItem = state.items[existingCartItemIndex]

    let updatedItems

    // If that item exist already, copy existing and update amount
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      }
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    } else {
      // If item is not in the bag than add it
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
      updatedItems = state.items.filter(item => item.id !== action.id)
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      }
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex] = updatedItem
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }

  if (action.type === 'CLEAR') {
    return defaultCartState
  }

  return defaultCartState
}

const CartProvider = props => {
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

  // Remove cart items after order submit
  const handleCartClear = () => {
    dispatchCartAction({ type: 'CLEAR' })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: handleAddItemToCart,
    removeItem: handleRemoveItemFromCart,
    clearCart: handleCartClear,
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
