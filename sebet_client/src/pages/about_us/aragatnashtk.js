import React, { useContext } from 'react';

import "./about.css";
import Location from  '../../components/location';
import { SebedimContext } from '../../context/Sebedim';
const About = (props)=>{
    const {dil} = useContext(SebedimContext)
    return(
        <div className="about">
            <div style={{marginTop:"10px"}}>
                <Location name={dil=="tm"?"Habarlaşmak üçin":"Свяжитесь с нами"} />
            </div>
           
            <h1>{dil=="tm"?"Habarlaşmak üçin ":"Свяжитесь с нами"}</h1>
                
            <h3>{dil=="tm"?"Websaýt: sebet.online":"Вебсайт: sebet.online"}</h3>
            <h3>{dil=="tm"?"Telefon":"Телефон"}: <br></br>
                 +99365584800 <br></br>
                +99342230660</h3>
            <h3>{dil=="tm"?"Salgysy: Türkmenabat şäheri, Magtymguly Pyragy köçesiniň ugrunda":"Адрес: город Туркменабад, вдоль улицы Махтумкули Фираги"}</h3>
            <h3>{dil=="tm"?"E-mail: hergun.2015@mail.ru":"Э-почта: hergun.2015@mail.ru"}</h3>
            <p>{dil=="tm"?"(Müşderi Hyzmatlary, hepdäniň 7 güni 09:00 - 18:00 sagatlar arasynda hyzmat berýär.)":"(Услуги Клиентам 7 дней в неделю с 09:00 по 18:00 часов.)"}</p>
        </div>
    );
};

export default About;