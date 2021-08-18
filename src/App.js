import { Fragment, useState } from "react"

import Header from "./components/Layout/Header"
import Meals from "./components/Meals/Meals"
import Cart from "./components/Cart/Cart"

function App() {
  // If we have two different state, we use state management
  const [cartIsShown, setCardIsShown] = useState(false)

  const handleCartShow = () => {
    setCardIsShown(true)
  }

  const handleCartClose = () => {
    setCardIsShown(false)
  }

  return (
    <Fragment>
      {/* Render it, if its true */}
      {/* Point to cart.js throw props */}
      {cartIsShown && <Cart onCartClose={handleCartClose} />}
      {/* Cart btn is inside header. We need to pass pointer of a function
      down to header throw props. Also could use Contex. */}
      <Header onCartShow={handleCartShow} />
      <main>
        <Meals />
      </main>
    </Fragment>
  )
}

export default App
