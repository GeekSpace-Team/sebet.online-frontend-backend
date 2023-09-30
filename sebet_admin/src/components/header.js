import React, { useContext, useState } from "react";
import "antd/dist/antd.css";
import "./header.css";
import { Layout, Menu, Input, Dropdown, Badge, Popover, Select } from "antd";

import { UserOutlined, BellOutlined, LogoutOutlined } from "@ant-design/icons";
import {logout} from "../utils/index"
import { SebedimContext } from "../context/Sebedim";
const { Search } = Input;
const content = (
  <div>
    <p>Notification 1</p>
    <p>Notification 2</p>
  </div>
);
const { Header } = Layout;
const Logout = ()=>{

logout();
window.location.href = "/"
}
const profile_menu = (
  <Menu>
    {/* <Menu.Item>
      <a target="_blank" rel="noopener noreferrer">
        <UserOutlined /> Profile
      </a>
    </Menu.Item> */}
    <Menu.Item>
      <a onClick={()=>Logout()} target="_blank" rel="noopener noreferrer">
        <LogoutOutlined /> Logout
      </a>
    </Menu.Item>
  </Menu>
);

const  Headers = ()=> {
  
  const { dil ,ChangeDil } = useContext(SebedimContext);
  const [baydak,setBaydak] = useState(dil=="tm"?"🇹🇲":"🇷🇺");

  const handleLanguage = (value)=>{
    if(value==="🇷🇺"){
      ChangeDil("ru");
      setBaydak("🇷🇺");
    }else{
      setBaydak("🇹🇲");
      ChangeDil("tm");
    }
    // ChangeDil(value)
  }
    return (
      <Header
        className="site-layout-background header"
        style={{ position: "fixed" }}
      >
        {/* <Search
          placeholder="input search text"
          onSearch={(value) => console.log(value)}
          className="search"
        /> */}
        <div className="App-title">
          Sebet Market
        </div>
        <div style={{position:"fixed",top:"0",right:"70px"}}>
        <Select
            defaultValue={baydak} 
            // value={baydak}
            onChange={handleLanguage}>
              <option value="🇹🇲" > 🇹🇲 </option>

              <option value="🇷🇺" > 🇷🇺 </option>
          </Select>
        </div>
        <div className="profile">
          <Dropdown overlay={profile_menu}>
            <div
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <UserOutlined />
            </div>
          </Dropdown>
        </div>

        {/* <div className="notify">
          <Popover
            placement="bottom"
            title="Notification"
            content={content}
            trigger="click"
          >
            <Badge count={5}>
              <BellOutlined style={{ fontSize: 22 }} />
            </Badge>
          </Popover>
        </div> */}
      </Header>
    );
  }
 
export default   Headers;