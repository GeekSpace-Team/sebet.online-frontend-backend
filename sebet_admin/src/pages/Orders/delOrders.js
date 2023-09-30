import React,{useContext, useEffect, useState} from 'react';

import {Button,Input,Drawer,Select} from 'antd';
import "antd/dist/antd.css";
import { SearchOutlined } from '@ant-design/icons';

import { SebedimContext } from "../../context/Sebedim";
import tm from "../../lang/tm.json"
import ru from "../../lang/ru.json"
import LukmanGozleg from './lukmanGozleg'; 
import UnitGosh from './UnitGosh';
import LukmanTable from './LukmanTable';
import  './lukman.css';
import { axiosInstance } from '../../utils/axiosIntance';
const {Option} = Select;

const Lukman = () =>{

    const {dil} = useContext(SebedimContext);
    const [units,setUnits] = useState([]);
            const [ statuses,setStatuses] = useState([]);
            const [ statusId, setStatusId] = useState(3);
            const [ all, setAll ] = useState();
            const [id,setId] = useState()

           


    useEffect(()=>{
        const time = setTimeout(() => {
            getOrders();
            console.log(id)
          }, 500);
        return ()=> clearTimeout(time);
    },[all,statusId,id]);

    // ,{
    //     params: {
    //       all: all,
    //       statusId:statusId
    //     }
    //   }

    const getOrders = (start,end)=>{
        axiosInstance.get("/admin/orders",{
            params: {
              user_phone:all,
              status:statusId,
              id:id,
              limit: 100000,
             }
          }).then((data)=>{
            console.log("orders",data.data);
            setUnits(data.data)
        }).catch((err)=>{
            console.log(err);
        })
    }

    const [Gosh,setGosh]=useState(false);
    const [state,setState] = useState(false)
    const GoshButton = ()=>{
        setState(true);
            setGosh(true);
            console.log(Gosh);
    }
    const Close=()=>{
        setState(false)
        setGosh(false);
         }

            useEffect(()=>{
                getStatuses();
            },[])
            const getStatuses = ()=>{
                // axiosInstance.get("/api/statuses").then((data)=>{
                //     setStatuses(data.data);
                // }).catch((err)=>{
                //     console.log(err);
                // })
            }
    
    return(
        <div className="lukman">
             {/* <div className='lukman--top'>
                <h2 className="lukman--header">Lukman Gözegçiligi</h2>
                <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman--gosh'>Hasaba Al</Button>
            </div> */}
            <Drawer
            width={400}
            className='lukman-gosh--drawer'
            title="Unit Goş"
            placement="right"
            // closable={true}
            onClose={()=>Close()}
            visible={state}
            style={{zIndex:"100"}}
            >
              <UnitGosh getOrders={getOrders}  onClick={Close}/>
            </Drawer>
            
             <div className='lukman--gozleg'>
             <div className='lukman-gozleg'>
            <form className='lukman-gozleg--form'>
                <div>
                <Input onChange={(e)=>{setId(e.target.value)}} placeholder = {dil==="tm"?tm.newOrders.OrderNoboýunça:ru.newOrders.OrderNoboýunça} className='lukman-gozleg--input' />
                <Input onChange={(e)=>{setAll(e.target.value)}} placeholder = {dil==="tm"?tm.newOrders.TelBelgiboýunça:ru.newOrders.TelBelgiboýunça} className='lukman-gozleg--input' />
                {/* <Select
                    className='lukman-gozleg--input'
                    showSearch
                    // style={{ width: 200 }}
                    placeholder="Zakaz Status Saýla"
                    optionFilterProp="children"
                    onChange={(value)=>setStatusId(value)}
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value={null}>Ählisi</Option>
                    <Option value="0">Garaşylýar</Option>
                    <Option value="1">Kabul edildi</Option>
                    <Option value="2">Gowşuryldy</Option>
                    <Option value="3">Ýatyryldy</Option>
                </Select> */}
                {/* <Input addonBefore='Sene' type='date' className='lukman-gozleg--input' /> */}
                </div>
                {/* <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman-gozleg--button'>Unit Goş</Button> */}
            </form>
            
        </div>
            </div>
            <div className='lukman-Table'>
                <LukmanTable getOrders={getOrders}  data={[units,setUnits]}/>
            </div>
        </div>
    );
};

export default Lukman; 