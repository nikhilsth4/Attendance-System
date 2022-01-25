import React from "react"
import styles from "./Button.module.css"
import cls from "classnames"

const Button = ({
  disabled = false,
  title,
  onClick = () => {},
  type = "button",
  size = "lg",
  color = "secondary",
}: {
  disabled?: boolean
  title: string
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  size?: string
  color?: string
}): JSX.Element => {
  return (
    <button
      type={type}
      className={cls(styles.button, styles[size], styles[color])}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default Button
