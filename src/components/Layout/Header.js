import { Fragment } from 'react'

import HeaderCartBtn from './HeaderCartBtn'
import styles from './Header.module.css'

const Header = props => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>Ordering App</h1>
        <HeaderCartBtn onClick={props.onCartShow} />
      </header>
      <div className={styles.mainImage}></div>
    </Fragment>
  )
}

export default Header
