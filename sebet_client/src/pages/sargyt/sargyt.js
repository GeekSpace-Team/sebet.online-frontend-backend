import React, { useState,useContext, useEffect } from "react";
import {SebedimContext} from "../../context/Sebedim";
 
import "./sargyt.css";
import Location from "../../components/location";
import { axiosInstance } from "../../utils/axiosIntance";
import { message } from "antd";
import { useHistory } from "react-router-dom";
// import SebetCard from '../../components/sebet_card';

// import img from "../../img/1.png";

const Sargyt =(props)=>{let hasap=0;
    const history = useHistory();
    const {sebedim,RemoveAll} = useContext(SebedimContext);
    sebedim.map((haryt)=>{
        hasap = hasap+(haryt.baha*haryt.sany);
        
        return null;
    })
    const [wagty,setWagty]=useState("today");
    const {dil}= useContext(SebedimContext);

    const [bellik,setBellik] = useState();
    const [phone,setPhone] = useState("9936");
    const [address,setAddress] = useState();
    const [name,setName] = useState();
    const [check,setCheck] = useState(false);
    const [toleg,setToleg] = useState();
    const [sagat,setSagat] = useState();
    

    let time = new Date().getHours();
    let manat = dil=="tm"?" manat":" манат";
    // let [carts,setCarts]=useState([]);
    // useEffect(async()=>{
    //     await  sebedim.map(async(sebet)=>{
    //         let obj={
    //             product_id:sebet.product.product_id,
    //             quantity:sebet.sany
    //         }
    //     //    await carts.push(obj);
    //        await setCarts({
    //            ...
    //            obj
    //        })
    //     });
    //     console.log(carts);
    // },[sebedim])

    const Sargyt = async()=>{
        // await  sebedim.map(async(sebet)=>{
        //     let obj={
        //         product_id:sebet.product.product_id,
        //         quantity:sebet.sany
        //     }
        // //    await carts.push(obj);
        //    await setCarts({... obj });
        // });
        let carts = [];
        let numberrr = "+"+phone;
        await  sebedim.map(async(sebet)=>{
                let obj={
                    product_id:sebet.product.product_id,
                    quantity:sebet.sany
                }
               await carts.push(obj);
            //    await setCarts({... obj });
            });
        // console.log("carst post::::",carts);
        let user = JSON.parse(localStorage.getItem("sebetProfile"));
        
        if(user){
            console.log(user.data.user.id)
            hasap>=150? await axiosInstance.post("users/my-orders/add",{
                address: address,
                delivery_time: sagat,
                user_name:name,
                user_phone:numberrr,
                payment_type:toleg,
                i_take:check,
                delivery_time:sagat,
                note:bellik,
                order_products : carts,
                userId:user.data.user.id
            }).then((data)=>{
                message.success(dil=="tm"?"Siziň sargydyňyz kabul edildi!":"Ваш заказ принят!");
                RemoveAll();
                history.push("/");
            }).catch((err)=>{
                message.warn(dil=="tm"?"Maglumatlary doly giriziň!":"Введите данные полностью!")
                console.log(err);
            })
            :message.warn(dil=="tm"?"Sargydyňyzyň jemi azyndan 100 manat bolmaly":"Сумма вашего заказа должна быть не менее 100 манатов")
        }else{
          hasap>=150 ?  await axiosInstance.post("users/my-orders/add",{
                address: address,
                delivery_time: sagat,
                user_name:name,
                user_phone:numberrr,
                payment_type:toleg,
                i_take:check,
                delivery_time:sagat,
                note:bellik,
                order_products : carts,
            }).then((data)=>{
                message.success(dil=="tm"?"Siziň sargydyňyz kabul edildi!":"Ваш заказ принят!");
                RemoveAll();
                history.push("/");
            }).catch((err)=>{
                message.warn(dil=="tm"?"Maglumatlary doly giriziň!":"Введите данные полностью!")
                console.log(err);
            })
            :message.warn(dil=="tm"?"Sargydyňyzyň jemi azyndan 100 manat bolmaly":"Сумма вашего заказа должна быть не менее 100 манатов")

        }
        

    }

    useEffect(()=>{
        axiosInstance.get("users/my-account").then((data)=>{
            console.log("it is me",data.data);
            setName(data.data.user_name);
            let numberr = parseInt(data.data.user_phone);
            setPhone(numberr);
        }).catch((err)=>{
            console.log(err);
        })
    },[])

    const ChangeHandler = (e)=>{
        if(e.length>3 && e.length<12)
        setPhone(e);
    }
    return(
        <React.Fragment>
            <div className="sargyt_location">
                <Location name={dil=="tm"?"Sargydym":"Заказ"} />
            </div>
        <div className="sargyt_page">
            
            <div className="sargyt_shekili">
                <div className="toleg_shekili">
                    <h2>{dil=="tm"?"Töleg şekili":"Вид оплаты"} <span style={{color:"red"}}>*</span></h2>
                    <div>
                        <input onChange={(e)=>setToleg(e.target.value)} value="1" type="radio" name="toleg_gornush" id="nagt" />
                        <label for="nagt" >{dil=="tm"?"Nagt":"Наличными"}</label>
                    </div>
                    <div>
                        <input onChange={(e)=>setToleg(e.target.value)} value="2" type="radio" name="toleg_gornush" id="terminal" />
                        <label for="terminal" >{dil=="tm"?"Töleg terminaly":"Оплата терминалом"}</label>
                    </div>
                    <div>
                        <input onChange={(e)=>setToleg(e.target.value)} value="3" type="radio" name="toleg_gornush" id="online" />
                        <label for="online" >{dil=="tm"?"Onlaýn Töleg (ýakynda)":"Оплата онлайн (Скоро)"}</label>
                    </div>
                </div>

                <div className="alynmasy">
                <input value={check} onChange={(e)=>setCheck(!check)} type="checkbox" name="baryp_aljak" id="baryp_aljak"/>
                <label for="baryp_aljak">{dil=="tm"?"Özüm baryp aljak":"Самовывоз"}</label>
                </div>

                <div className="wagty">
                   {check &&  <h1>{dil=="tm"?"Alyp gitýän wagtyňyzy saýlaň:":"Выберите время, которое вы принимаете"} <span style={{color:"red"}}>*</span></h1>}
                   {!check &&  <h1>{dil=="tm"?"Eltip berme wagtyny saýlaň:":"Выберите время доставки"} <span style={{color:"red"}}>*</span></h1>}
                   <div className="wagty_buttons">
                        {
                            wagty==="today" ? <button onClick={()=>setWagty("today")} className="saylanan_wagt" >{dil=="tm"?"Şu gün":"Сегодня"}</button> :
                            <button onClick={()=>setWagty("today")}>{dil=="tm"?"Şu gün":"Сегодня"}</button>
                        }
                        {
                           wagty==="tomorow" ? <button onClick={()=>setWagty("tomorow")}  className="saylanan_wagt" >{dil=="tm"?"Ertir":"Завтра"}</button> :
                           <button onClick={()=>setWagty("tomorow")} >{dil=="tm"?"Ertir":"Завтра"}</button>
                        }
                        
                    </div>
                   <div className="sagat">
                       { wagty=="today" && <React.Fragment>
                        {time<9 &&  <div>
                            <input onChange={(e)=>setSagat(e.target.value)} value="11" type="radio" name="sagat" id="sagat" />
                            <label for="sagat">9:00 - 12:00</label>
                        </div>}
                        {time<12 && <div>
                            <input onChange={(e)=>setSagat(e.target.value)} value="12" type="radio" name="sagat" id="sagat" />
                            <label for="sagat">12:00 - 15:00</label>
                        </div>}
                        { time<18 && <div>
                            <input onChange={(e)=>setSagat(e.target.value)} value="13" type="radio" name="sagat" id="sagat" />
                            <label for="sagat">18:00 - 21:00</label>
                        </div>}
                        </React.Fragment>}

                        { wagty=="tomorow" && <React.Fragment>
                        <div>
                            <input onChange={(e)=>setSagat(e.target.value)} value="21" type="radio" name="sagat" id="sagat" />
                            <label for="sagat">9:00 - 12:00</label>
                        </div>
                        <div>
                            <input onChange={(e)=>setSagat(e.target.value)} value="22" type="radio" name="sagat" id="sagat" />
                            <label for="sagat">12:00 - 15:00</label>
                        </div>
                        <div>
                            <input onChange={(e)=>setSagat(e.target.value)} value="23" type="radio" name="sagat" id="sagat" />
                            <label for="sagat">18:00 - 21:00</label>
                        </div>
                        </React.Fragment>}
                   </div>

                </div>

                <div className="maglumat">
                    <div>
                        <div>
                            <p for="name">{dil=="tm"?"Doly adyňyz":"Полное имя"} <span style={{color:"red"}}>*</span></p>
                            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" name="name" id="name"/>
                        </div>
                        <div>
                            <p for="address">{dil=="tm"?"Salgyňyz":"Адрес"} <span style={{color:"red"}}>*</span></p>
                            <input value={address} onChange={(e)=>setAddress(e.target.value)} type="text" name="address" id="address"/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <p for="telefon">{dil=="tm"?"Telefon":"Телефон"} <span style={{color:"red"}}>*</span></p>
                            <input value={phone} onChange={(e)=>ChangeHandler(e.target.value)} type="number" name="telefon" id="telefon"/>
                        </div>
                        <div>
                            <p for="bellik">{dil=="tm"?"Bellik":"Примечание"}</p>
                            <input value={bellik} onChange={(e)=>setBellik(e.target.value)} type="text" name="bellik" id="bellik"/>
                        </div>
                    </div>
                </div>

                <div className="text">
                    <p>
                    {dil=="tm"?
                    "-  Sargydy barlap alanyňyzdan soňra töleg amala aşyrylýar. Eltip berijiniň size gowşurýan töleg resminamasynda siziň tölemeli puluňyz bellenendir. Töleg nagt we nagt däl görnüşde milli manatda amala aşyrylýar. Kabul edip tölegini geçiren harydyňyz yzyna alynmaýar;"
                    :"Оплата выполняется после того, как Вы проверите и примите заказ. На платежном документе доставщика указана сумма Вашей оплаты. Оплата выполняется наличными и через карту в национальной валюте. Принятый и оплаченный товар возврату не подлежит;"}
                    </p>
                    <p>
                    {dil=="tm"?
                    "-  Sargydy barlap alanyňyzdan soňra töleg amala aşyrylýar. Eltip berijiniň size gowşurýan töleg resminamasynda siziň tölemeli puluňyz bellenendir."
                    :"После Вашего заказа по сайту, оператор позвонит Вам для подтверждения заказа (постоянным клиентам по их желанию подтверждение осуществляется автоматизированно);"}
                    </p>
                </div>



            </div>






            <div className="sargyt_hasap">
                    <h2>{dil=="tm"?"Sebedim":"Моя корзина"}</h2>
                    <h5>{dil=="tm"?"Jemi":"Итого"}</h5>
                    <h3>{hasap+ manat}</h3>
                    <button onClick={()=>Sargyt()}> {dil=="tm"?"Sargyt et":"Заказать"}</button>
            </div>
        </div>
        </React.Fragment>
    );
};

export default Sargyt;