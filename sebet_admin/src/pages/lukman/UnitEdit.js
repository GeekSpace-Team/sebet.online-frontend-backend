import React,{useEffect, useState} from 'react';

import {Select,Input,Button, message} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,CloseCircleOutlined } from '@ant-design/icons';

import './SurujiYagdayy.css';
import TextArea from 'antd/lib/input/TextArea';
import { axiosInstance } from '../../utils/axiosIntance';

const Option = {Select};

const SurujiYagdayy = props =>{
    const getUnits = props.getUnits;
    const Uytget=()=>{
        axiosInstance.patch("/api/unit/update/"+unit.id,{
            name:name
        }).then((data)=>{
            message.success(data.data.msg);
            getUnits();
            setName()
        }).catch((err)=>{
            console.log(err);
        })
    }
    const [unit,setUnit] = useState(props.unit);
    console.log(unit);
    const [ name, setName] = useState(unit.name);
    

 
      

    return (
        <div className='suruji-yagdayy'>
            <form className='suruji-yagdayy--form' >
            
                <Input value={name} onChange={(e)=>{setName(e.target.value)}} addonBefore='Unit ady'  className='suruji-yagdayy--input' />
                
                <Button onClick={Uytget} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>Unit üýtget</Button>
                <Button onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'>Goýbolsun</Button>
            </form>
        </div>
    );
};

export default SurujiYagdayy;