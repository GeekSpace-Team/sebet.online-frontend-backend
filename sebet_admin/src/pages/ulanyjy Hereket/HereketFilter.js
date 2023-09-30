import React from 'react';

import {Button,Input,Select,DatePicker} from 'antd';
import "antd/dist/antd.css";
import { PlusCircleFilled } from '@ant-design/icons';

import './HereketFilter.css';

const { RangePicker } = DatePicker;
const {Option}=Select;


const HereketFilter = props=>{
    return (
        <div className='hereket-filter'>
            <form className='hereket-filter--form'>
                <div>
                <Input addonBefore='Ulanyjy Ady' className='hereket-filter--input' />
                <Select defaultValue="all" className='hereket-filter--input'>
                    <Option value='all'>Ählisi</Option>
                    <Option value="live">Online</Option>
                    <Option value="unhealthy">Off-line</Option>
                </Select>
               <RangePicker placeholder={['seneden','sena çenli']} className='hereket-filter--input' />
                </div>
                </form>
        </div>
    );
}; 

export default HereketFilter;