import React, { useContext } from "react";

import {SebedimContext} from "../context/Sebedim";

import "antd/dist/antd.css";
import {MinusCircleOutlined} from '@ant-design/icons';
import { message } from "antd";
import "./sebet_card.css";
import { axiosInstance } from "../utils/axiosIntance";
const SebetCard =(props)=>{
    const {Increment,Decrement,Remove,dil,Barlag} = useContext(SebedimContext);
    console.log("props",props)
    let manat = dil=="tm"?" manat":" манат"
    const gosh=async(e)=>{
        let carts = [{
            product_id:props.product_id,
            quantity:props.sany+1
        }]
        await axiosInstance.post("users/my-cart",{
            carts:carts
        }).then((data)=>{
            console.log("get res from database sebetcart",data.data);
        // Barlag(props.product_id,props.sany);
        if(data.data[0].quantity==props.sany+1){
            Increment(e);
        }else{
            message.warn(dil=="tm"?"Stockda siziň isleýşiňizçe ýok!":"Нет в наличии, как хотелось бы!")
          
        }
                    
        }).catch((err)=>{
            console.log(err);
        })
        // props.barlag();
    }
    const azalt = (e)=>{
        Decrement(e);
        // props.barlag();
    }
    return (
        <div className="sebet_card" onClick={props.onclick}>
            <img alt="" src={props.src} />
            <div className="all">
                <div className="details">
                    <h3>{props.name}</h3>
                    <h2>{props.description}</h2>
                </div>
                <div className="buttons" id="buttons">
                        <div className="inc_dec_button">
                            <button onClick={props.sany>1 ? ()=>azalt(props.id) :(null)}> - </button>
                            <h2>{props.sany}</h2>
                            <button onClick={()=>gosh(props.id)} > + </button>
                        </div>
                        <h1>{(props.price*props.sany).toFixed(2) + manat}</h1>
                        <button onClick={()=>Remove(props.id)}><MinusCircleOutlined /></button>
                </div>
            </div>



            <div className="mobile-all" id="mobile-all">
               <img alt="" src={props.src} />
               <div className="details">
                    <h3>{props.name}</h3>
                    <h2>{props.description}</h2>
                </div>
            </div>
            <div className="mobile-buttons" id="mobile-buttons">
                        <div className="inc_dec_button">
                            <button onClick={props.sany>1 ? ()=>azalt(props.id) :(null)}> - </button>
                            <h2>{props.sany}</h2>
                            <button onClick={()=>gosh(props.id)} > + </button>
                        </div>
                        <h1>{props.price*props.sany + manat}</h1>
                        <button onClick={()=>Remove(props.id)}><MinusCircleOutlined /></button>
                </div>
        </div>
    );
};

export default SebetCard ;