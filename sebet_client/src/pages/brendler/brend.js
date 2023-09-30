import React, { useContext, useEffect, useState } from "react";

import "./brend.css";
import BrendCard from "../../components/brend_card";
import Location from "../../components/location";

import {axiosInstance, BASE_URL} from "../../utils/axiosIntance";
import ProductComponent from "../products_components/productsComponents";
import { SebedimContext } from "../../context/Sebedim";
const Brend =(props)=>{

     const {dil} = useContext(SebedimContext);

     const [ data, setData] = useState([]);
     const [ brendPro, setBrendPro] = useState([]);
     const [ isClick, setIsClick ] = useState(false);

     useEffect(()=>{
          axiosInstance.get("/public/categories",{
               params:{
                    limit:10000
               }
          }).then((data)=>{
               setData(data.data);
             }).catch((err)=>{
               console.log(err);
             });
     },[])
     
     const getProducts = (brand_id)=>{
          setIsClick(true);
          setBrendPro(brand_id);
          // axiosInstance.get("/public/brands/products/"+brand_id).then((data)=>{
          //      console.log("gelen setBrendPro",data.data);
          //      setBrendPro(data.data);
          //    }).catch((err)=>{
          //      console.log("errrrorrrrr",err);
          //    });
          
         
     }
    
    return (
        <div className="brends_page">
            <div className="brend_location">
                { !isClick && <Location name={dil=="tm"?"Brendler":"Бренд"}  /> }
                { isClick && <Location name={dil=="tm"?"Brendler":"Бренд"}  name2="Products" nameClick={()=>setIsClick(false)} />}
            </div>

         {
            !isClick && data.map((dat)=>{
            
           return dat.category_brands && dat.category_brands[0] &&  <div className="brend_section" id="exclusive">
               <h2>{dil=="tm"?dat.category_name_tm:dat.category_name_ru} :</h2>
               <div className="brend-cards-container">
                    {
                    dat.category_brands.map((brend,i)=>{
                         console.log(brend)
                       return <div key={i} id={brend.brand_id} className="card_item">
                            {/* <h1>{brend.brand_name}</h1> */}
                                <BrendCard onClick={()=>getProducts(brend.brand_id)} name={dil=="tm"?brend.brand_name_tm:brend.brand_name_ru} src={BASE_URL+"/"+brend.brand_preview_image} />
                               </div>
                    })
                  
                   }
                   
               </div>
           </div>
                
               })

         }
         {
              isClick && <ProductComponent data={brendPro} />
         }
           

            {/* <div className="brend_section" id="bakja">
                <h2>Gök we bakja önümleri :</h2>
                <div className="brend-cards-container">
                    <div className="card_item">
                         <BrendCard name="Nescafe" src={hergun} />
                    </div>
                    <div className="card_item">
                         <BrendCard name="Nescafe" src={balgaymak} />
                    </div>
                    <div className="card_item">
                         <BrendCard name="Nescafe" src={sawat} />
                    </div>
                    <div className="card_item">
                         <BrendCard name="Nescafe" src={zamana} />
                    </div>
                    <div className="card_item">
                         <BrendCard name="Nescafe" src={hergun} />
                    </div>
                    <div className="card_item">
                         <BrendCard name="Nescafe" src={elin} />
                    </div>
                    <div className="card_item">
                         <BrendCard name="Nescafe" src={nescafe} />
                    </div>
                    
                </div>
            </div>

            <div className="brend_section" id="iymit">
                <h2>Iýmit önümleri :</h2>
                <div className="brend-cards-container">
                    <div className="card_item">
                         <BrendCard name="Nescafe" src={nescafe} />
                    </div>
                    <div className="card_item">
                         <BrendCard name="Nescafe" src={zamana} />
                    </div>
                    <div className="card_item">
                         <BrendCard name="Nescafe" src={hergun} />
                    </div>
                    <div className="card_item">
                         <BrendCard name="Nescafe" src={elin} />
                    </div>
                    <div className="card_item">
                         <BrendCard name="Nescafe" src={sawat} />
                    </div>
                    <div className="card_item">
                         <BrendCard name="Nescafe" src={hergun} />
                    </div>
                    <div className="card_item">
                         <BrendCard name="Nescafe" src={balgaymak} />
                    </div>
                    
                </div>
            </div>

            <div className="brend_section" id="hojalyk">
                <h2>Arassaçylyk we Hojalyk :</h2>
                <div className="brends">

                </div>
            </div>

            <div className="brend_section" id="sagsy">
                <h2>Şahsy gözellik we ideg :</h2>
                <div className="brends">

                </div>
            </div>

            <div className="brend_section" id="cagalar">
                <h2>Çagalar üçin serişdeler :</h2>
                <div className="brends">

                </div>
            </div>

            <div className="brend_section" id="tekstil">
                <h2>Tekstil önümleri :</h2>
                <div className="brends">

                </div>
            </div>

            <div className="brend_section" id="haywanlar">
                <h2>Öý haýwanlarynyň idegi :</h2>
                <div className="brends">

                </div>
            </div> */}

        </div>
    );
};

export default Brend;