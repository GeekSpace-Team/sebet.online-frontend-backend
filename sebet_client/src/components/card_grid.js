import React,{useContext} from "react";
import {SebedimContext} from "../context/Sebedim";
    
import "./card_grid.css";
import sebet_icon from "../img/red_sebet_icon.svg";
const Card =(props)=>{
    const {AddTo,dil} = useContext(SebedimContext);
    let manat = dil=="tm"?' manat':" манат"
    return (
        <div className="card" >
            <img alt="img" src={props.src} onClick={props.onclick} />
            {props.skitga &&<div className="skitga">{ JSON.stringify(props.skitga).slice(0,2)+'%'}</div>}
            <button onClick={()=>AddTo(props.product)} className="card-sebet-icon"><img alt="img" src={sebet_icon}/></button>
            <h3 onClick={props.onclick}>{props.name}</h3>
            <h4>{props.new_price ? (props.new_price +""+ manat ): (props.old_price +""+ manat)} 
                <span id="old-price" >
                    {props.old_price>0 && (props.old_price+manat)}
                </span>
            </h4>

        </div>
    );
};

export default Card;