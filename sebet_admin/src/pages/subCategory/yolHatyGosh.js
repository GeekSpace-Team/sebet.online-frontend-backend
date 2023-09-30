import React, { useState } from "react";

import { Input, Steps, Button, message, Upload } from "antd";
import "antd/dist/antd.css";
import { PlusCircleFilled, CloseCircleOutlined ,UploadOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../utils/axiosIntance";
import "./yolHatyGosh.css";
import axios from "axios";
import fetch from "node-fetch";


const YolHatyGosh = (props) => {
let getData = props.getData;
  const [ name ,setName] = useState(null);
  const [ name_ru ,setName_ru] = useState(null);

 
  const onSubmit = async(event) => {

    await axiosInstance.post("/admin/brands/add",{
      brand_name_tm:name,
      brand_name_ru:name_ru,
    }).then((data)=>{
      message.success("Brand Üstünlikli Döredildi!");
      setName("");
      setName_ru("");
       getData();
    }).catch((err)=>{
      console.log("errorrrrrorr",err);
      message.error("Maglumatlary doly girizin!");
    });
  };
  
    

  return (
    <div className="yolHaty-gosh">
      <form className="yolHaty--form" >
    
        <div className="steps-content" style={{width:"100%"}}>
              <Input 
              style={{marginTop:"10px"}}
              onChange={(e)=>{setName(e.target.value)}} 
              value={name} 
              addonBefore="Brand Ady" 
              className="yolHaty-gosh--input" />
              <Input  
              style={{marginTop:"10px"}}
              onChange={(e)=>{setName_ru(e.target.value)}} 
              value={name_ru} 
              addonBefore="Brand Ady" 
              className="yolHaty-gosh--input" />
            <Button
               style={{width:"150px",margin:"10px 100px"}}
              type="primary" 
              shape="round"
              onClick={()=>{onSubmit()}}
            >
              Döret
            </Button>
       
        </div>
      </form>
    </div>
  );
};

export default YolHatyGosh;
