import React,{useContext, useEffect, useState} from 'react';

import {Button,Input,Drawer} from 'antd';
import "antd/dist/antd.css";
import { SearchOutlined,PlusCircleFilled } from '@ant-design/icons';

import tm from "../../lang/tm.json"
import ru from "../../lang/ru.json"
import { SebedimContext } from "../../context/Sebedim";

import LukmanFilter from './lukmanFilter'; 
import StatusGosh from './StatusGosh';
import LukmanSanawTable from './LukmanSanawTable';
import  './lukman.css';
import { axiosInstance } from '../../utils/axiosIntance';

const Lukman = () =>{

    const { dil } = useContext(SebedimContext);
    const [ data, setData ] = useState([]);

    useEffect(()=>{
        getConfig();
    },[])

    

    const getConfig = ()=>{
        axiosInstance.get("admin/currency").then((data)=>{
            console.log(data.data);
            let massiw = [data.data];
            setData(massiw);
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
    
    return(
        <div className="lukman">
             {/* <div className='lukman--top'>
                <h2 className="lukman--header">Lukman Gözegçiligi</h2>
                <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman--gosh'>Hasaba Al</Button>
            </div> */}
            {/* <Drawer
            width={500}
            className='lukman-gosh--drawer'
            title="Status Goş"
            placement="right"
            onClose={()=>Close()}
            visible={state}
            >
              <StatusGosh getConfig={getConfig}  onClick={Close}/>
            </Drawer> */}
            
             {/* <div className='lukman--gozleg'>
                <LukmanFilter GoshButton={GoshButton}/>
            </div> */}
            <div className='lukman-Table'>
                <LukmanSanawTable data={[ data, setData]} getConfig={getConfig} />
            </div>
        </div>
    );
};

export default Lukman; 