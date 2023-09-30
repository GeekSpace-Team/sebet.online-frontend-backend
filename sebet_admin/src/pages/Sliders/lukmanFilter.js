import React, { useContext } from 'react';

import {Button,Input,Select,DatePicker} from 'antd';
import "antd/dist/antd.css";
import { PlusCircleFilled } from '@ant-design/icons';

import tm from "../../lang/tm.json"
import ru from "../../lang/ru.json"
import { SebedimContext } from "../../context/Sebedim";

import './lukmanGozleg.css';
const { RangePicker } = DatePicker;
const {Option}=Select;
const LukmanGozleg = props=>{
    const { dil } = useContext(SebedimContext);
    const GoshButton=props.GoshButton;
    
    return(
        <div className='lukman-gozleg'>
            <form className='lukman-gozleg--form'>
                <div>
                {/* <Input placeholder='Umumy gözleg' className='lukman-gozleg--input' /> */}
                <h2 style={{margin:"10px 10px"}}>{dil==="tm"?tm.Slider.AdminSlider:ru.Slider.AdminSlider}</h2>
                </div>
                <div>
               <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman-gozleg--button'>{dil==="tm"?tm.Slider.BannerGosh:ru.Slider.BannerGosh}</Button> 

                </div>
                </form>
            
        </div>
    );
};

export default LukmanGozleg;

