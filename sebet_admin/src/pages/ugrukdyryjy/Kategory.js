import React, { useState, useEffect, useContext } from "react";

import { Input, Steps, Button, Drawer, message, Select } from "antd";
import "antd/dist/antd.css";
import { PlusCircleFilled, CloseCircleOutlined,SearchOutlined } from "@ant-design/icons";
import { axiosInstance } from "../../utils/axiosIntance";
import KategoriyaGosh from "./Kategorigosh";
import YolHatyGozle from "./brandGozle";
import YolHatyBerTable from "./KategoryTable";
import tm from "../../lang/tm.json"
import ru from "../../lang/ru.json"
import "./yolHatyBer.css";
import { SebedimContext } from "../../context/Sebedim";
const { Option } = Select;

const YolHatyBer = (props) => {

  const { dil } = useContext(SebedimContext);
  const [Gosh, setGosh] = useState(false);
  const GoshButton = () => {
    setGosh(!Gosh);
    console.log(Gosh);
  };

  const [data, setData] = useState([]);
  const [ kategoriya, setKategoriya ] = useState();
  const [ market_id , setMarket_id ] = useState();
    // geting all data from database with api
    
    useEffect(()=>{
      getData();
      getBrands()
    },[])
    
    const getData = ()=>{
      axiosInstance.get("/admin/categories").then((data)=>{
        console.log("kategoriya",data.data);
        setData(data.data);
      }).catch((err)=>{
        console.log(err);
      })
    }

    const getBrands = (e)=>{
      axiosInstance.get("/admin/brands").then((data)=>{
        console.log(data.data);
        setKategoriya(data.data);
      }).catch((err)=>{
        console.log(err);
      });
    }

    function onChange(value) {
      console.log(`selected ${value}`);
      setMarket_id(value);
      getBrands(value);
    }
    function onSearch(val) {
      console.log('search:', val);
    }

  return (
    <div className="yolHatyBer">
      <Drawer
                width={400}
                className='lukman-table--drawer'
                title={dil==="tm"?tm.category.KategoriýaGoş:ru.category.KategoriýaGoş}
                placement="right"
                closable={true}
                mask={true}
                maskClosable={true}
                onClose={()=>GoshButton()}
                visible={Gosh}
            >
                     <KategoriyaGosh getBrands={getBrands} getData={getData} kategoriya={kategoriya}  onClick={GoshButton}/>

            </Drawer>
      <div className="yolHaty--gozleg">
      <div className="yolHaty-gozle">
      <form className="yolHaty-gozle--form">
        <div>
          <h3>{dil==="tm"?tm.category.AdminKategoriya:ru.category.AdminKategoriya}</h3>
        </div>
        <div>
          <Button
            onClick={GoshButton}
            shape="round"
            type="primary"
            icon={<PlusCircleFilled />}
            className="yolHaty-gozle--button"
          >
            {dil==="tm"?tm.category.KategoriýaDöret:ru.category.KategoriýaDöret}
          </Button>
        </div>
      </form>
    </div>
      </div>
      <div className="yolHaty-Table">
        <YolHatyBerTable getData={getData} getBrands={getBrands} data={[ data, setData]} />
      </div>
    </div>
  );
};

export default YolHatyBer;
