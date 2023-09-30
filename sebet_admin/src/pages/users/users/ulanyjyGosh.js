import React,{useState,useEffect, useContext} from 'react';
import { Input,Button,Select, message } from "antd";
import "antd/dist/antd.css";
import { PlusCircleFilled,CloseCircleOutlined } from '@ant-design/icons';

import tm from "../../../lang/tm.json"
import ru from "../../../lang/ru.json"
import { SebedimContext } from "../../../context/Sebedim";

import './ulanyjyGosh.css';
import { BASE_URL,axiosInstance } from '../../../utils/axiosIntance';

const UlanyjyGosh = (props)=>{

    const { dil } = useContext(SebedimContext);
    const ulanyjyGosh=props.ulanyjyGosh;
    const Close=props.onClick;
    const [typeId ,setTypeId] = useState(null)
    const { Option } = Select;
    const [data,setData]=props.data;
    const [select,setSelect]=useState();
    const userTypes=props.userTypes;
    console.log("user type:",userTypes);
    const GetData=props.GetData;

  

    const onSubmit=(event)=>{
        event.preventDefault();

        console.log("ulanujy gosh:",event);
        let fname=event.target.fname.value;
        let password=event.target.password.value;
        let password2=event.target.password2.value;
        let lastname=event.target.lastname.value;
        let phoneNumber = event.target.phoneNumber.value;
        let address = event.target.address.value;
   if(password===password2){
    
        axiosInstance.post("/api/user/create",{
            fname:fname, 
            lastname:lastname,
            phoneNumber:phoneNumber,
            password:password,
            UserTypeId:typeId,
            rec_name:fname,
            rec_address:address,
            rec_number:phoneNumber
        }).then((data)=>{
            message.success(data.data.msg);
            GetData();
        }).catch((err)=>{
            console.log(err);
        });
        Close();
             

        console.log("data",data);
    }else{
        message.error("Password dogry girizmeli!");
    }
    }
    const InputHandler=props.InputHandler;

    return(
        <div className='ulanyjyGosh'>
            <form className='ulanyjylar--form' onSubmit={onSubmit}>
                <Input addonBefore={dil==="tm"?tm.users.Ady:ru.users.Ady} value={ulanyjyGosh.fname} name='fname' onChange={InputHandler} className='ulanyjylar-gosh--input' />
                <Input addonBefore={dil==="tm"?tm.users.Familýasy:ru.users.Familýasy} value={ulanyjyGosh.lastname} name='lastname' onChange={InputHandler} className='ulanyjylar-gosh--input'  />
                <Input addonBefore={dil==="tm"?tm.users.Salgysy:ru.users.Salgysy} value={ulanyjyGosh.address} name='address' onChange={InputHandler} className='ulanyjylar-gosh--input' />
                <Input addonBefore={dil==="tm"?tm.users.TelefonBelgi:ru.users.TelefonBelgi} value={ulanyjyGosh.phoneNumber} name='phoneNumber' onChange={InputHandler} className='ulanyjylar-gosh--input'  />
                <Input addonBefore={dil==="tm"?tm.users.password:ru.users.password} value={ulanyjyGosh.password} name='password' onChange={InputHandler} className='ulanyjylar-gosh--input'/>
                <Input addonBefore={dil==="tm"?tm.users.password:ru.users.password} value={ulanyjyGosh.password2} name='password2' onChange={InputHandler} className='ulanyjylar-gosh--input'/>
                <Select
                    placeholder={dil==="tm"?tm.users.StatusSaýlaň:ru.users.StatusSaýlaň}
                    showSearch
                 element='select'
                 label={dil==="tm"?tm.users.Status:ru.users.Status}
                 onChange={(value)=> setTypeId(value)}
                 defaultOption={dil==="tm"?tm.users.StatusSaýlaň:ru.users.StatusSaýlaň} name='typeID' id="typeID" className='ulanyjylar-gosh--input'
                >
                    {
                        userTypes.map((userType)=>{
                            return(
                            <Option name="typeIDOption" value={userType.id} >{dil==="tm"?userType.type_tm:userType.type_ru}</Option>
                            )
                        })
                    }

               </Select>
                <Button icon={<PlusCircleFilled/>} shape='round' type='primary'htmlType="submit" className='ulanyjylar-gosh--button'>{dil==="tm"?tm.users.HasabaAl:ru.users.HasabaAl}</Button>
                <Button onClick={()=>Close()} shape='round' danger type='primary' className='ulanyjylar-gosh--button'>{dil==="tm"?tm.users.Cancel:ru.users.Cancel}</Button>
            </form>
        </div>
    );
};

export default UlanyjyGosh;