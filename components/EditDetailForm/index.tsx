import React, { ChangeEvent } from "react"
import { AttendanceInterface } from "../../interfaces"
import Button from "../Button.tsx"
import Card from "../Card"
import Modal from "../Modal"
import styles from "./EditDetailForm.module.css"

const EditDetailForm = ({
  openModal,
  setOpenModal,
  attendance,
  onFormSubmit,
}: {
  openModal: boolean
  setOpenModal: (modal: boolean) => void
  attendance: AttendanceInterface
  onFormSubmit: (e: React.SyntheticEvent, formData: AttendanceInterface) => void
}) => {
  const [formData, setFormData] = React.useState({
    checkedIn: "",
    checkedOut: "",
  })

  React.useEffect(() => {
    setFormData({
      ...formData,
      checkedIn: attendance.checkedIn,
      checkedOut: attendance.checkedOut,
    })
  }, [])

  if (!openModal) {
    return null
  }

  const onFormChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value })
  }

  return (
    <Modal>
      <Card>
        <form
          className={styles.formContainer}
          onSubmit={(e: React.SyntheticEvent) => {
            const updatedAttendance = {
              ...attendance,
              checkedIn: formData.checkedIn,
              checkedOut: formData.checkedOut,
            }
            onFormSubmit(e, updatedAttendance)
            setOpenModal(false)
          }}
        >
          <input
            type="time"
            value={formData.checkedIn}
            className={styles.formControl}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onFormChange("checkedIn", e.target.value)
            }
          />
          <input
            type="time"
            value={formData.checkedOut}
            className={styles.formControl}
            onChange={(e) => onFormChange("checkedOut", e.target.value)}
          />
          <Button type="submit" title="Submit" />
          <Button
            title="Close"
            color="accent"
            onClick={() => setOpenModal(false)}
          />
        </form>
      </Card>
    </Modal>
  )
}

export default EditDetailForm
