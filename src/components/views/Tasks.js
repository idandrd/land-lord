import React from "react";
import { Card, Icon, Avatar, Menu, Dropdown, message } from "antd";
import { ContentFrame } from "../ContentFrame";
const { Meta } = Card;

export class Tasks extends React.Component {
  state = {
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

  handleTaskDone(taskId) {
    const newTasks = this.state.tasks.filter(task => task.id !== taskId);
    this.setState({ tasks: newTasks });
    message.success("המשימה הושלמה בהצלחה!");
  }

  render() {
    return (
      <ContentFrame firstNavText={""}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          {this.state.tasks.map((task, i) => (
            <Card
              key={i}
              style={{ direction: "rtl", width: 400, marginBottom: 10 }}
              hoverable
              actions={[
                <Dropdown overlay={SnoozeMenu} trigger={["click"]}>
                  <Icon type="clock-circle-o" />
                </Dropdown>,
                <Icon
                  type="check"
                  onClick={() => this.handleTaskDone(task.id)}
                />
              ]}
            >
              <Meta
                avatar={<Avatar src={task.imgPath} />}
                title={task.title}
                description={task.dueDate}
              />
              <div>{task.tenantName}</div>
              <div>{task.unitAddress}</div>
            </Card>
          ))}
        </div>
      </ContentFrame>
    );
  }
}

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

Tasks.propTypes = {};
