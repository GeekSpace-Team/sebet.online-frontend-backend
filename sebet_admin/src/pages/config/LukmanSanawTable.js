import React,{useContext, useState} from 'react';

import {Button,Space,Table,Drawer,Input, message} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,PlusCircleFilled } from '@ant-design/icons';

import tm from "../../lang/tm.json"
import ru from "../../lang/ru.json"
import { SebedimContext } from "../../context/Sebedim";

import StatusEdit from './SurujiYagdayy';
import './LukmanTable.css';
import { axiosInstance, BASE_URL } from '../../utils/axiosIntance';

const LukmanTable = props=>{

    const { dil } = useContext(SebedimContext);
    const [data,setData]=props.data;
    const getConfig = props.getConfig;
    const [currency,setCurrency]=useState();
    
    const columns = [
        {
            title:dil==="tm"?tm.Config.ConfigNo:ru.Config.ConfigNo,
            dataIndex:"id"
        },
        {
            title:dil==="tm"?tm.Config.Currency:ru.Config.Currency,
            dataIndex:"currency_value",
            
        },
        {
            title:dil==="tm"?tm.Config.GoşmaçaÖzgertmek:ru.Config.GoşmaçaÖzgertmek,
            dataIndex:"goshmacha",
            render: (text, record) => (
                <Space size="middle">
                    <Button type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button>
                    
                     </Space>
              ),
        }
    ];

    const [edit,setEdit]=useState(false);
    const [maglumat,setMaglumat]=useState([]);
    const [showInfo,setShowInfo]=useState(false);
    
    
const ShowDrawer = async(event)=>{
    setEdit(!edit);
    console.log("maglumat edit",event);
    if(event){
        setCurrency(event.currency_value)
        await setMaglumat(event);
    }
}

const EditStatus = ()=>{
    axiosInstance.patch("/admin/currency/edit",{
        currency_value:currency
    }).then((data)=>{
        message.success("successfully!");
        getConfig();
    }).catch((err)=>{
        console.log(err);
    })
}



    return(
        <div className='LukmanTable'>
                <Drawer
                width={500}
                className='lukman-table--drawer'
                title={dil==="tm"?tm.Config.Üýtgetmeler:ru.Config.Üýtgetmeler}
                placement="right"
                onClose={()=>ShowDrawer()}
                visible={edit}>
                    <Input style={{width:"90%"}} value={currency} onChange={(e)=>{setCurrency(e.target.value)}} addonBefore='Currency'  className='suruji-yagdayy--input' />
           
                        <div style={{width:"90%",margin:"20px auto",display:"flex",justifyContent:"space-evenly"}}>
                            <Button onClick={EditStatus} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>{dil==="tm"?tm.Config.Üýtget:ru.Config.Üýtget}</Button>
                            <Button onClick={ShowDrawer} shape='round' danger type='primary' className='suruji-yagdayy--button'>{dil==="tm"?tm.Config.Goýbolsyn:ru.Config.Goýbolsyn}</Button>
                        </div>
                </Drawer>
                <Table columns={columns} dataSource={data} />
        </div>
    );
};

export default LukmanTable;