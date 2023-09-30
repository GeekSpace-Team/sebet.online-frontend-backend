import React from 'react';

import {Input,Button} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,CloseCircleOutlined } from '@ant-design/icons';

import './surujiGosh.css';

const SurujiGosh = props =>{

    const onSubmit=(event)=>{
        event.preventDefault();
        console.log(event);
    }

    return (
        <div className='suruji-gosh'>
            <form className='suruji--form' onSubmit={onSubmit}>
            
            <label>
                 <div style={{ fontWeight: "600", marginBottom: 2, marginTop: 5 }}>
                    Sürüji No:
                 </div>
                 <Input  placeholder='Sürüji No' className='suruji-gosh--input' />
            </label>
            <label>
                 <div style={{ fontWeight: "600", marginBottom: 2, marginTop: 5 }}>
                      Ady:
                 </div>
                 <Input placeholder='Ady' className='suruji-gosh--input'  />
            </label>
            <label>
                 <div style={{ fontWeight: "600", marginBottom: 2, marginTop: 5 }}>
                      Familýasy:
                 </div>
                 <Input placeholder='Familýasy'className='suruji-gosh--input'/>
            </label>
            <label>
                 <div style={{ fontWeight: "600", marginBottom: 2, marginTop: 5 }}>
                        Atasynyň Ady:
                 </div>
                 <Input placeholder='Atasynyň Ady' className='suruji-gosh--input'/>
            </label>
            <label>
                 <div style={{ fontWeight: "600", marginBottom: 2, marginTop: 5 }}>
                    Doglan-sene:
                 </div>
                 <Input  type='date' size='middle' placeholder='Doglan-sene' className='suruji-gosh--input'/>
            </label>
            <label>
                 <div style={{ fontWeight: "600", marginBottom: 2, marginTop: 5 }}>
                        Telefon belgi:
                 </div>
                 <Input placeholder='Telefon belgi' className='suruji-gosh--input' />
            </label>
            <label>
                 <div style={{ fontWeight: "600", marginBottom: 2, marginTop: 5 }}>
                        Ýaşaýan ýeri:
                 </div>
                 <Input placeholder='Ýaşaýan ýeri' className='suruji-gosh--input'/>
            </label>
                
                <Button icon={<PlusCircleFilled/>} shape='round' type='primary'htmlType="submit" className='suruji-gosh--button'>Hasaba al</Button>
                <Button onClick={props.onClick} shape='round' danger type='primary' className='suruji-gosh--button'>Gerek däl</Button>
            </form>
        </div>
    );
};

export default SurujiGosh;