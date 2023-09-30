import React, { useContext, useEffect } from "react";
import {Link,useHistory} from "react-router-dom";

import {SebedimContext} from "../../context/Sebedim";

import "./sebet.css";
import Location from "../../components/location";
import SebetCard from '../../components/sebet_card';

import img from "../../img/1.png";
import { axiosInstance, BASE_URL } from "../../utils/axiosIntance";
import { message } from "antd";

const Sebet =(props)=>{
    const history = useHistory();
    let hasap=0;
    const {sebedim,dil,Barlag} = useContext(SebedimContext);
    sebedim.map((haryt)=>{
        hasap = hasap+(haryt.baha*haryt.sany);
        return null;
    })

    let manat = dil=="tm"?" manat":" манат";

    useEffect(async()=>{
        getProducts();
      
    },[])

    useEffect(async()=>{
        let carts=[];
        await  sebedim.map((sebet)=>{
            let obj={
                product_id:sebet.product.product_id,
                quantity:sebet.sany
            }
            carts.push(obj);
        });

        console.log(carts);
    },[sebedim])
    const getProducts = async()=>{
        let carts=[];
        await  sebedim.map((sebet)=>{
            let obj={
                product_id:sebet.product.product_id,
                quantity:sebet.sany
            }
            carts.push(obj);
        });
        console.log(carts);

        await axiosInstance.post("users/my-cart",{
            carts:carts,
        }).then((data)=>{
            console.log("get res from database ",data.data);
            data.data && data.data.map((dat,i)=>{
               Barlag(dat.product_id,dat.quantity);
                    if(dat.quantity==carts[i].quantity){
                    //     console.log("dat",carts[i])
                    //   message.warn(dil=="tm"?"Stockda siziň isleýşiňizçe ýok!":"Нет в наличии, как хотелось бы!")
                    }else{
                        console.log("dat",carts[i])
                        message.warn(dil=="tm"?"Stockda siziň isleýşiňizçe ýok!":"Нет в наличии, как хотелось бы!")
                      
                    }
            })
            
        }).catch((err)=>{
            console.log(err);
        })
    }
    const SargytButton = ()=>{
        if(!sebedim[0]){
            message.warn(dil=="tm"?"Sebediňiz boş":"Корзина пустая")
        }else{
            history.push("/sargyt")
        }
    }
    return(
        <React.Fragment>
            <div className="sebet_location">
                <Location name={dil=="tm"?"Sebedim":"Моя корзина"} />
            </div>
        <div className="sebet_page">
            
            <div className="sebet_cards">
                {
                    sebedim.map((haryt)=>{
                        return(
                            <SebetCard 
                            id={haryt.id} 
                            sany={haryt.sany}  
                            src={BASE_URL+"/"+haryt.product.product_image}
                             name={dil=="tm"?haryt.product.product_name_tm:haryt.product.product_name_ru} 
                             description={dil=="tm"?haryt.product.product_description_tm:haryt.product.product_description_ru}
                              price={haryt.baha}
                              barlag={getProducts}
                              product_id={haryt.product.product_id} />
               
                        )
                    })
                }
            </div>
            <div className="sebet_hasap">
                    <h2>{dil=="tm"?"Sebedim":"Моя корзина"}</h2>
                    <h5>{dil=="tm"?"Jemi":"Итого"}</h5>
                    <h3>{(hasap).toFixed(2)+ manat}</h3>
                    <Link >
                    <button onClick={SargytButton}> {dil=="tm"?"Sargyt et":"Заказать"}</button>
                    </Link>
                    {/* onClick={()=>window.location.assign("/sargyt")} */}
            </div>
        </div>
        </React.Fragment>
    );
};

export default Sebet;