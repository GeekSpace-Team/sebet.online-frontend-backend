import React, { useContext } from 'react';
import {Link} from "react-router-dom";

import uuid from 'uuid/dist/v1';
import "./footer.css";
import logo from "../img/logo.png";
import { SebedimContext } from '../context/Sebedim';

const Footer = (props)=>{

    const {dil} = useContext(SebedimContext);
    const newYear = new Date().getFullYear();
    return(
        <div className="footer">
            <div className="footer-content">
                <div>
                    <img alt="img" src={logo}/>
                </div>
                <div className="footer-contact">
                        
                        <table id="table_desktop" key={uuid()} >
                            <tbody>
                            <tr key={uuid()}>
                                <td key={uuid()}>{dil=="tm"?"Telefon":"Телефон"}</td>
                                <td key={uuid()}>+99365584800</td>
                                <td key={uuid()}>Email</td>
                                <td key={uuid()}>hergun.2015@mail.ru</td>
                            </tr>
                            <tr key={uuid()}>
                                <td key={uuid()}>Imo</td>
                                <td key={uuid()}>+99342230660</td>
                                <td key={uuid()}>Instagram</td>
                                <td key={uuid()}>@sebet.online</td>
                            </tr>
                            </tbody>
                        </table>
                        <table id="table_phone"  key={uuid()}>
                        <tbody key={uuid()}>
                            <tr key={uuid()}>
                                <td key={uuid()}>{dil=="tm"?"Telefon":"Телефон"}</td>
                                <td key={uuid()}>+99365584800</td>
                               
                            </tr>
                            <tr key={uuid()}>
                                <td key={uuid()}>Imo</td>
                                <td key={uuid()}>+99342230660</td>
                            </tr>
                            <tr key={uuid()}>
                                <td key={uuid()}>Email</td>
                                <td key={uuid()}>hergun.2015@mail.ru</td>
                            </tr>
                            <tr key={uuid()}>
                                <td key={uuid()}>Instagram</td>
                                <td key={uuid()}>@sebet.online</td>
                            </tr>
                            </tbody>
                        </table>
                        <table id="table_phone2" key={uuid()}>
                        <tbody>
                            
                                <tr key={uuid()} id="phone_about" >
                                <Link to="/about">
                            {/* onClick={()=>{window.location.assign("/about")}} */}
                                  {dil=="tm"?"Biz Barada":"О нас"}
                                </Link>
                            </tr>
                            <tr key={uuid()} id="phone_about">
                               <Link to="/eltipBermek">
                                  {dil=="tm"?"Eltip bermek hyzmaty":"Условия доставки"}
                                </Link>
                            </tr>
                            <tr key={uuid()} id="phone_about">
                            <Link to="/aragatnashyk">
                                {dil=="tm"?"Aragatnaşyk":"Свяжитесь с нами"}
                                </Link>
                            </tr>
                            <tr key={uuid()} id="phone_about">
                            <Link to="/duzgunler">
                                {dil=="tm"?"Ulanyş düzgünleri":"Условия пользования"}
                                </Link>
                            </tr>
                            </tbody>
                        </table>
                        
                        <table id="table_desktop2" key={uuid()} style={{marginLeft:"100px"}}>
                        <tbody>
                            <tr key={uuid()}>
                                <td key={uuid()} id="about"> <Link to="/about">{dil=="tm"?"Biz Barada":"О нас"}</Link></td>
                                <td key={uuid()} id="about"><Link to="/aragatnashyk">{dil=="tm"?"Aragatnaşyk":"Свяжитесь с нами"}</Link></td>
                            </tr>
                            <tr key={uuid()}>
                                <td key={uuid()} style={{width:"200px"}}id="about"><Link to="/eltipBermek">{dil=="tm"?"Eltip bermek hyzmaty":"Условия доставки"}</Link></td>
                                <td key={uuid()} style={{width:"200px"}}id="about"><Link to="/duzgunler">{dil=="tm"?"Ulanyş düzgünleri":"Условия пользования"}</Link></td>
                            </tr>
                            </tbody>
                        </table>
                       
                </div>
                <div className="maker"> 
                    <h3 ><span style={{color:"#ff0000"}}>©{newYear!="2021" && "2021-"}{newYear} sebet.online</span> {dil=="tm"?"Ähli hukuklary goraglydyr.":"Все права зашищены"}</h3>
                    <h4 style={{cursor:"pointer"}} onClick={()=>window.location.href="https://geekspace.dev/ru/home"}>{dil=="tm"?"Geek Space tarapyndan döredildi":"Разработано командой Geek Space"}</h4>
                </div>
            </div>
        </div>
    );
};

export default Footer;