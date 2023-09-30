import React, { useContext } from 'react';

import "./about.css";
import Location from  '../../components/location';
import { SebedimContext } from '../../context/Sebedim';
const About = (props)=>{
    const {dil} = useContext(SebedimContext)
    return(
        <div className="about">
            <div style={{marginTop:"10px"}}>
                <Location name={dil=="tm"?"Eltip bermek hyzmaty":"Условия доставки"} />
            </div>
            <h1>{dil=="tm"?"Eltip bermek hyzmaty:":"Порядок доставки и оплаты:"} </h1>
            <ul>
                <li> {dil=="tm"?"Eltip bermek hyzmaty Türkmenabat şäheriniň çäginde elýeterlidir. Hyzmat mugt amala aşyrylýar;":
                "В настоящее время услуга по доставке осуществляется по городу Туркменабад. Услуга предоставляется бесплатно."}</li>
                <li> {dil=="tm"?"Her bir sargydyň jemi bahasy azyndan 150 manat bolmalydyr;"
                :"Минимальный заказ должен составлять не менее 150 манат;"}</li>
                <li> {dil=="tm"?"Saýtdan sargyt edeniňizden soňra operator size jaň edip sargydy tassyklar;"
                :"После Вашего заказа по сайту, оператор позвонит Вам для подтверждения заказа;"} </li>
                <li> {dil=="tm"?"Girizen salgyňyz we telefon belgiňiz esasynda hyzmat amala aşyrylýar;"
                :"•Услуга доставки выполняется по указанному Вами адресу и номеру телефона;"}</li>
                <li>{dil=="tm"?"Sargyt tassyklanmadyk ýagdaýynda ol hasaba alynmaýar we ýerine ýetirilmeýär. Sargydyň tassyklanmagy üçin girizen telefon belgiňizden jaň kabul edip bilýändigiňize göz ýetiriň. Şeýle hem girizen salgyňyzyň dogrulygyny barlaň;"
                :"Если заказ не подтвержден то данный заказ не регистрируется и не выполняется. Для подтверждения заказа, удостоверьтесь, что можете принять звонок по указанному Вами номеру телефона. Также проверьте правильность указанного Вами адреса;"} </li>
                <li>
                    {dil=="tm"?"Sargydy barlap alanyňyzdan soňra töleg amala aşyrylýar. Eltip berijiniň size gowşurýan töleg resminamasynda siziň tölemeli puluňyz bellenendir. Töleg nagt we nagt däl görnüşde milli manatda amala aşyrylýar. Kabul edip tölegini geçiren harydyňyz yzyna alynmaýar;"
                    :"Оплата выполняется после того, как Вы проверите и примите заказ. На платежном документе курьера указана сумма Вашей оплаты. Оплата выполняется наличными и через карту в национальной валюте. Принятый и оплаченный товар возврату не подлежит;"}
                </li>
                <li>
                    {dil=="tm"?"Sargyt tassyklanandan soňra 24 sagadyň dowamynda eýesi tapylmasa ol güýjüni ýitirýär;"
                    :"Если не удается найти владельца заказа в течение 24 часов после подтверждения заказа, то данный заказ аннулируется;"}
                </li>
            </ul>
        </div>
    );
};

export default About;