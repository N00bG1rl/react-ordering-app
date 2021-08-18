import { createDomStream } from "htmlparser2"
import { Fragment } from "react"
import ReactDOM from "react-dom"

import styles from "./Modal.module.css"

// Component functions - Both gets props because they get data
const Backdrop = props => {
  return <div className={styles.backdrop} />
}

const ModalOverlay = props => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  )
}

const portalElement = document.getElementById("overlays")

// Main component withch is exported
const Modal = props => {
  return (
    <Fragment>
      {/* Use portals for cleaner html result. Portal need second arg - where to */}
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  )
}

export default Modal
