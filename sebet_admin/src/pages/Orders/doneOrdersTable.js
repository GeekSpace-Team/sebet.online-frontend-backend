import React,{useContext, useState} from 'react';

import {Button,Space,message,Table,Modal,Drawer,Popconfirm} from 'antd';
import "antd/dist/antd.css";
import { EditOutlined,DeleteOutlined } from '@ant-design/icons';
import { SebedimContext } from "../../context/Sebedim";
import tm from "../../lang/tm.json"
import ru from "../../lang/ru.json"
import UnitEdit  from './UnitEdit';
import './LukmanTable.css';
import { axiosInstance, BASE_URL } from '../../utils/axiosIntance';
import PrintComponent from '../../components/PrintComponent';

const LukmanTable = props=>{

    const { dil } = useContext(SebedimContext);
    const [data,setData]=props.data;
    const getOrders = props.getOrders;

    const columns = [
        {
            title:dil==="tm"?tm.newOrders.OrderNo:ru.newOrders.OrderNo,
            dataIndex:"id"
        },
        
        {
            title:dil==="tm"?tm.newOrders.Umumybaha:ru.newOrders.Umumybaha,
            dataIndex:"total_price"
        },
        {
            title:dil==="tm"?tm.newOrders.Zakazstatus:ru.newOrders.Zakazstatus,
            render:(text,record)=>(
                <div> 
                   { record && record.status==0 && <div>{dil==="tm"?tm.newOrders.Garaşylýar:ru.newOrders.Garaşylýar}</div>}
                    {record && record.status==1 && <div>{dil==="tm"?tm.newOrders.KabulEdildi:ru.newOrders.KabulEdildi}</div>}
                    {record && record.status==2 && <div>{dil==="tm"?tm.newOrders.Gowşuryldy:ru.newOrders.Gowşuryldy}</div>}
                    {record && record.status==3 && <div>{dil==="tm"?tm.newOrders.Ýatyryldy:ru.newOrders.Ýatyryldy}</div>}
                </div>
            )
        },
        {
            title:dil==="tm"?tm.newOrders.ZakazSalgy:ru.newOrders.ZakazSalgy,
            render:(text,record)=>(
                
                <div>
                     <p>{record.address}</p>
                 </div>
            )
        },
        {
            title:dil==="tm"?tm.newOrders.eltilmeliWagty:ru.newOrders.eltilmeliWagty,
            render:(text,record)=>(
                <div>
                    {record.delivery_time == 11 && <div>{dil==="tm"?tm.newOrders.today:ru.newOrders.today} 9:00 - 12:00</div>}
                    {record.delivery_time == 12 && <div>{dil==="tm"?tm.newOrders.today:ru.newOrders.today} 12:00 - 15:00</div>}
                    {record.delivery_time == 13 && <div>{dil==="tm"?tm.newOrders.today:ru.newOrders.today} 18:00 - 21:00</div>}

                    {record.delivery_time == 21 && <div>{dil==="tm"?tm.newOrders.tomorow:ru.newOrders.tomorow} 9:00 - 12:00</div>}
                    {record.delivery_time == 22 && <div>{dil==="tm"?tm.newOrders.tomorow:ru.newOrders.tomorow} 12:00 - 15:00</div>}
                    {record.delivery_time == 23 && <div>{dil==="tm"?tm.newOrders.tomorow:ru.newOrders.tomorow} 18:00 - 21:00</div>}
                </div>
            )
        },
        {
            title:dil==="tm"?tm.newOrders.Ulanyjy:ru.newOrders.Ulanyjy,
            render:(text,record)=>(
                
                <div>
                     <h3>{record && record.user_name} </h3> 
                     <p>{record && record.user_phone}</p>
                     <p>{record && record.address}</p>
                 </div>
            )
        },
        {
            title:dil==="tm"?tm.newOrders.ÜýygetmekweÖzgertmek:ru.newOrders.ÜýygetmekweÖzgertmek,
            dataIndex:"goshmacha",
            render: (text, record) => (
                <Space size="middle">
                     <Button type='primary'shape='round'onClick={()=>ShowInformation(record)} >{dil==="tm"?tm.newOrders.Goşmaça:ru.newOrders.Goşmaça}</Button>
                     {/* <Button type='primary'shape='round'onClick={()=>ShowDrawer(record)} ><EditOutlined /></Button> */}
                    <Popconfirm
                        title="Siz çyndan öçürmek isleýärsinizmi?"
                        onConfirm={()=>DeleteOrder(record)} 
                        // onCancel={cancel}
                        okText={dil==="tm"?tm.newOrders.Hawa:ru.newOrders.Hawa}
                        cancelText={dil==="tm"?tm.newOrders.Yok:ru.newOrders.Yok}
                    >
                        <Button type='primary' shape='round' danger ><DeleteOutlined /></Button>                 

                    </Popconfirm>
                </Space>
              ),
        }
    ];

    const [edit,setEdit]=useState(false);
    const [info,setInfo] = useState(false);
    const [emaglumat,setEmaglumat]=useState(null);
    const [ maglumat, setMaglumat ] = useState(null);
    const [details,setDetails] = useState(null);
    const [start,setStart] = useState(1);
    const [end,setEnd] = useState(20)

    const DeleteOrder = (event)=>{
        console.log(event.order_id);
        axiosInstance.delete("/admin/orders/order/delete/"+event.id).then((data)=>{
            message.success("successfully");
            getOrders();
        }).catch((err)=>{
            console.log(err);
        })
        // message.warn("wagtlayyn ishlemayar!");
       
    }
    
const ShowDrawer =(event)=>{
    setEdit(!edit);
    console.log(event);
    setEmaglumat(event);
    console.log("maglumat",emaglumat)
    
}

const ShowInformation = (event)=>{
    setInfo(!info);
    console.log(event);
    setDetails(event);
    if(event && event.order_id){
        axiosInstance.get("admin/orders/order-products/"+event.order_id,{
            params:{
                limit:1000
            }
        }).then((data)=>{
            console.log(data.data)
            setMaglumat(data.data);
        }).catch((err)=>{
            console.log(err);
        });
    }
    

}




    return(
        <div className='LukmanTable'>
                <Drawer
                    width={500}
                    className='lukman-table--drawer'
                    title="Goşmaça Maglumat"
                    placement="right"
                    onClose={()=>ShowInformation()}
                    visible={info}>
                        { details && <table border="1" className="goshmacha--ul">
                            <tr className="modalLi" key={details && details.address}>
                            <td>{dil==="tm"?tm.newOrders.Address:ru.newOrders.Address} </td>
                            <td>{details && details.address} </td>
                            </tr>
                            <tr className="modalLi" key={details && details.status}>
                            <td>
                            {dil==="tm"?tm.newOrders.Status:ru.newOrders.Status}
                            </td>
                            <td>
                            { details && details.status==0 && (dil==="tm"?tm.newOrders.Garaşylýar:ru.newOrders.Garaşylýar)}
                            { details && details.status==1 &&  (dil==="tm"?tm.newOrders.KabulEdildi:ru.newOrders.KabulEdildi) }
                            { details && details.status==2 && (dil==="tm"?tm.newOrders.Gowşuryldy:ru.newOrders.Gowşuryldy) }
                            { details && details.status==3 &&  (dil==="tm"?tm.newOrders.Ýatyryldy:ru.newOrders.Ýatyryldy) }</td>
                            </tr>
                            <tr className="modalLi" key={details && details.total_price}>
                            <td> {dil==="tm"?tm.newOrders.UmumyBaha:ru.newOrders.UmumyBaha} </td>
                            <td>{details && details.total_price} </td>
                            </tr>
                            {maglumat && maglumat.map((product,i)=>{
                                    return <React.Fragment>
                                     <tr className="modalLi" key={`toleg${i}`}>
                                    <td>{i+1}) {(dil==="tm"?tm.newOrders.HarytNo:ru.newOrders.HarytNo)}</td>
                                    <td>{product.product_code} </td>
                                    </tr>
                                    <tr className="modalLi" key={`toleg${i}`}>
                                    <td>{i+1}) {(dil==="tm"?tm.newOrders.HarytBaha:ru.newOrders.HarytBaha)}</td>
                                    <td>{product.order_price} TMT </td>
                                    </tr>
                                    {product?.product_discount && <tr className="modalLi" key={`toleg${i}`}>
                                    <td>{i+1}) {(dil==="tm"?tm.newOrders.SkidgaBaha:ru.newOrders.SkidgaBaha)}</td>
                                    <td>{product?.product_discount} TMT </td>
                                    </tr>}
                                    <tr className="modalLi" key={`toleg${i}`}>
                                    <td>{i+1}) {(dil==="tm"?tm.newOrders.Bellik:ru.newOrders.Bellik)}</td>
                                    <td>{product.note} </td>
                                    </tr>
                                    <tr className="modalLi" key={`name${i}`}>
                                    <td>{i+1}) {(dil==="tm"?tm.newOrders.HarytAdy:ru.newOrders.HarytAdy)} </td>
                                    <td>{product.product_name_tm} </td>
                                    </tr>
                                    <tr className="modalLi" key={`toleg${i}`}>
                                    <td>{i+1}) {(dil==="tm"?tm.newOrders.HarytSany:ru.newOrders.HarytSany)} </td>
                                    <td>{product.quantity} </td>
                                    </tr>
                                    <tr className="modalLi" key={`toleg${i}`}>
                                    <td>{i+1})  {(dil==="tm"?tm.newOrders.HarytSuraty:ru.newOrders.HarytSuraty)}</td>
                                    <td> <img style={{width:"100px",height:"100px",objectFit:"contain"}} src={BASE_URL+"/"+product.product_image} alt="product Surat" /> </td>
                                    </tr>
                                    </React.Fragment>
                            })}
                        </table>}
                        {maglumat && details && <PrintComponent maglumat={maglumat} details={details} />}
                </Drawer>
                <Drawer
                width={400}
                className='lukman-table--drawer'
                title="Üýtgetmeler"
                placement="right"
                onClose={()=>ShowDrawer()}
                visible={edit}>
                    <UnitEdit onClick={ShowDrawer} order={[emaglumat,setEmaglumat]} getOrders={getOrders}/>
                </Drawer>
                <Table columns={columns} dataSource={data} 
                // pagination={{
                //     showTotal: (total, range) => {
                //     console.log({ total, range });
                //     setStart(range[0]);
                //     setEnd(range[1]);
                //     console.log(range[0])
                //     console.log(range[1])
                //     }
                // }}
  />
        </div>
    );
};

export default LukmanTable;