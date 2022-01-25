import React, { ChangeEvent } from "react"
import styles from "./InputField.module.css"

const InputField = ({
  placeholder,
  type = "text",
  value,
  onChange,
  errorMsg,
}: {
  placeholder: string
  type?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  errorMsg: string
}) => {
  const isError = errorMsg.length > 0
  return (
    <div className={styles.formGroup}>
      <div className={styles.formInput}>
        <input
          type={type}
          className={styles.formControl}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{ border: isError ? "2px solid hsl(0, 100%, 74%)" : "" }}
        />
        {isError && (
          <img
            className={styles.errorIcon}
            src="/static/icon-error.svg"
            alt="Error icon"
            width="24"
            height="24"
          />
        )}
      </div>
      {isError && <p className={styles.errorText}>{errorMsg}</p>}
    </div>
  )
}

export default InputField
