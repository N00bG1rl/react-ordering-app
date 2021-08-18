import { Fragment } from "react"

import HeaderCartBtn from "./HeaderCartBtn"

import mainImage from "../../assets/main.jpg"
import styles from "./Header.module.css"

const Header = props => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>CandyShop</h1>
        {/* App.js pointer. onClick is our choice */}
        <HeaderCartBtn onClick={props.onCartShow} />
      </header>
      <div className={styles["main-image"]}>
        <img src={mainImage} alt='Pink Doughnut with candy sprinkles.' />
      </div>
    </Fragment>
  )
}

export default Header
