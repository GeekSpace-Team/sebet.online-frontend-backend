import React from "react";
import {Link} from "react-router-dom"
// import { Select } from "antd";
import "antd/dist/antd.css";
import {HomeOutlined,RightOutlined} from '@ant-design/icons';
import "./location.css";
// import sebet_icon from "../img/red_sebet_icon.svg";
const Location =(props)=>{
    return (
        <div className="location">
          <a href="/" ><HomeOutlined /> </a>
          <h3> <RightOutlined /> </h3>
          <h3 onClick={props.nameClick}>{props.name}</h3>
          <h3> { props.name2 &&  <RightOutlined /> }</h3>
          <h3>{props.name2}</h3>
        </div>
    );
};

export default Location;