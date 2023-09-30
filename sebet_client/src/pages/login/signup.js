import React,{useContext, useEffect,useState} from "react";
import {Link} from "react-router-dom";

import "./signup.css";
import  Location from "../../components/location";
import {axiosInstance} from "../../utils/axiosIntance";
import {Redirect,useHistory} from 'react-router-dom';
import { SebedimContext } from "../../context/Sebedim";
import { message } from "antd";
const Signup =(props)=>{

    const {dil}= useContext(SebedimContext);
    const history = useHistory();

    const [number,setNumber] = useState("9936");
    const [password,setPassword] = useState();
    const [userName, setUserName] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [address,setAddress] = useState();
    const [checked, setChecked] = useState(false);
    const [phone , setPhone] = useState();
    const [verify,setVerify] = useState(true);
    const [verified,setVerified] = useState(false);
    const [code,setCode] = useState()
    const [userCode,setUserCode] = useState();
    const [tanyshdym,setTanyshdym] = useState(false);
    const Signup = ()=>{

        console.log(number)
let numberr = "+"+number;
console.log( " console,.log",numberr)
        axiosInstance.post("/users/signup",{
            user_name: userName,
            user_phone:numberr,
            user_checked_phone:numberr,
            user_password: password,
            user_passwordConfirm: passwordConfirm,
            user_address:address,
        }).then((data)=>{
            console.log("login data:",data.data);
            message.success(dil=="tm"?"Siz üstünlikli ulgama girdiňiz":"Вы успешно вошли в систему");

                localStorage.setItem("sebetProfile", JSON.stringify(data.data));
                // message.success("Successfully")
                 window.location.href='/';
           
           }).catch((err)=>{
               console.log("login data:",err);
               message.warn(dil=="tm"?"Maglumatlary doly giriziň!":"Введите данные полностью!")
           });
    }

    const Verify = ()=>{
        
       let numberr = "+"+number;
       console.log("numberr:",numberr);
        number.length==11 ? (axiosInstance.post("/users/signup",{
            user_phone:numberr,
        }).then((data)=>{
            setVerified(true);
            setVerify(false);
            console.log("login data:",data.data);
            setUserCode(data.data.id);
            message.success(dil=="tm"?"Siziň telefonyňyza ugradylan SMS koda garaşyň!":"Дождитесь SMS-кода, пришедшего на ваш телефон!");

                // localStorage.setItem("sebetProfile", JSON.stringify(data.data));
                // message.success("Successfully")
                //  window.location.href='/';
           
           }).catch((err)=>{
               console.log("login data:",err);
               message.warn(dil=="tm"?"Bu Telefon belgi öňden hasaba alynan!":"Bu Telefon belgi öňden hasaba alynan!")

           }))
           :(message.warn(dil=="tm"?"Telefon belgini doly ýazmaly":"Вы должны ввести номер телефона полностью"))
    }

    const Verified = ()=>{
        if(code && code==userCode){
            setVerified(false);
            setChecked(true);
            message.success(dil=="tm"?"Siziň ugradan kodyňyz dogry":"Отправлен верный код")
        }else{
            message.warn(dil=="tm"?"Siziň ugradan kodyňyz ýalňyş!":"Отправлен неверный код")
        }
    }


    const PhoneChangeHundler = (e)=>{
        if(e.length>3 && e.length<12){
           setNumber(e)
        }
    }


    return (
        <div className="login">
            <div className="location">
              <Location name={dil=="tm"?"Ýazylmak":"Регистрация"}/>
            </div>
            {
                verify && <div className="form">
                    <h1>{dil=="tm"?"Agza bolmak":"Зарегистрироваться"}</h1>
                <h3 style={{fontSize:"18px",
                                textAlign:"left",
                                lineHeight:"22.05px",
                                color:"rgb(64, 55, 55)",
                                fontWeight:"450",
                                marginTop:"30px",
                                marginBottom:"-10px"}}
                        >{dil=="tm"?"Telefon Belgiňiz":"Номер телефона"}</h3> <br/>

                <input type="number" value={number} name="name" onChange={(e)=>PhoneChangeHundler(e.target.value)} />
                <button style={{cursor:"pointer"}}  onClick={()=>Verify()}>{dil=="tm"?"Girmek":"Регистрация"}</button>
                <h2><Link to="/login">{dil=="tm"?"Içeri gir":"Войти"}</Link></h2>
                    </div>
            }
            {
                verified && <div className="form">
                <h1>{dil=="tm"?"Siziň telefonyňyza ugradylan SMS kody giriziň":"Введите SMS-код, отправленный на ваш телефон номер"}</h1>
            <h3 style={{fontSize:"18px",
                            textAlign:"left",
                            lineHeight:"22.05px",
                            color:"rgb(64, 55, 55)",
                            fontWeight:"450",
                            marginTop:"30px",
                            marginBottom:"-10px"}}
                    >{dil=="tm"?"SMS kody":"SMS-код"}</h3> <br/>

            <input name="name" onChange={(e)=>{setCode(e.target.value)}} />
            <button style={{cursor:"pointer"}}  onClick={()=>Verified()}>{dil=="tm"?"Girmek":"Регистрация"}</button>
            <h2><Link to="/login">{dil=="tm"?"Içeri gir":"Войти"}</Link></h2>
                </div>
            }
            
            { checked && <div className="form">
                <h1>{dil=="tm"?"Agza bolmak":"Зарегистрироваться"}</h1>
                <h3 style={{fontSize:"18px",
                                textAlign:"left",
                                lineHeight:"22.05px",
                                color:"rgb(64, 55, 55)",
                                fontWeight:"450",
                                marginTop:"30px",
                                marginBottom:"-10px"}}
                        >{dil=="tm"?"Doly adyňyz":"Полное имя"}</h3> <br/>

                <input name="name" onChange={(e)=>{setUserName(e.target.value)}} />

                

                <h3 style={{fontSize:"18px",
                                textAlign:"left",
                                lineHeight:"22.05px",
                                color:"rgb(64, 55, 55)",
                                fontWeight:"450",
                                marginTop:"30px",
                                marginBottom:"-10px"}}
                                htmlFor="number">{dil=="tm"?"Açar söz (minimum 6 symbol)":"Пароль (minimum 6 symbol)"}</h3> <br/>

                <input type="password" name="password" id="password" onChange={(e)=>{setPassword(e.target.value)}}/>

                <h3 style={{fontSize:"18px",
                                textAlign:"left",
                                lineHeight:"22.05px",
                                color:"rgb(64, 55, 55)",
                                fontWeight:"450",
                                marginTop:"30px",
                                marginBottom:"-10px"}}
                                htmlFor="number">{dil=="tm"?"Açar söz tassykla":"Подтвердите пароль"}</h3> <br/>

                <input type="password" name="password2" id="password2" onChange={(e)=>{setPasswordConfirm(e.target.value)}} />

                <h3 style={{fontSize:"18px",
                                textAlign:"left",
                                lineHeight:"22.05px",
                                color:"rgb(64, 55, 55)",
                                fontWeight:"450",
                                marginTop:"30px",
                                marginBottom:"-10px"}}
                                htmlFor="number">{dil=="tm"?"Address":"Адрес"}</h3> <br/>

                <input name="address" id="address" onChange={(e)=>{setAddress(e.target.value)}}/>
                
                <input onChange={()=>setTanyshdym(!tanyshdym)} className="checkbox" id="checkbox" name="checkbox" type="checkbox"/>
                <label htmlFor="checkbox"
                    style={{fontSize:"16px",lineHeight:"19.6px",color:"rgba(55, 58, 64, 1)",margin:"-15px 0 0 5px"}}
                > {dil=="tm"?"Ulanyş Düzgünlerini we Gizlinlik Şertnamasyny okadym we kabul edýärin":"Ознакомился и Принимаю Условия Пользования"}</label>
                <Link to="/duzgunler" style={{marginLeft:"10px",textDecoration:"underline"}}>{dil=="tm"?"Giňişleýin":"Подробная"}</Link>
                {tanyshdym && <button style={{cursor:"pointer"}}  onClick={()=>Signup()}>{dil=="tm"?"Girmek":"Регистрация"}</button>}
                {!tanyshdym && <button style={{cursor:"pointer"}}  disabled style={{backgroundColor:"grey"}} onClick={()=>Signup()}>{dil=="tm"?"Girmek":"Регистрация"}</button>}

                <h2><Link to="/login">{dil=="tm"?"Içeri gir":"Войти"}</Link></h2>
            </div>}

        </div>
    );
};

export default Signup;