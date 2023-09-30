import React from "react";
import { Input, Select, Button } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import "./filter.css";
const { Search } = Input;
const { Option } = Select;
const Filter = () => {
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: "#1890ff",
      }}
    />
  );
  return (
    <div className="user-filter">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "left",
          alignItems: "center",
        }}
      >
        <Search placeholder="Umumy gozleg" style={{ width: 250 }} />

        <div style={{ marginLeft: 20 }}>
          <Select defaultValue="ahlisi" style={{ width: 250 }}>
            <Option value="ahlisi">Ahlisi</Option>
            <Option value="admin">Admin</Option>
            <Option value="Dispecher">Dispecher</Option>
            <Option value="lukman">Lukman</Option>
            <Option value="lukman">Mehanik</Option>
          </Select>
        </div>
      </div>
      <div>
        <Button style={{ borderRadius: 16 }} type="primary">
          Ulanyjy goshmak
        </Button>
      </div>
    </div>
  );
};

export default Filter;
