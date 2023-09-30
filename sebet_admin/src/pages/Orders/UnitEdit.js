import React,{useEffect, useState,useContext} from 'react';

import {Select,Input,Button, message} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,CloseCircleOutlined } from '@ant-design/icons';

import './SurujiYagdayy.css';
import TextArea from 'antd/lib/input/TextArea';
import { axiosInstance } from '../../utils/axiosIntance'; 
import { SebedimContext } from '../../context/Sebedim';
import tm from "../../lang/tm.json";
import ru from "../../lang/ru.json";

const Option = {Select};

const SurujiYagdayy = props =>{
    const { dil } = useContext(SebedimContext)
    const getOrders = props.getOrders;
    const [emaglumat,setEmaglumat] =  props.order;
    const [status,setStatus ] = useState([]);
    const [statusId,setStatusId] = useState();
    console.log("orders",emaglumat);

    

    const Uytget=()=>{
        axiosInstance.post("admin/orders/change-order-status/"+emaglumat.order_id,{
            status:statusId
        }).then((data)=>{
            console.log(data.data);
            getOrders();
            setStatusId(null);
            props.onClick()
        }).catch((err)=>{
            console.log(err);
            setStatusId(null);
        })
    }
    
    const onChangeS = (value)=>{
        console.log(value,emaglumat.id);
        setStatusId(value);
        
    }
    

 
      

    return (
        <div className='suruji-yagdayy'>
            <form className='suruji-yagdayy--form' >
                {/* <h1 style={{width:"90%"}}>{emaglumat && emaglumat.status }</h1> */}
                    {emaglumat && emaglumat.status==0 && <h1 style={{width:"90%"}}>{dil==="tm"?tm.newOrders.Garaşylýar:ru.newOrders.Garaşylýar}</h1>}
                    {emaglumat && emaglumat.status==1 && <h1 style={{width:"90%"}}>{dil==="tm"?tm.newOrders.KabulEdildi:ru.newOrders.KabulEdildi}</h1>}
                    {emaglumat && emaglumat.status==2 && <h1 style={{width:"90%"}}>{dil==="tm"?tm.newOrders.Gowşuryldy:ru.newOrders.Gowşuryldy}</h1>}
                    {emaglumat && emaglumat.status==3 && <h1 style={{width:"90%"}}>{dil==="tm"?tm.newOrders.Ýatyryldy:ru.newOrders.Ýatyryldy}</h1>}
                <Select
                    style={{width:"90%"}}
                    className='suruji-yagdayy--input' 
                    // className="yolHaty-gozle--input"
                    showSearch
                    // style={{ width: 200 }}
                    placeholder={dil==="tm"?tm.newOrders.StatusUýtget:ru.newOrders.StatusUýtget}
                    optionFilterProp="children"
                    value={statusId}
                    onChange={onChangeS}
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value={0}> {dil==="tm"?tm.newOrders.Garaşylýar:ru.newOrders.Garaşylýar} </Option>
                    <Option value={1}> {dil==="tm"?tm.newOrders.KabulEdildi:ru.newOrders.KabulEdildi} </Option>
                    <Option value={2}> {dil==="tm"?tm.newOrders.Gowşuryldy:ru.newOrders.Gowşuryldy} </Option>
                    <Option value={3}> {dil==="tm"?tm.newOrders.Ýatyryldy:ru.newOrders.Ýatyryldy} </Option>
              
                  </Select>

                <Button onClick={Uytget} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>{ dil==="tm"?tm.newOrders.UnitUýtget:ru.newOrders.UnitUýtget }</Button>
                <Button onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'>{ dil==="tm"?tm.newOrders.GoyBolsun:ru.newOrders.GoyBolsun }</Button>
            </form>
        </div>
    );
};

export default SurujiYagdayy;