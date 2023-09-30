import React, { useContext,useState }  from "react";
import { SebedimContext } from "../context/Sebedim";
import { Drawer} from 'antd';

import "./profileCard.css";
import { axiosInstance, BASE_URL } from "../utils/axiosIntance";

const ProfileCard = (props)=>{

    const {dil} = useContext(SebedimContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [orderProducts,setOrderProducts] = useState([]);
    // let orderProducts = []
  const showModal = (id) => {
    setIsModalVisible(!isModalVisible);
    axiosInstance.get("users/my-order-products/"+id).then((data)=>{
        console.log("product of order",data.data);
        // orderProducts=data.data;
        setOrderProducts(data.data);
    }).catch((err)=>{
        console.log(err);
    })
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
    return (

        <div className="profileCard">
            <Drawer title={dil=="tm"?"Sargyt Harytlary":"Заказать товары"} width="350px" visible={isModalVisible} onClose={handleCancel}>
                <ul className="sargytlarym-modal">
                    <li>ID: {props.id}</li>
                    <li>{dil=="tm"?"Sargyt taryhy":"История заказов"}: {props.taryhy}</li>
                    <li>{dil=="tm"?"Haryt sany":"Количество товаров"}: {props.sany}</li>
                    <li>{dil=="tm"?"Jemi":"Общий"}: {props.jemi}</li>
                    <li>{dil=="tm"?"Sargyt ýagdaýy":"Статус заказа"}: {props.yagdayy}</li>
                    <li>{dil=="tm"?"Töleg şekili":"Форма оплаты"}: {props.toleg}</li>
                    <li style={{fontWeight:"bold",fontSize:"18px"}}>{dil=="tm"?"Harytlar":"Товары"}</li>
                    {
                        orderProducts && orderProducts.map((product)=>{
                            return <div style={{marginBottom:"10px"}}>
                                <h2 style={{marginBottom:"-5px"}}>{dil=="tm"?product.product_name_tm:product.product_name_ru}</h2>
                                <h3 style={{marginBottom:"-5px"}}>{dil=="tm"?"Haryt sany":"Количество товаров"}: {product.quantity}</h3>
                                <h3 style={{marginTop:"-5px"}}>{dil=="tm"?"Haryt baha":"Цена товара"}: {product.order_price}</h3>
                                <img style={{width:"200px",height:"200px",objectFit:"contain"}} src={BASE_URL+"/"+product.product_preview_image} />
                            </div>
                        })
                    }

                </ul>
            </Drawer>
            <table key="table">
                <tr key="head" className="table-head">
                    <td className="ID">ID</td>
                    {/* <td>{dil=="tm"?"Sargyt taryhy":"История заказов"}</td> */}
                    <td>{dil=="tm"?"Haryt sany":"Количество товаров"}</td>
                    <td>{dil=="tm"?"Jemi":"Общий"}</td>
                    <td>{dil=="tm"?"Sargyt ýagdaýy":"Статус заказа"}</td>
                    <td>{dil=="tm"?"Töleg şekili":"Форма оплаты"}</td>
                    
                </tr>
                <tr key="body" className="table-body">
                    <td className="ID">{props.id}</td>
                    {/* <td>{props.taryhy}</td> */}
                    <td>{props.sany}</td>
                    <td className="jemi">{props.jemi} TMT</td>
                    <td className={`yagday${props.yagday}`}>
                        {props.yagdayy}</td>
                    <td>{props.toleg}</td>
                </tr>
            </table>
            <button onClick={()=>showModal(props.sargyt_id)}>{dil=="tm"?"Sargyt maglumatlary":"Информация для заказа"}</button>
        </div>
    )
}

export default ProfileCard;