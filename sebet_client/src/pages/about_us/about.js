import React, { useContext } from 'react';

import "./about.css";
import Location from  '../../components/location';
import { SebedimContext } from "../../context/Sebedim";
const About = (props)=>{
    const {dil} = useContext(SebedimContext);
    return(
        <div className="about">
            <div style={{marginTop:"10px"}}>
                <Location name={dil=="tm"?"Biz barada":"О нас"} />
            </div>
            <p>
           {dil =="tm"?"Biziň Sebet.Online marketimize hoş geldiňiz!"+
            "Onlaýn marketimiz 2021-njy ýylyň awgust aýyndan "+
            "bäri hyzmat berýär. Häzirki wagtda Size ýüzlerçe "+
            "brendlere degişli bolan müňlerçe haryt görnüşlerini "+
            "hödürleýäris! Haryt görnüşlerimizi sizden gelýän" +
            "isleg we teklipleriň esasynda köpeltmäge dowam edýäris. "+
            "Biziň maksadymyz müşderilerimize ýokary hilli hyzmat "+
            "bermek bolup durýar. Indi Siz öýüňizden çykmazdan" +
           " özüňizi gerekli zatlar bilen üpjün edip bilersiňiz! "+
            "Munuň bilen bir hatarda Siz wagtyňyzy we transport" +
            "çykdajylaryny hem tygşytlaýarsyňyz." +
            "Tölegi harytlar size gowuşandan soňra" +
            "nagt ýa-da bank kartlarynyň üsti bilen amala aşyryp bilersiňiz!"
            :"Рады приветствовать Вас в интернет-маркете Sebet.Online!"+
            "Мы начали работу в августе 2021 года и на сегодняшний день мы предлагаем Вам тысячи видов товаров, которые принадлежат сотням брендам. Каждый день мы работаем над увеличением ассортимента, привлечением новых компаний к сотрудничеству. Целью нашей работы является создание выгодных условий для наших клиентов-экономия времени на походы в магазины, оплата наличными или картой, доставка в удобное время, и конечно же качественная продукция по лучшим ценам!"
        }

            </p>
           </div>
    );
};

export default About;