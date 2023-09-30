import react, { useContext, useEffect, useState } from "react";
import { Button, DatePicker, message, Space } from 'antd';
import { SebedimContext } from "../../context/Sebedim";
import tm from "../../lang/tm.json"
import ru from "../../lang/ru.json"
import "./hasabat.css";
import { axiosInstance } from "../../utils/axiosIntance";


const { RangePicker } = DatePicker;

const Hasabat = ()=>{

    const { dil } = useContext(SebedimContext);
    const [data,setData] = useState();
    const [mail,setMail] = useState(false);
    const [aralyk,setAralyk] = useState();

    const GetMonth = ()=>{
        message.success(dil==="tm"?tm.hasabat.AyynHasabatyAlyndy:ru.hasabat.AyynHasabatyAlyndy);
        getData();

    }

    const GetDay = ()=>{
        message.success(dil==="tm"?tm.hasabat.GununHasabatyAlyndy:ru.hasabat.GununHasabatyAlyndy);
        getData();
    }

    const GetDayInterval = (e)=>{
       if(e){ console.log("1-nji ",e[0]._d);
        console.log("2-nji ",e[1]._d);
        axiosInstance.post("admin/statistics/during",{
            from:e[0]._d,
            until:e[1]._d,
            email: mail,
        }).then((data)=>{
            setAralyk(data.data);
            console.log(data.data)
        }).catch((err)=>{
            console.log(err);
        })}
        
    }


    useEffect(()=>{
        getData()
    },[])

    const getGunler = ()=>{
        
    }
    const getData = ()=>{
        axiosInstance.get("admin/statistics").then((data)=>{
            setData(data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }
    return(
        <div className="hasbat-page">
            <div style={{height:"250px"}} className="hasabat-ay">
                <h1>{dil==="tm"?tm.hasabat.AýyňHasabaty:ru.hasabat.AýyňHasabaty}</h1>
                <h2>{data && data.month} {dil==="tm"?tm.hasabat.manat:ru.hasabat.manat}</h2>
                <h3>{dil==="tm"?tm.hasabat.ÄhliZakazlar:ru.hasabat.ÄhliZakazlar}: {data && data.monthOrders.all}</h3>
                <h3 style={{color:"green"}}>{dil==="tm"?tm.hasabat.GowşurlanZakazlar:ru.hasabat.GowşurlanZakazlar}: {data && data.monthOrders.done}</h3>
                <Button onClick={()=>GetMonth()} type="primary" shape="round">{dil==="tm"?tm.hasabat.Täzele:ru.hasabat.Täzele}</Button>
            </div>
            
            
            <div style={{height:"250px"}}  className="hasabat-ay">
                <h1>{dil==="tm"?tm.hasabat.GünüňHasabaty:ru.hasabat.GünüňHasabaty}</h1>
                <h2>{data && data.today} {dil==="tm"?tm.hasabat.manat:ru.hasabat.manat}</h2>
                <h3> {dil==="tm"?tm.hasabat.ÄhliZakazlar:ru.hasabat.ÄhliZakazlar}: {data && data.todayOrders.all}</h3>
                <h3 style={{color:"green"}}>{dil==="tm"?tm.hasabat.GowşurlanZakazlar:ru.hasabat.GowşurlanZakazlar}: {data && data.todayOrders.done}</h3>
                <Button onClick={()=>GetDay()} type="primary" shape="round">{dil==="tm"?tm.hasabat.Täzele:ru.hasabat.Täzele}</Button>
            </div>
            <div style={{height:"250px"}} className="hasabat-ay">
                <h1>{dil==="tm"?tm.hasabat.HepdäniňHasabaty:ru.hasabat.HepdäniňHasabaty}</h1>
                <h2>{data && data.week} {dil==="tm"?tm.hasabat.manat:ru.hasabat.manat}</h2>
                {/* <h3>Ähli Zakazlar: plança</h3> */}
                {/* <h3 style={{color:"green"}}>Gowşurlan zakazlar: plança</h3> */}
                <Button onClick={()=>GetMonth()} type="primary" shape="round">{dil==="tm"?tm.hasabat.Täzele:ru.hasabat.Täzele}</Button>

            </div>
            <div style={{height:"250px"}} className="hasabat-ay">
                <h1>{dil==="tm"?tm.hasabat.GünleriňAralygyHasabat:ru.hasabat.GünleriňAralygyHasabat}</h1>
                <h2>{aralyk && aralyk.stats} {dil==="tm"?tm.hasabat.manat:ru.hasabat.manat}</h2>
                <input style={{width:"15px",height:"15px"}} onChange={()=>setMail(!mail)} id="mail" type="checkbox"  />
                <label style={{fontSize:"20px",fontWeight:"450",marginLeft:"10px",marginBottom:"10px"}} for="mail"> {dil==="tm"?tm.hasabat.GmailUgratmalymy:ru.hasabat.GmailUgratmalymy} </label>
                <br></br>
                <RangePicker style={{marginTop:"10px"}}  onChange={(value)=>GetDayInterval(value)}  />
            </div>
        </div>
    )
}

export default Hasabat;