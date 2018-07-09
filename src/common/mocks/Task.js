import { TaskStatus, TaskType } from "../constants";
import moment from "moment";

export const RegularCheckTaskA = {
  id: "54321",
  contractId: "abc123",
  type: TaskType.RegularCheck,
  status: TaskStatus.Active,
  dueDate: "2018-08-20"
};

export const TaskCardA = {
  id: "54321",
  title: "Check Deposit",
  dueDate: moment(),
  imgPath: "https://previews.123rf.com/images/cowpland/cowpland1411/cowpland141100049/33356139-bank-check-icon-flat-design-with-long-shadows-.jpg",
  tenantName: "Idan & Noa",
  unitAddress: "Netzah-Israel 11, Tel-Aviv",
  contractId: "12345"
};
