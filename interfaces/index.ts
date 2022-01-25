import { Moment } from "moment"

export interface UserInterface {
  username: string
  password: string
}

export interface AttendanceInterface {
  date: Date | Moment
  checkedIn: string
  checkedOut: string
  username: string
  remarks: string
}
