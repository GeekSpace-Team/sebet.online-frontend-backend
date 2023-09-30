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
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [current,setCurrent] = useState();
    const Signin = ()=>{
        let numberr = "+"+number
        axiosInstance.post("/users/login",{
            user_phone: numberr,
            user_password: password
        }).then((data)=>{
            console.log("login data:",data.data);

                localStorage.setItem("sebetProfile", JSON.stringify(data.data));
                message.success("Successfully")
                //  history.push('/hasabym')
                window.location.href="/"
           
           }).catch((err)=>{
               console.log("login data:",err);
           });
    }


    return (
        <div className="login">
            <div className="location">
              <Location name="Login"/>
            </div>
            
            <div className="form">
                <h1>{dil=="tm"?"Açar sözüni täzelemek":"Изменить пароль"}</h1>
                <h3 style={{fontSize:"18px",
                                textAlign:"left",
                                lineHeight:"22.05px",
                                color:"rgb(64, 55, 55)",
                                fontWeight:"450",
                                marginTop:"30px",
                                marginBottom:"-10px"}}
                                htmlFor="number">{dil=="tm"?"Häzirki açar sözi":"Текущее ключевое слово"}</h3> <br/>

                <input name="number" id="nuber" value={current} onChange={(e)=>{setCurrent(e.target.value)}} />

                <h3 style={{fontSize:"18px",
                                textAlign:"left",
                                lineHeight:"22.05px",
                                color:"rgb(64, 55, 55)",
                                fontWeight:"450",
                                marginTop:"30px",
                                marginBottom:"-10px"}}
                                htmlFor="number">{dil=="tm"?"Açar söz":"Пароль"}</h3> <br/>

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

                <h2>{dil=="tm"?"Açar sözini unutdym":"Забыл пароль"}</h2>
                {/* <Link to="/hasabym"> */}
                    <button onClick={()=>Signin()}>{dil=="tm"?"Içeri gir":"Войти"}</button>
                    {/* </Link> */}
                <h2><Link to="/signup">{dil=="tm"?"Agza bolmak":"Регистрация"}</Link></h2>
            </div>

        </div>
    );
};

export default Login;