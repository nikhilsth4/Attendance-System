import React from "react"
import Button from "../Button.tsx"
import Card from "../Card"
import InputField from "../InputField"
import { checkError } from "../LoginForm"
import Modal from "../Modal"
import styles from "./AttendanceModal.module.css"
import moment from "moment"
import { toast } from "react-toastify"
import { AttendanceInterface, UserInterface } from "../../interfaces"

const AttendanceModal = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean
  setOpenModal: (modal: boolean) => void
}) => {
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
    checked: "checkedIn",
    remarks: "",
  })

  const [errorFormData, setErrorFormData] = React.useState({
    username: "",
    password: "",
    checked: "",
  })

  if (!openModal) {
    return null
  }

  const onFormChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value })
    checkError(key, value, errorFormData, setErrorFormData)
  }

  const disabled =
    errorFormData.username.length > 0 ||
    errorFormData.password.length > 0 ||
    formData.username.length === 0 ||
    formData.password.length === 0 ||
    errorFormData.checked.length > 0

  const onModalClose = () => {
    return setOpenModal(false)
  }

  const onFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const registeredUsers = localStorage.getItem("users")
    if (registeredUsers) {
      const users = JSON.parse(registeredUsers)
      const user = users.find(
        (user: UserInterface) => user.username === formData.username
      )
      if (user) {
        if (user.password === formData.password) {
          const allAttendances = localStorage.getItem("attendances")
          if (allAttendances) {
            const attendances = JSON.parse(allAttendances)
            const attendedToday = attendances.find(
              (attendance: AttendanceInterface) =>
                attendance.username === formData.username &&
                moment(attendance.date).format("YYYY-MM-DD") ===
                  moment().format("YYYY-MM-DD")
            )

            if (!attendedToday) {
              if (formData.checked === "checkedIn") {
                const newAttendance = {
                  date: moment(),
                  checkedIn: moment().format("HH:mm"),
                  checkedOut: null,
                  username: formData.username,
                  remarks: formData.remarks,
                }
                attendances.push(newAttendance)
                setOpenModal(false)
                setFormData({
                  username: "",
                  password: "",
                  checked: "checkedIn",
                  remarks: "",
                })
                toast.success("Attendance added successfully")
                return localStorage.setItem(
                  "attendances",
                  JSON.stringify(attendances)
                )
              }
              return setErrorFormData({
                ...errorFormData,
                checked: "Should check in first",
              })
            } else {
              if (attendedToday.checkedIn) {
                if (formData.checked === "checkedOut") {
                  if (attendedToday.checkedOut) {
                    return setErrorFormData({
                      ...errorFormData,
                      checked: "Already Checked out today",
                    })
                  }

                  if (!attendedToday.checkedOut) {
                    const newAttendance = {
                      ...attendedToday,
                      checkedOut: moment().format("HH:mm"),
                    }
                    const newAttendances = attendances.map(
                      (attendance: AttendanceInterface) => {
                        if (attendance.date === attendedToday.date) {
                          if (attendance.username === formData.username) {
                            return newAttendance
                          }
                        }
                        return attendance
                      }
                    )
                    setOpenModal(false)
                    setFormData({
                      username: "",
                      password: "",
                      checked: "checkedIn",
                      remarks: "",
                    })
                    toast.success("Attendance updated successfully")
                    return localStorage.setItem(
                      "attendances",
                      JSON.stringify(newAttendances)
                    )
                  }
                }
                return setErrorFormData({
                  ...errorFormData,
                  checked: "Already Checked in",
                })
              }
            }
          }
        } else {
          return setErrorFormData({
            ...errorFormData,
            password: "Invalid credentials",
          })
        }
      } else {
        return setErrorFormData({
          ...errorFormData,
          username: "Please signup first",
        })
      }
    }
  }

  return (
    <Modal>
      <Card>
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
          <div className={styles.radioContainer}>
            <div className={styles.formGroup}>
              <h3 className={styles.label}>Direction of attendance : </h3>

              <label className={styles.value}>
                <input
                  type="radio"
                  value="checkedIn"
                  checked={formData.checked === "checkedIn"}
                  onChange={(e) => {
                    setFormData({ ...formData, checked: e.target.value })
                    setErrorFormData({ ...errorFormData, checked: "" })
                  }}
                />
                Check In
              </label>
              <label className={styles.value}>
                <input
                  type="radio"
                  value="checkedOut"
                  checked={formData.checked === "checkedOut"}
                  onChange={(e) => {
                    setFormData({ ...formData, checked: e.target.value })
                    setErrorFormData({ ...errorFormData, checked: "" })
                  }}
                />
                Check Out
              </label>
            </div>
            {errorFormData.checked.length > 0 && (
              <p className={styles.errorText}>{errorFormData.checked}</p>
            )}
          </div>
          <textarea
            className={styles.formControl}
            cols={4}
            placeholder="Enter remarks"
            value={formData.remarks}
            onChange={(e) => onFormChange("remarks", e.target.value)}
          ></textarea>

          <Button type="submit" title="Submit Attendance" disabled={disabled} />
          <Button
            type="button"
            title="Close"
            onClick={onModalClose}
            color="accent"
          />
        </form>
      </Card>
    </Modal>
  )
}

export default AttendanceModal
