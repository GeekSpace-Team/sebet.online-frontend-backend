import React from 'react';

import {Input,Button,Tabs,Checkbox} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,CloseCircleOutlined,SearchOutlined } from '@ant-design/icons';
import './ugrat.css';

const Ugrat = props=>{

    const Checked = (e)=>{
        console.log(`checked = ${e.target.checked}`);
    }

    return(
        <div className='ugrat'>
            
            <div >
                <form className='ugrat-form'>
                <div className="filter">
                     <label className="ugrat-label">
                           Awtobusyň Ýol Hat No: 
                     </label>
                     <Input placeholder="Ýol Haty No" className='ugrat-input' addonAfter={<SearchOutlined/>} />
                     </div>
                <div className='mehanik-form'>
                <div className='labels'>
                    <label className="ugrat-label">
                        Awtobusyň tehniki taýdan guratlygy: 
                    </label>
                    <Checkbox className='ugrat-checkbox' onChange={Checked}></Checkbox>
                </div>
                <div className='labels'>
                    <label className="ugrat-label">
                        Ýola çykan wagty: 
                    </label>
                    <Input type='date' className='ugrat-input' />
                </div>
                <div className='labels'>
                    <label className="ugrat-label">
                    Spidometriň görkezjisi: 
                    </label>
                    <Input type='text' placeholder='km...' className='ugrat-input' />
                </div>
                <div className='labels'>
                    <label className="ugrat-label">
                    Awtobusdaky ýangyjyň möçberi:
                    </label>
                    <Input type='text' placeholder='litr...' className='ugrat-input' />
                </div>
                <div>
                    <Button type='primary' shape='round' className='ugrat-button' >Hasaba al</Button>
                </div>
                
                </div>
                </form>
            </div>
        </div>
    );
};

export default Ugrat;