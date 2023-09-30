import React, { useContext, useState } from "react";

import { Input, Steps, Button, message, Upload } from "antd";
import "antd/dist/antd.css";
import { PlusCircleFilled, CloseCircleOutlined ,UploadOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../utils/axiosIntance";
import tm from "../../lang/tm.json"
import ru from "../../lang/ru.json"
import "./yolHatyGosh.css";
import axios from "axios";
import fetch from "node-fetch";
import { SebedimContext } from "../../context/Sebedim";


const YolHatyGosh = (props) => {

  const {dil } = useContext(SebedimContext);
let getData = props.getData;
let getBrands = props.getBrands;
let brands = props.kategoriya;
  const [ name_tm ,setName_tm] = useState("");
  const [ name_ru ,setName_ru] = useState("");
  
  const KategoriyaGosh = ()=>{
    axiosInstance.post("/admin/categories/add",{
      category_name_tm: name_tm,
      category_name_ru:name_ru,
      // category_brands: ["8a5f7a3d-c725-494e-99fe-753f696aa5b1"]
    }).then((data)=>{
      console.log(data.data);
      message.success(data.data.msg);
      setName_tm();
      setName_ru();
      getBrands();
      getData()
    }).catch((err)=>{
      console.log(err);
    })
  }
    

  return (
    <div className="yolHaty-gosh" style={{width:"100%",justifyContent:"center"}}>
      <form className="yolHaty--form" style={{width:"100%",justifyContent:"center"}}>
    
        <div className="steps-content" style={{width:"100%",justifyContent:"center"}}>
            <div className="step1">
              <div className="yolHatyTable--uytgetmeler">
                <div className="yolHatyTable--uytgetmeler" style={{width:"100%",justifyContent:"center"}}>
                <Input
                    style={{margin:"10px 0px",width:"100%"}}
                    addonBefore={dil==="tm"?tm.category.KategoriýaAdy_tm:ru.category.KategoriýaAdy_tm}
                    className="suruji-uytget--input"
                    name="name_tm"
                    value={name_tm}
                    onChange={(e)=>setName_tm(e.target.value)}
                    />
                    <Input
                    style={{margin:"10px 0px",width:"100%"}}
                    addonBefore={dil==="tm"?tm.category.KategoriýaAdy_ru:ru.category.KategoriýaAdy_ru}
                    className="suruji-uytget--input"
                    name="name_ru"
                    value={name_ru}
                    onChange={(e)=>setName_ru(e.target.value)}
                    />
                </div>
                {/* <div>
                  {
                    brands.map((brand)=>{
                      return <div> 
                              <Input  type="checkbox" className="suruji-uytget--input" addonBefore={brand.brand_name}/>
                      </div>
                    })
                  }
                </div> */}
                    <Button
                    type="primary"
                    shape="round"
                    onClick={()=>KategoriyaGosh()}
                    >
                    {dil==="tm"?tm.category.Gosh:ru.category.Gosh}
                    </Button>
                </div>
            </div>
         
        </div>
        {/* <div className="steps-action">
         
          
            <Button
              type="primary" 
              onClick={()=>{onSubmit()}}
            >
              Döret
            </Button>
       
        </div> */}
      </form>
    </div>
  );
};

export default YolHatyGosh;
