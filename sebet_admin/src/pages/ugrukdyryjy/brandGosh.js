import React, { useContext, useState } from "react";

import { Input, Steps, Button, message, Upload } from "antd";
import "antd/dist/antd.css";
import { SebedimContext } from "../../context/Sebedim";
import tm from "../../lang/tm.json"
import ru from "../../lang/ru.json"
import { PlusCircleFilled, CloseCircleOutlined ,UploadOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../utils/axiosIntance";
import "./yolHatyGosh.css";
import axios from "axios";
import fetch from "node-fetch";


const YolHatyGosh = (props) => {

  const { dil } = useContext(SebedimContext);
let getData = props.getData;
  const [ name ,setName] = useState(null);
  const [ name_ru ,setName_ru] = useState(null);

 
  const onSubmit = async(event) => {

    await axiosInstance.post("/admin/brands/add",{
      brand_name_tm:name,
      brand_name_ru:name_ru,
    }).then((data)=>{
      message.success(dil==="tm"?tm.brand.BrandDöredildi:ru.brand.BrandDöredildi);
      setName("");
      setName_ru("");
       getData();
    }).catch((err)=>{
      console.log("errorrrrrorr",err);
      message.error(dil==="tm"?tm.brand.dolyGirizin:ru.brand.dolyGirizin);
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
              addonBefore={dil==="tm"?tm.brand.BrandAdy_tm:ru.brand.BrandAdy_tm}
              className="yolHaty-gosh--input" />
              <Input  
              style={{marginTop:"10px"}}
              onChange={(e)=>{setName_ru(e.target.value)}} 
              value={name_ru} 
              addonBefore={dil==="tm"?tm.brand.BrandAdy_ru:ru.brand.BrandAdy_ru}
              className="yolHaty-gosh--input" />
            <Button
               style={{width:"150px",margin:"10px 100px"}}
              type="primary" 
              shape="round"
              onClick={()=>{onSubmit()}}
            >
              {dil==="tm"?tm.brand.Döret:ru.brand.Döret}
            </Button>
       
        </div>
      </form>
    </div>
  );
};

export default YolHatyGosh;
