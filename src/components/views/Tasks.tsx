import React from "react";
import { Card, Icon, Avatar, Menu, Dropdown, Divider, message } from "antd";

import { PopulatedTask, BaseTask, TaskType } from "../../types";
import { firebaseService } from "../../service";
import { ContentFrame } from "../ContentFrame";
const { Meta } = Card;

interface PopulatedDateTask extends PopulatedTask {
  deadlineDate: Date;
}

export class Tasks extends React.Component<{ tasks: PopulatedTask[] }> {
  handleTaskDone(task: PopulatedTask) {
    const baseTask: BaseTask = {
      contractId: task.contractId,
      taskType: task.taskType,
      deadline: task.deadline,
      status: "done"
    };
    firebaseService.updateTask(task.id, baseTask);
    message.success("המשימה הושלמה בהצלחה!");
  }

  render() {
    const tasks: PopulatedDateTask[] = [...this.props.tasks]
      .filter(task => task.status === "active")
      .map(task => ({ ...task, deadlineDate: new Date(task.deadline) }))
      .sort(tasksSortCompare);

    return (
      <ContentFrame firstNavText={""}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <Divider>משימות שעבר להן התאריך</Divider>
          <TasksList tasks={tasks.filter(isPastTask)} />
          <Divider>משימות לשבוע הקרוב</Divider>
          <TasksList tasks={tasks.filter(isNextWeekTask)} />
          <Divider>משימות לחודש הקרוב</Divider>
          <TasksList tasks={tasks.filter(isNextMonthTask)} />
          <Divider>משימות לעתיד</Divider>
          <TasksList tasks={tasks.filter(isFutureTask)} />
          {/* <TasksList tasks={tasks.filter(task => task.status === "active")} /> */}
        </div>
      </ContentFrame>
    );
  }
}

const TasksList = (props: { tasks: PopulatedDateTask[] }) => (
  <div>
    {props.tasks.map(task => (
      <Card
        key={task.id}
        style={{ direction: "rtl", width: 400, marginBottom: 10 }}
        hoverable
        actions={[
          <Dropdown overlay={SnoozeMenu} trigger={["click"]}>
            <Icon type="clock-circle-o" />
          </Dropdown>,
          <Icon type="check" onClick={() => this.handleTaskDone(task)} />
        ]}
      >
        <Meta
          avatar={<Avatar src={imgPath} />}
          title={getTaskTitle(task.taskType)}
          description={task.deadline}
        />
        <div>{task.contract.tenant.name}</div>
        <div>{`${task.contract.asset.city} ${
          task.contract.asset.address
        }`}</div>
      </Card>
    ))}
  </div>
);

const SnoozeMenu = (
  <Menu>
    <Menu.Item key="0">
      <a>הזכר לי בעוד יום</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a>הזכר לי בעוד שלושה ימים</a>
    </Menu.Item>
    <Menu.Item key="3">הזכר לי בעוד שבוע</Menu.Item>
  </Menu>
);

const tasksSortCompare = (taskA: PopulatedTask, taskB: PopulatedTask) => {
  const dateA = new Date(taskA.deadline);
  const dateB = new Date(taskB.deadline);
  if (dateA < dateB) {
    return -1;
  }
  if (dateA > dateB) {
    return 1;
  }
  return 0;
};

const getTaskTitle = (taskType: TaskType) => {
  switch (taskType) {
    case "depositCheck":
      return "להפקיד צ'ק";
  }
};

const isPastTask = (task: PopulatedDateTask) => task.deadlineDate < new Date();
const isNextWeekTask = (task: PopulatedDateTask) => {
  if (isPastTask(task)) {
    return false;
  }
  const nextWeekDate = new Date();
  nextWeekDate.setDate(nextWeekDate.getDate() + 7);
  return task.deadlineDate < nextWeekDate;
};
const isNextMonthTask = (task: PopulatedDateTask) => {
  if (isNextWeekTask(task)) {
    return false;
  }
  console.log(task);
  const nextMonthDate = new Date();
  nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
  console.log("nextMonthDate", nextMonthDate);
  return task.deadlineDate < nextMonthDate;
};
const isFutureTask = (task: PopulatedDateTask) => !isNextMonthTask(task);

const imgPath =
  "https://previews.123rf.com/images/cowpland/cowpland1411/cowpland141100049/33356139-bank-check-icon-flat-design-with-long-shadows-.jpg";

const deprecated = {
  tasks: [
    {
      id: "54321",
      title: "להפקיד צ'ק",
      dueDate: "20/08/2018",
      imgPath:
        "https://previews.123rf.com/images/cowpland/cowpland1411/cowpland141100049/33356139-bank-check-icon-flat-design-with-long-shadows-.jpg",
      tenantName: "קסטרו",
      unitAddress: "יורדי הסירה 15, נתניה",
      contractId: "12345"
    },
    {
      id: "5432321",
      title: "לחדש ערבות בנקאית",
      dueDate: "03/09/2018",
      imgPath:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPgI3HfspcXjsAA9xDHRA_T7xShb5GvbXF3OvPUXoPIhIBIjXecA",
      tenantName: "איציק הסנדלר",
      unitAddress: "מתכנתי הבתים 3, תל אביב",
      contractId: "12345"
    },
    {
      id: "5432e21",
      title: "לחדש ערבות בנקאית",
      dueDate: "03/09/2018",
      imgPath:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPgI3HfspcXjsAA9xDHRA_T7xShb5GvbXF3OvPUXoPIhIBIjXecA",
      tenantName: "איציק הסנדלר",
      unitAddress: "מתכנתי הבתים 3, תל אביב",
      contractId: "12345"
    },
    {
      id: "2321",
      title: "לבדוק האם צ'ק נכנס",
      dueDate: "04/09/2018",
      imgPath:
        "https://previews.123rf.com/images/cowpland/cowpland1412/cowpland141200148/34904564-bank-check-icon-flat-design-.jpg",
      tenantName: "קסטרו",
      unitAddress: "יורדי הסירה 15, נתניה",
      contractId: "12345"
    }
  ]
};
