import React from "react"
import styles from "./Header.module.css"

const Header = ({ title }: { title: string }): React.ReactElement => {
  return (
    <div className={styles.header}>
      <h2 className={styles.headerTitle}>{title}</h2>
    </div>
  )
}

export default Header
