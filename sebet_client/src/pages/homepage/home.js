import React,{useState,useEffect, useContext} from "react";
import {Link, useHistory} from "react-router-dom";
import { Carousel } from "antd";
import "antd/dist/antd.css";
import {LeftOutlined,RightOutlined} from '@ant-design/icons';

import "./home.css";
// import Card from "../../components/card";
import CardGrid from "../../components/card_grid";
import Details from "../../components/product_details";
import img1 from "../../img/1.png";
import img2 from "../../img/2.png";
import img3 from "../../img/3.png";
import img4 from "../../img/4.png";
import right_arrow from "../../img/akar-icons_arrow-right.svg";
import Location from "../../components/location";
import {axiosInstance, BASE_URL} from "../../utils/axiosIntance";
import { SebedimContext } from "../../context/Sebedim";

const Home = (props)=>{
  const {dil} = useContext(SebedimContext);
  const history = useHistory()
  const [data,setData] = useState([]);
  const [banners,setBanners] = useState([]);
  const [product_details,setProduct_details] = useState(false);
  const [productDetail,setProductDetail] = useState([]);
  const [bannerPro,setBannerPro] = useState(false);
  
    

    useEffect(()=>{
      axiosInstance.get("/public/top-products").then((data)=>{
          console.log("home data::::",data.data.data.new_products);
           setData(data.data.data.new_products);
         }).catch((err)=>{
           console.log(err);
           console.log("errror")
         });
         getBanners();
 },[]);

 const getOneProduct = (product)=>{
  setProduct_details(true);
  setProductDetail(product);
  window.scroll(0,0);
}

const getBanners = ()=>{
  axiosInstance.get("public/banners").then((data)=>{
    setBanners(data.data);
    console.log("banners",data.data);
  }).catch((err)=>{
    console.log(err);
  })
}
const Push = (data)=>{
  history.push(data);
}

const SampleNext = props =>{
  const {className,style,onClick} = props
  return (
    <RightOutlined 
      style={{...style}}
      className={className}
      onClick={onClick}
    />
  )
}
const SamplePrev = props =>{
  const {className,style,onClick} = props
  return (
    <LeftOutlined 
      style={{...style}}
      className={className}
      onClick={onClick}
    />
  )
}

const settings = {
  nextArrow:<SampleNext/>,
  prevArrow:<SamplePrev/>
}

const BannerProduct = (e)=>{
    console.log(e);
    setData(e);
    setBannerPro(true)
}

const next = Carousel.next;
const prev = Carousel.prev;
    return(
      <React.Fragment>
        
     { product_details ? (null):( !bannerPro && <div className='home-carousel'>
       {/* <LeftOutlined onClick={()=>prev()} style={{position:"absolute",top:"30%",left:"15%",zIndex:"100",fontSize:"25px"}}/> */}
             <Carousel autoplay 
             arrows 
             >
                {banners.map((banner)=>{
                  return  <div onClick={()=>BannerProduct(banner.banner_products)} className='home-carousel'>
                        {/* <h3 className="contentStyle" style={contentStyle}>Halal önümleriň tagamynyň lezzetini duýuň</h3> */}
                        <img className="carouselImg" src={BASE_URL+"/"+banner.banner_image} alt="Banner Surat" />
                    </div>
                })}
              </Carousel>
              {/* <RightOutlined onClick={()=>console.log("right")} style={{position:"absolute",top:"30%",right:"15%",zIndex:"100",fontSize:"25px"}}/> */}
        </div>
     )}
     { product_details ? (null):(
       !bannerPro && <div className="hLocation">
          <h3><Link to="/arzanladyslar">{dil=="tm"?"Arzanladyşlar":"Скидки"}</Link></h3>
          <h4><Link to="/arzanladyslar">{dil=="tm"?"ählisini gör":"Просмотреть все"} <img alt="" src={right_arrow}/></Link> </h4>
        </div>
      )}  

      {
        product_details && 
        <div className="home_location">
          <Location name="Home" />
       </div>
      }

        {product_details &&
          <div className="product_details">
          <Details 
              id={productDetail.product_id}
              src={BASE_URL+"/"+productDetail.product_image}
              name={dil=="tm"?productDetail.product_name_tm:productDetail.product_name_ru}
              new_price={productDetail.product_price && productDetail.product_price}
              old_price={productDetail.product_price_old && productDetail.product_price_old} 
              description={dil=="tm"?productDetail.product_description_tm:productDetail.product_description_ru}
              product={productDetail}
               />
               
        <h1>{dil=="tm"?"Meňzeş harytlar":"Похожие товары"}</h1>
        </div>
        }




        <div className="cards-container">
            {/* <div className="card_item">
              <CardGrid
                onclick={()=>setProduct_details(true)}
                src={img1}
                skitga="10"
                name="Aşgabat Halal şöhlat"
                new_price="70"
                old_price="75"
              ></CardGrid>
            </div> */}
             { data.map((product,i)=>{
                console.log("product ::::::::::::::::::;",data)
               return <div className="card_item">
                      <CardGrid
                        onclick={()=>getOneProduct(product)}
                        src={BASE_URL+"/"+product.product_preview_image}
                        skitga={product.product_price_old && 100-(100*product.product_price/product.product_price_old)}
                        name={dil=="tm"?product.product_name_tm:product.product_name_ru}
                        new_price={product.product_price && product.product_price}
                        old_price={ product.product_price_old  && product.product_price_old}
                        product={product}
                      ></CardGrid>
                    </div>
            })
           }
        </div>
        
      </React.Fragment>
    );
};

export default Home;