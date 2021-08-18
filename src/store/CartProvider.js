import CartContext from "./cart-context"

const CartProvider = props => {
  const handleAddItemToCart = item => {}

  const handleRemoveItemFromCart = item => {}

  const CartContext = {
    items: [],
    totalAmount: 0,
    addItem: handleAddItemToCart,
    removeItem: handleRemoveItemFromCart,
  }

  return (
    <CartContext.Provider value={CartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
