import React,{useContext, useEffect, useState} from 'react';

import {Select,Input,Button, message} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,CloseCircleOutlined } from '@ant-design/icons';

import tm from "../../lang/tm.json"
import ru from "../../lang/ru.json"
import { SebedimContext } from "../../context/Sebedim";

import './SurujiYagdayy.css';
import { axiosInstance } from '../../utils/axiosIntance';

const Option = {Select};

const SurujiYagdayy = props =>{

  const { dil } = useContext(SebedimContext);
    
    const getStatuses = props.getStatuses;
    const [link , setLink] = useState();   
    
    const BannerGosh = ()=>{
      axiosInstance.post("admin/banners/add",{
        banner_url:link
      }).then((data)=>{
        console.log(data.data);
        setLink();
        getStatuses()
      }).catch((err)=>{
        console.log(err);
      })
    }

    return (
        <div
            className='suruji-yagdayy'>
            <form className='suruji-yagdayy--form' >
            {/* <Input style={{width:"90%"}} value={link} onChange={(e)=>{setLink(e.target.value)}} addonBefore='Slider link'  className='suruji-yagdayy--input' /> */}
                <h2 style={{width:"90%"}}> {dil==="tm"?tm.Slider.Täze_Bunner:ru.Slider.Täze_Bunner}</h2>            
                <Button style={{width:"40%"}} onClick={BannerGosh} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'> {dil==="tm"?tm.Slider.Goş:ru.Slider.Goş} </Button>
                <Button style={{width:"40%"}} onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'> {dil==="tm"?tm.Slider.Goýbolsyn:ru.Slider.Goýbolsyn} </Button>
            </form>
        </div>
    );
};

export default SurujiYagdayy;