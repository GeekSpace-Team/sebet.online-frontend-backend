import React, { useContext, useEffect, useState } from "react";

import "./profile.css";
import Location from "../../components/location";
import ProfileCard from "../../components/profileCard";
import { axiosInstance } from "../../utils/axiosIntance";
import { SebedimContext } from "../../context/Sebedim";


const Profile = (props)=>{

    const {dil} = useContext(SebedimContext);
    const [data,setData] = useState();

    useEffect(()=>{
        getData()
    },[])

const getData = ()=>{
    axiosInstance.get("users/my-orders").then((data)=>{
        console.log("my orders",data.data);
        setData(data.data);
    }).catch((err)=>{
        console.log(err);
    })
}
    return(
        <div className="profile-page">
            <Location name={dil=="tm"?"Sargytlarym":"Мои заказы"} />
            <div className="profile-cards">
               {data && data.map((sargyt)=>{
                   let status=""
                   status = sargyt.status==0?(dil=="tm"?"Garaşylýar":"Ожидал"):"";
                   status = sargyt.status==1?(dil=="tm"?"Taýýarlanylýar":"Готовый"):"";
                   status = sargyt.status==2?(dil=="tm"?"Gowşuryldy":"Доставленный"):"";
                   status = sargyt.status==-1?(dil=="tm"?"Goýbolsun":"Отпусти ситуацию"):"";
                 return  <ProfileCard 
                    sargyt_id={sargyt.order_id}
                    id={sargyt.id}
                    taryhy={sargyt.createdAt.slice(0,10)}
                    sany={sargyt.total_quantity}
                    jemi={sargyt.total_price}
                    yagdayy={sargyt.status==0?(dil=="tm"?"Garaşylýar":"Ожидал"):(sargyt.status==1?(dil=="tm"?"Taýýarlanylýar":"Готовый"):(sargyt.status==2?(dil=="tm"?"Gowşuryldy":"Доставленный"):(dil=="tm"?"Goýbolsun":"Отпусти ситуацию")))}
                    yagday={sargyt.status}
                    toleg={sargyt.payment_type==1?"Nagt":"Töleg terminaly"}
                />
            })
            }
                {/* <ProfileCard 
                    id="1524"
                    taryhy="28.02.2021"
                    sany="20"
                    jemi="200"
                    yagdayy="Taýýarlanylýar"
                    yagday="1"
                    toleg="Töleg terminaly"
                />
                <ProfileCard 
                    id="1524"
                    taryhy="28.02.2021"
                    sany="20"
                    jemi="200"
                    yagdayy="Goýbolsun"
                    yagday="-1"
                    toleg="Nagt"
                />
                <ProfileCard 
                    id="1524"
                    taryhy="28.02.2021"
                    sany="20"
                    jemi="200"
                    yagdayy="Garaşylýar"
                    yagday=""
                    toleg="Töleg terminaly"
                /> */}
            </div>
        </div>
    )
}

export default Profile;