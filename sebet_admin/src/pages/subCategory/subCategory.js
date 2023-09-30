import React, { useState, useEffect, useContext } from "react";

import { Input, Steps, Button, Drawer, message, Select } from "antd";
import "antd/dist/antd.css";
import tm from "../../lang/tm.json"
import ru from "../../lang/ru.json"
import { SebedimContext } from "../../context/Sebedim";

import { PlusCircleFilled, CloseCircleOutlined,SearchOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../utils/axiosIntance";
import KategoriyaGosh from "./SubKategorigosh";
import YolHatyGozle from "./yolHatyGozle";
import YolHatyBerTable from "./subKategoryTable";

import "./yolHatyBer.css";
const { Option } = Select;

const YolHatyBer = (props) => {

  const { dil } = useContext(SebedimContext)
  const [Gosh, setGosh] = useState(false);
  const GoshButton = () => {
    setGosh(!Gosh);
    console.log(Gosh);
  };

  const [data, setData] = useState([]);
  const [ kategoriya, setKategoriya ] = useState([]);
  const [ market_id , setMarket_id ] = useState();
  const [ kategor,setKategor] = useState(null);
  const [sub,setSub] = useState([]);
    // geting all data from database with api
    
    useEffect(()=>{
      getData();
    },[])
    useEffect(()=>{
     const time = setTimeout(()=>{
       if(data[0] && data[0].category_subcategories){
          let newData = data.filter((dat)=>{
            return dat.category_id === kategor
        })    
        if(newData[0] && newData[0].category_subcategories){
          setSub(newData[0].category_subcategories);
          console.log(newData[0].category_subcategories)
        }
    }
      },500)
      return ()=> clearTimeout(time)
    },[kategor])
    
    const create = (kategor)=>{
      if(data[0].category_subcategories){
        const newData = data.filter((dat)=>{
          return dat.category_id === kategor
      })    
      if(newData[0] && newData[0].category_subcategories){
        setSub(newData[0].category_subcategories);
        console.log(newData[0].category_subcategories)
      }
  }
    }
    const getData = ()=>{
      axiosInstance.get("/admin/categories").then((data)=>{
        console.log(data.data);
        setData(data.data);
      }).catch((err)=>{
        console.log(err);
      })
    }

    

    function onChange(value) {
      console.log(`selected ${value}`);
      setMarket_id(value);
    }
    function onSearch(val) {
      console.log('search:', val);
    }

  return (
    <div className="yolHatyBer">
      <Drawer
                width={400}
                className='lukman-table--drawer'
                title={dil==="tm"?tm.subCategory.SubKategoriýaGoş:ru.subCategory.SubKategoriýaGoş}
                placement="right"
                closable={true}
                mask={true}
                maskClosable={true}
                onClose={()=>GoshButton()}
                visible={Gosh}
            >
                     <KategoriyaGosh create={create}  getData={getData} data={data}  onClick={GoshButton}/>

            </Drawer>
      <div className="yolHaty--gozleg">
      <div className="yolHaty-gozle">
      <form className="yolHaty-gozle--form">
        <div>
          <Select
            className="kategor-select"
            placeholder={dil==="tm"?tm.subCategory.KategoriyaSaylaň:ru.subCategory.KategoriyaSaylaň}
            onChange={(value)=>{setKategor(value)}}
          >
            {
              data.map((kategor)=>{
                return <Option value={kategor.category_id}>{dil==="tm"?kategor.category_name_tm:kategor.category_name_ru}</Option>
              })
            }
          </Select>
        </div>
        <div>
          <Button
            onClick={GoshButton}
            shape="round"
            type="primary"
            icon={<PlusCircleFilled />}
            className="yolHaty-gozle--button"
          >
           {dil==="tm"?tm.subCategory.SubKategoriýaDöret:ru.subCategory.SubKategoriýaDöret}
          </Button>
        </div>
      </form>
    </div>
      </div>
      <div className="yolHaty-Table">
        <YolHatyBerTable getData={getData}  data={[ sub, setSub]} />
      </div>
    </div>
  );
};

export default YolHatyBer;
