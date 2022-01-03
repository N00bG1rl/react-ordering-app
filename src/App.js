import { useState } from 'react'

import Header from './components/Layout/Header'
import Orders from './components/Orders/Orders'
import Cart from './components/Cart/Cart'
import CartProvider from './store/CartProvider'

function App() {
  const [cartIsShown, setCardIsShown] = useState(false)

  const handleCartShow = () => {
    setCardIsShown(true)
  }

  const handleCartClose = () => {
    setCardIsShown(false)
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onCartClose={handleCartClose} />}
      <Header onCartShow={handleCartShow} />
      <main>
        <Orders />
      </main>
    </CartProvider>
  )
}

export default App
