import React,{useState,useEffect, useContext} from 'react';
import { Button,Input,Drawer } from 'antd';
import "antd/dist/antd.css";
import { PlusCircleFilled } from '@ant-design/icons';

import { SebedimContext } from "../../context/Sebedim";
import tm from "../../lang/tm.json"
import ru from "../../lang/ru.json"

import YolHatyGosh from './brandGosh';
import YolHatyGozle from './brandGozle';
import YolHatyTable from './brandTable';
import { axiosInstance } from '../../utils/axiosIntance';

import './yolHaty.css';

const YolHaty = prop =>{

  const { dil } = useContext(SebedimContext);
    const [Gosh,setGosh]=useState(false);
    const GoshButton = ()=>{
            setGosh(!Gosh);
            console.log(Gosh);
    }    
    const [data, setData] = useState([]);
    // geting all data from database with api
    
    useEffect(()=>{
      getData();
      
    },[])
    
    const getData = ()=>{
      axiosInstance.get("/admin/brands",{
        params: {
          limit: 1000,
         }
      }).then((data)=>{
        console.log(data.data);
        setData(data.data);
      }).catch((err)=>{
        console.log("error",err);
      })
    }

    return(
        <div className='yolHaty'>
            {/* <div className='yolHaty--top'>
                <h2 className="yolHaty--header">Ýol Hatlar</h2>
                <Button onClick={GoshButton} shape='round' type='primary' icon={<PlusCircleFilled />} className='suruji--gosh'>Ýol Haty Döret</Button>
            </div> */}
            {/* {Gosh && <YolHatyGosh onClick={GoshButton}/>} */}
            <Drawer
                width={400}
                className='lukman-table--drawer'
                title={dil==="tm"?tm.brand.BrandDöret:ru.brand.BrandDöret}
                placement="right"
                closable={true}
                mask={true}
                maskClosable={true}
                onClose={()=>GoshButton()}
                visible={Gosh}
            >
                     <YolHatyGosh getData={getData} onClick={GoshButton}/>

            </Drawer>
            <div className='yolHaty--gozleg'>
                <YolHatyGozle GoshButton={GoshButton}/>
            </div>
            <div className='yolHaty-Table'>
                <YolHatyTable getData={getData} data={data}/>
            </div>
        </div>
    );
};

export default YolHaty;