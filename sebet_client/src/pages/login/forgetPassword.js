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

    const [number,setNumber] = useState("+9936");
    const [password,setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();
    const [current,setCurrent] = useState("9936");
    const [check,setCheck] = useState(true);
    const [codeCheck,setCodeCheck] = useState(false)
    const [checked,setChecked] = useState(false);
    const [code ,setCode] = useState();
    const [serverCode,setServerCode] = useState();
    const Signin = ()=>{
        let numberr= "+"+current;
        axiosInstance.patch("/users/forgot-password",{
            user_checked_phone: numberr,
            newPassword: password,
            newPasswordConfirm:passwordConfirm
        }).then((data)=>{
            console.log("login data:",data.data);

                localStorage.setItem("sebetProfile", JSON.stringify(data.data));
                message.success(dil=="tm"?"Siziň açar sözüňiz täzelendi":"Ваш пароль изменен")
                //  history.push('/hasabym')
                window.location.href="/"
           
           }).catch((err)=>{
               console.log("login data:",err);
           });
    }

    const Checking = async()=>{
        let numberr = "+"+current;
        current.length==11 ? (axiosInstance.patch("/users/forgot-password",{
            user_phone:numberr
        }).then((data)=>{
            setCheck(false);
            setCodeCheck(true);
           setServerCode(data.data.id);
           console.log(data.data);
            message.success(dil=="tm"?"Siziň telefonyňyza ugradylan SMS koda garaşyň!":"Дождитесь SMS-кода, пришедшего на ваш телефон!");
            
        }).catch((err)=>{
            console.log(err);
            message.warn(dil=="tm"?"Bu nomurda ulanyjy ýok!":"На этом номере нет пользователей!");
        }))
        :(message.warn(dil=="tm"?"Telefon belgini doly ýazmaly":"Вы должны ввести номер телефона полностью"))
    }

const CodeChecking = ()=>{
    // message.success(serverCode)
    if(serverCode==code){
        setCodeCheck(false);
        setChecked(true);
        message.success(dil=="tm"?"Siziň ugradan kodyňyz dogry":"Отправлен верный код")
    }else{
        message.error(dil=="tm"?"Siziň ugradan kodyňyz ýalňyş":"Отправлен неверный код")
    }
}

const PhoneChangeHundler = (e)=>{
    console.log(e.length);
    if(e.length>3 && e.length<12){
        setCurrent(e)
    }
}
    return (
        <div className="login">
            <div className="location">
              <Location name="Login"/>
            </div>


            {
                check && <div className="form">
                <h1>{dil=="tm"?"Açar sözüni unutdym":"Забыл пароль"}</h1>
                <h3 style={{fontSize:"18px",
                                textAlign:"left",
                                lineHeight:"22.05px",
                                color:"rgb(64, 55, 55)",
                                fontWeight:"450",
                                marginTop:"30px",
                                marginBottom:"-10px"}}
                                htmlFor="number">{dil=="tm"?"Telefon":"Телефон"}</h3> <br/>

                <input type="number" name="number" id="nuber" value={current} onChange={(e)=>PhoneChangeHundler(e.target.value)} />
                 {/* <Link to="/hasabym"> */}
                 <button style={{cursor:"pointer"}} onClick={()=>Checking()}>{dil=="tm"?"Içeri gir":"Войти"}</button>
                    {/* </Link> */}
                <h2><Link to="/signup">{dil=="tm"?"Agza bolmak":"Регистрация"}</Link></h2>
            </div>
            }
            {
                codeCheck && <div className="form">
                <h1>{dil=="tm"?"Siziň telefonyňyza ugradylan SMS kody giriziň":"Введите SMS-код, отправленный на ваш телефон номер"}</h1>
                <h3 style={{fontSize:"18px",
                                textAlign:"left",
                                lineHeight:"22.05px",
                                color:"rgb(64, 55, 55)",
                                fontWeight:"450",
                                marginTop:"30px",
                                marginBottom:"-10px"}}
                                htmlFor="number">{dil=="tm"?"Kod":"Телефон"}</h3> <br/>

                <input name="number" id="nuber" value={code} onChange={(e)=>{setCode(e.target.value)}} />
                 {/* <Link to="/hasabym"> */}
                 <button style={{cursor:"pointer"}}  onClick={()=>CodeChecking()}>{dil=="tm"?"Içeri gir":"Войти"}</button>
                    {/* </Link> */}
                <h2><Link to="/signup">{dil=="tm"?"Agza bolmak":"Регистрация"}</Link></h2>
            </div>
            }
           {
           checked && <div className="form">
                <h1>{dil=="tm"?"Açar sözüni unutdym":"Забыл пароль"}</h1>
                {/* <h3 style={{fontSize:"18px",
                                textAlign:"left",
                                lineHeight:"22.05px",
                                color:"rgb(64, 55, 55)",
                                fontWeight:"450",
                                marginTop:"30px",
                                marginBottom:"-10px"}}
                                htmlFor="number">{dil=="tm"?"Häzirki açar sözi":"Текущее ключевое слово"}</h3> <br/>

                <input name="number" id="nuber" value={current} onChange={(e)=>{setCurrent(e.target.value)}} /> */}

                <h3 style={{fontSize:"18px",
                                textAlign:"left",
                                lineHeight:"22.05px",
                                color:"rgb(64, 55, 55)",
                                fontWeight:"450",
                                marginTop:"30px",
                                marginBottom:"-10px"}}
                                htmlFor="number">{dil=="tm"?"Täze açar söz":"Новое ключевое слово"}</h3> <br/>

                <input type="password" name="password" id="password" onChange={(e)=>{setPassword(e.target.value)}}/>

                <h3 style={{fontSize:"18px",
                                textAlign:"left",
                                lineHeight:"22.05px",
                                color:"rgb(64, 55, 55)",
                                fontWeight:"450",
                                marginTop:"30px",
                                marginBottom:"-10px"}}
                                htmlFor="number">{dil=="tm"?"Täze açar söz tassykla":"Подтвердите Новое ключевое слово"}</h3> <br/>

                <input type="password" name="password2" id="password2" onChange={(e)=>{setPasswordConfirm(e.target.value)}} />

                {/* <h2>{dil=="tm"?"Açar sözini unutdym":"Забыл пароль"}</h2> */}
                {/* <Link to="/hasabym"> */}
                    <button style={{cursor:"pointer"}}  onClick={()=>Signin()}>{dil=="tm"?"Içeri gir":"Войти"}</button>
                    {/* </Link> */}
                <h2><Link to="/signup">{dil=="tm"?"Agza bolmak":"Регистрация"}</Link></h2>
            </div>
}
        </div>
    );
};

export default Login;