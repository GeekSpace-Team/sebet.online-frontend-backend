import React, { useContext, useEffect, useState } from "react";
import {Link} from "react-router-dom";


import "./login.css";
import  Location from "../../components/location";
import {axiosInstance} from "../../utils/axiosIntance";
import {Redirect,useHistory} from 'react-router-dom'
import { SebedimContext } from "../../context/Sebedim";
import { message } from "antd";
const Login =(props)=>{
    const {dil} = useContext(SebedimContext);
    const history = useHistory();

    const [number,setNumber] = useState("9936");
    const [password,setPassword] = useState();

    const Signin = ()=>{
        let numberr = "+"+number;
        number.length==11 ?
        (axiosInstance.post("/users/login",{
            user_phone: numberr,
            user_password: password
        }).then((data)=>{
            console.log("login data:",data.data);
                message.success(dil=="tm"?"Siz üstünlikli ulgama girdiňiz":"Вы успешно вошли в систему");
                localStorage.setItem("sebetProfile", JSON.stringify(data.data));
                // message.success(dil=="tm"?"Siz üstünlikli ulgama girdiňiz":"Вы успешно вошли в систему")
                //  history.push('/hasabym')
                window.location.href="/"
           
           }).catch((err)=>{
               console.log("login data:",err);
               message.warn(dil=="tm"?"Telefon belgiňiz ýa-da açar sözüňiz gabat gelenok":"Ваш номер телефона или пароль не совпадают")
           }))
           :(message.warn(dil=="tm"?"Telefon belgini doly ýazmaly":"Вы должны ввести номер телефона полностью"))
    }

    const PhoneChangeHundler = (e)=>{
        if(e.length>3 && e.length<12){
            setNumber(e)
        }
    }

    return (
        <div className="login">
            <div className="location">
              <Location name="Login"/>
            </div>
            
            <div className="form">
                <h1>{dil=="tm"?"Içeri gir":"Войти"}</h1>
                <h3 style={{fontSize:"18px",
                                textAlign:"left",
                                lineHeight:"22.05px",
                                color:"rgb(64, 55, 55)",
                                fontWeight:"450",
                                marginTop:"30px",
                                marginBottom:"-10px"}}
                                htmlFor="number">{dil=="tm"?"Telefon":"Телефон"}</h3> <br/>

                <input type="number" name="number" id="nuber" value={number} onChange={(e)=>PhoneChangeHundler(e.target.value)} />

                <h3 style={{fontSize:"18px",
                                textAlign:"left",
                                lineHeight:"22.05px",
                                color:"rgb(64, 55, 55)",
                                fontWeight:"450",
                                marginTop:"30px",
                                marginBottom:"-10px"}}
                        htmlFor="password">{dil=="tm"?"Açar söz":"Пароль"}</h3> <br/>

                <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} />
                <h2 style={{textDecoration:"underline",cursor:"pointer"}} onClick={()=>history.push("/forget")}>{dil=="tm"?"Açar sözini unutdym":"Забыл пароль"}</h2>
                {/* <Link to="/hasabym"> */}
                    <button style={{cursor:"pointer"}} onClick={()=>Signin()}>{dil=="tm"?"Içeri gir":"Войти"}</button>
                    {/* </Link> */}
                <h2><Link to="/signup">{dil=="tm"?"Agza bolmak":"Регистрация"}</Link></h2>
            </div>

        </div>
    );
};

export default Login;