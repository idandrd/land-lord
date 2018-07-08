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
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
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
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
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
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
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
