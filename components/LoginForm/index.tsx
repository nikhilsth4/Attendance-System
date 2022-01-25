import { useRouter } from "next/router"
import React, { ChangeEvent } from "react"
import { toast } from "react-toastify"
import { UserInterface } from "../../interfaces"
import Button from "../Button.tsx"
import InputField from "../InputField"
import styles from "./LoginForm.module.css"

export const checkError = (
  key: string,
  value: string,
  errorFormData: any,
  setErrorFormData: (user: any) => void
) => {
  const validUsername = new RegExp("^[A-Za-z][A-Za-z0-9_]{3,12}$")
  const validPassword = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{4,16}")

  if (key !== "remarks" && value === "") {
    return setErrorFormData({
      ...errorFormData,
      [key]: `${key} should not be empty`,
    })
  } else if (
    key === "username" || key === "password"
      ? key === "username"
        ? !validUsername.test(value)
        : !validPassword.test(value)
      : false
  ) {
    if (key === "username") {
      return setErrorFormData({
        ...errorFormData,
        [key]:
          "Username should begin with alphabet and minimum length should be 4",
      })
    } else {
      return setErrorFormData({
        ...errorFormData,
        [key]:
          "Password should require minimum 4 at least one lowercase, one uppercase and number",
      })
    }
  }
  return setErrorFormData({ ...errorFormData, [key]: "" })
}

const LoginForm = () => {
  const router = useRouter()
  const initialFormData = {
    username: "",
    password: "",
  }
  const [formData, setFormData] = React.useState(initialFormData)

  const [errorFormData, setErrorFormData] = React.useState(initialFormData)

  const onFormChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value })
    checkError(key, value, errorFormData, setErrorFormData)
  }

  const disabled =
    errorFormData.username.length > 0 ||
    errorFormData.password.length > 0 ||
    formData.username.length === 0 ||
    formData.password.length === 0

  const onFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const registeredUsers = localStorage.getItem("users")
    const newUser = {
      username: formData.username,
      password: formData.password,
    }
    if (registeredUsers) {
      const users: { username: string; password: string }[] =
        JSON.parse(registeredUsers)

      let user = users.find((user) => user.username === formData.username)
      if (user) {
        if (user.password === formData.password) {
          localStorage.setItem(
            "user",
            JSON.stringify({ username: user.username, password: user.password })
          )
          toast.success("Logged In successfully")
          return router.push("/")
        }
        return setErrorFormData({
          ...errorFormData,
          password: "Invalid credentials",
        })
      }

      users.push(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
      localStorage.setItem("users", JSON.stringify(users))
      toast.success("Logged In successfully")
      return router.push("/")
    }

    if (!localStorage.getItem("user")) {
      localStorage.setItem("user", JSON.stringify({}))
    }
    localStorage.setItem("user", JSON.stringify(newUser))

    localStorage.setItem("users", JSON.stringify([newUser]))
    toast.success("Logged In successfully")
    return router.push("/")
  }

  return (
    <>
      <form className={styles.formContainer} onSubmit={onFormSubmit}>
        <InputField
          placeholder="Enter your username"
          value={formData.username}
          onChange={(e) => onFormChange("username", e.target.value)}
          errorMsg={errorFormData.username}
        />
        <InputField
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) => onFormChange("password", e.target.value)}
          errorMsg={errorFormData.password}
        />
        <Button type="submit" title="Click here to Login" disabled={disabled} />
      </form>
    </>
  )
}

export default LoginForm
