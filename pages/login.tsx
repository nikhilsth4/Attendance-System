import React from "react"
import Card from "../components/Card"
import Header from "../components/Header"
import styles from "../styles/Login.module.css"
import cls from "classnames"
import AttendanceModal from "../components/AttendanceModal"
import LoginForm from "../components/LoginForm"
import { useRouter } from "next/router"
import { UserInterface } from "../interfaces"

const Login = (): React.ReactElement => {
  const router = useRouter()
  const [openModal, setOpenModal] = React.useState(false)

  if (typeof window !== "undefined") {
    const loggedInUser: UserInterface = JSON.parse(
      localStorage.getItem("user") || "{}"
    )
    if (loggedInUser?.username && loggedInUser?.password) {
      router.push("/")
    }
  }

  return (
    <main className={styles.login}>
      <div className={styles.description}>
        <h1 className={styles.descriptionTitle}>Attendance System</h1>
        <p className={styles.descriptionDetail}>
          What is an attendance system? Time and attendance systems (TNA) are
          used to track and monitor when employees start and stop work. A time
          and attendance system enables an employer to monitor their employees
          working hours and late arrivals, early departures, time taken on
          breaks and absenteeism.
        </p>
      </div>
      <div className={styles.cardContainer}>
        <Header title="Login / Signup with your credentials" />
        <Card>
          <>
            <LoginForm />
            <p className={styles.termsText}>
              For submission of attendence
              <a onClick={() => setOpenModal(true)}>
                <b className={cls("text--primary", styles.submitAttendance)}>
                  Submit Attendance
                </b>
              </a>
            </p>
          </>
        </Card>
      </div>
      <AttendanceModal openModal={openModal} setOpenModal={setOpenModal} />
    </main>
  )
}

export default Login
