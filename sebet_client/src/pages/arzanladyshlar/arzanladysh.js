import React, { useState,useEffect,useContext } from "react";
import {Link, useHistory} from "react-router-dom";
import { Select } from "antd";
import "antd/dist/antd.css";
import {HomeOutlined,RightOutlined} from '@ant-design/icons';
import { axiosInstance } from "../../utils/axiosIntance";
import {SebedimContext} from "../../context/Sebedim";
import "./arzanladysh.css";
import { BASE_URL } from "../../utils/axiosIntance";
// import Card from "../../components/card";
import CardGrid from "../../components/card_grid";
import Details from "../../components/product_details";
import img1 from "../../img/1.png";
import img2 from "../../img/2.png";
import img3 from "../../img/3.png";
import img4 from "../../img/4.png";
// import right_arrow from "../../img/akar-icons_arrow-right.svg";


const Option ={Select}
const Home = (props)=>{
  const {dil} = useContext(SebedimContext);
  const history = useHistory()
  const [data,setData] = useState([]);
  const [banners,setBanners] = useState([]);
  const [productDetail,setProductDetail] = useState([]);
    const [product_details,setProduct_details] = useState(false);
    const [brands,setBrands] = useState([]);
    const [brand,setBrand] = useState(null);
    const [sort,setSort] = useState(null);
   
    useEffect(()=>{
    brand==null &&  axiosInstance.get("/public/top-products",{
        params:{
          sort:sort
        }
      }).then((data)=>{
          console.log("home data::::",data.data.data.new_products);
           setData(data.data.data.new_products);
         }).catch((err)=>{
           console.log(err);
           console.log("errror")
         });
         
         getBrands();
         brand && sortBrands(brand);
 },[sort,brand]);
   

 

 const getBrands = ()=>{
  axiosInstance.get("public/brands").then((data)=>{
    setBrands(data.data);
  }).catch((err)=>{
    console.log(err);
  })
}

const sortBrands = async(id)=>{
  axiosInstance.get("public/brands/products/"+id,{
    params:{
      sort:sort
    }
  }).then((data)=>{
    setData(data.data);
  }).catch((err)=>{
    console.log(err);
  })
}

 const getOneProduct = (product)=>{
  setProduct_details(true);
  setProductDetail(product);
  window.scroll(0,0);
}

let manat = dil=="tm"?" manat":" манат";
    return(
      <React.Fragment>
        
        <div className="location">
          <a href="/" ><HomeOutlined /> </a>
          <h3> <RightOutlined /> </h3>
          <h3>{dil=="tm"?"Arzanladyşlar":"Скидки"}</h3>
        </div>

        { product_details===false ? <div className="filters">
            
            <Select className="brendler" style={{marginRight:"30px"}} 
            defaultValue= {dil=="tm"?'Brend saýla':"Выберите бренд"}
            onChange={(value)=>setBrand(value)}
            >
                {/* <Option key="2"  value={null}>{dil=="tm"?"Ählisi":"Все"}</Option> */}
                {brands && brands.map((brand)=>{
                   return  <Option key={brand.id} value={brand.brand_id}>{dil=="tm"?brand.brand_name_tm:brand.brand_name_ru}</Option> 
                })}
            </Select>

            <Select className="filter" defaultValue= {dil=="tm"?'Tertiplemek':"Упорядочить"}
            onChange={(value)=>setSort(value)}>
                <Option key="5"  value={null}>{dil=="tm"?"Hödürlenen tertipde":"По умолчанию"}</Option>
                <Option key="5"  value="0">{dil=="tm"?"Arzandan gymmada":"По возрастанию цены"}</Option>
                <Option key="5"  value="1">{dil=="tm"?"Gymmatdan arzana":"По убыванию цены"}</Option>
                
            </Select>
        </div> : null}
        {product_details &&
          <div className="product_details">
              <Details 
                 id={productDetail.product_id}
                 src={BASE_URL+"/"+productDetail.product_preview_image}
                 name={dil=="tm"?productDetail.product_name_tm:productDetail.product_name_ru}
                 new_price={productDetail.product_price && productDetail.product_price}
                 old_price={productDetail.product_price_old && productDetail.product_price_old} 
                 description={dil=="tm"?productDetail.product_description_tm:productDetail.product_description_ru}
                 product={productDetail}
                  />
                   
            <h1>{dil=="tm"?"Meňzeş harytlar":"Похожие товары"}</h1>
            </div>
        }
        {/* <div className="cards">
          <Card
          id="1"
          onclick={()=>setProduct_details(true)}
          src={img1}
          skitga="20"
          name="Aşgabat Halal şöhlat"
          new_price="70"
          old_price="75"
          ></Card>
           
        </div> */}
        <div className="cards-container">

        { data.map((product,i)=>{
                console.log("product ::::::::::::::::::;",data)
               return <div className="card_item">
                      <CardGrid
                        onclick={()=>getOneProduct(product)}
                        src={BASE_URL+"/"+product.product_preview_image}
                        skitga={product.product_price_old && 100-(100*product.product_price/product.product_price_old)}
                        name={dil=="tm"?product.product_name_tm:product.product_name_ru}
                        new_price={product.product_price && product.product_price}
                        old_price={product.product_price_old  && product.product_price_old}
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