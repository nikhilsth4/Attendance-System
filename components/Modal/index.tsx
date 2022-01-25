import React from "react"
import styles from "./Modal.module.css"

const Modal = ({ children }: { children: JSX.Element }) => {
  return <div className={styles.modal}>{children}</div>
}

export default Modal
