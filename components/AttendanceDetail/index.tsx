import moment, { Moment } from "moment"
import React, { ChangeEvent } from "react"
import Card from "../Card"
import Header from "../Header"
import styles from "./AttendanceDetail.module.css"
import cls from "classnames"
import Button from "../Button.tsx"
import EditDetailForm from "../EditDetailForm"
import { AttendanceInterface } from "../../interfaces"

interface AttendanceDetailProps {
  checkedIn: string
  checkedOut: string
  date: Date | Moment
  onDelete: (date: Date | Moment) => void
  attendance: AttendanceInterface
  onFormSubmit: (e: React.SyntheticEvent, formData: AttendanceInterface) => void
}

const AttendanceDetail = ({
  checkedIn,
  checkedOut,
  date,
  onDelete,
  attendance,
  onFormSubmit,
}: AttendanceDetailProps): JSX.Element => {
  const [openModal, setOpenModal] = React.useState(false)

  const findStatus = () => {
    if (checkedIn && checkedOut) {
      return { value: "Present", color: "secondary" }
    }
    if (checkedIn && !checkedOut) {
      return { value: "Missed", color: "accent" }
    }
    return { value: "Absent", color: "primary" }
  }

  return (
    <div>
      <Header title={moment(date).format("YYYY-MM-DD")} />
      <Card>
        <>
          <div className={styles.detailContainer}>
            <div className={styles.container}>
              <h3 className={styles.label}>Check In</h3>
              <h3 className={styles.value}>{checkedIn}</h3>
            </div>
            <div className={styles.container}>
              <h3 className={styles.label}>Check Out</h3>
              <h3 className={styles.value}>
                {checkedOut ? checkedOut : "N/A"}
              </h3>
            </div>
            <div className={styles.container}>
              <h3 className={styles.label}>Status</h3>
              <h3 className={cls(styles.value, styles[findStatus().color])}>
                {findStatus().value}
              </h3>
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button
              title="Edit"
              size="sm"
              color="accent"
              onClick={() => setOpenModal(true)}
            />
            <Button
              title="Delete"
              size="sm"
              color="primary"
              onClick={() => onDelete(date)}
            />
          </div>
        </>
      </Card>
      {openModal && (
        <EditDetailForm
          openModal={openModal}
          setOpenModal={setOpenModal}
          attendance={attendance}
          onFormSubmit={onFormSubmit}
        />
      )}
    </div>
  )
}

export default AttendanceDetail
