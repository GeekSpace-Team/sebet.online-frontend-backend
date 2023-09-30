import React from "react";
import { Input, Button } from "antd";
import "antd/dist/antd.css";
import {
  PlusCircleFilled,
  CloseCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import "./yolHatyGozle.css";

const YolHatyGozle = (props) => {
  const GoshButton = props.GoshButton;
  return (
    <div className="yolHaty-gozle">
      <form className="yolHaty-gozle--form">
        <div>
        <h2 style={{margin:"10px 10px"}}>Admin Brand page</h2>
          {/* <Input
            className="yolHaty-gozle--input"
            placeholder="Id No"
            addonAfter={<SearchOutlined />}
          />
          <Input
            className="yolHaty-gozle--input"
            placeholder="Umumy Gözleg"
            addonAfter={<SearchOutlined />}
          /> */}
        </div>
        <div>
          <Button
            onClick={GoshButton}
            shape="round"
            type="primary"
            icon={<PlusCircleFilled />}
            className="yolHaty-gozle--button"
          >
            Brand Döret
          </Button>
        </div>
      </form>
    </div>
  );
};

export default YolHatyGozle;
