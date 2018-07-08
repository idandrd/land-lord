import React from "react";
import PropTypes from "prop-types";
import { Card, Icon, Avatar } from "antd";
import { ContentFrame } from "../ContentFrame";
import { Routes } from "../../common/constants";
const { Meta } = Card;

export class Tasks extends React.Component {
  render() {
    return (
      <ContentFrame firstNavText={""}>
        <div style={{display: 'flex', alignItems: "center", flexDirection: "column"}}>
          <Card
          style={{ direction: "rtl", width: 400, marginBottom: 10 }}
          hoverable
          actions={[
            <Icon type="clock-circle-o" />,
            <Icon type="check" />
          ]}
        >
          <Meta
            avatar={
              <Avatar src="https://previews.123rf.com/images/cowpland/cowpland1411/cowpland141100049/33356139-bank-check-icon-flat-design-with-long-shadows-.jpg" />
            }
            title="להפקיד צ'ק"
            description="20/08/2018"
          />
          <div>קסטרו</div>
          <div>יורדי הסירה 15, נתניה</div>
        </Card>
          <Card
          style={{ direction: "rtl", width: 400, marginBottom: 10 }}
          hoverable
          actions={[
            <Icon type="clock-circle-o" />,
            <Icon type="check" />
          ]}
        >
          <Meta
            avatar={
              <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPgI3HfspcXjsAA9xDHRA_T7xShb5GvbXF3OvPUXoPIhIBIjXecA" />
            }
            title="לחדש ערבות בנקאית"
            description="03/09/2018"
          />
          <div>איציק הסנדלר</div>
          <div>מתכנתי הבתים 3, תל אביב</div>
        </Card>
          <Card
          style={{ direction: "rtl", width: 400 }}
          hoverable
          actions={[
            <Icon type="clock-circle-o" />,
            <Icon type="check" />
          ]}
        >
          <Meta
            avatar={
              <Avatar src="https://previews.123rf.com/images/cowpland/cowpland1412/cowpland141200148/34904564-bank-check-icon-flat-design-.jpg" />
            }
            title="לבדוק האם צ'ק נכנס"
            description="4/09/2018"
          />
          <div>קסטרו</div>
          <div>יורדי הסירה 15, נתניה</div>
        </Card>
        </div>
      </ContentFrame>
    );
  }
}

Tasks.propTypes = {};
