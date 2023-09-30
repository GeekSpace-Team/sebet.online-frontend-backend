import React,{useContext, useEffect, useState} from 'react';

import {Select,Input,Button, message} from 'antd'
import "antd/dist/antd.css";
import { PlusCircleFilled,CloseCircleOutlined } from '@ant-design/icons';

import tm from "../../lang/tm.json"
import ru from "../../lang/ru.json"
import { SebedimContext } from "../../context/Sebedim";

import './SurujiYagdayy.css';
import TextArea from 'antd/lib/input/TextArea';
import { axiosInstance } from '../../utils/axiosIntance';

const Option = {Select};

const SurujiYagdayy = props =>{

  const { dil } = useContext(SebedimContext);
    
    const getProducts = props.getProducts
    const [brands,setBrands] = props.brands;
    const [ kategoriya, setKategoriya ] = props.kategoriya;
    const [subkategoriya,setSubkategoriya] = useState();
    console.log(brands);

    const [ brand_id , setBrand_id ] = useState();
    const [ kategoriya_id, setKategoriya_id] = useState();
    const [name_tm,setName_tm] = useState();
    const [name_ru,setName_ru] = useState();
    const [description_tm,setDescription_tm] = useState();
    const [description_ru,setDescription_ru] = useState();
    const [price, setPrice] = useState();
    const [ product_code,setProduct_code] = useState();
    const [ sany,setSany] = useState();
    const [price_old,setPrice_old] = useState();
    const [product_discount,setProduct_discount] = useState();
    const [tmt_price,setTmt_price] = useState();
    const [subcategory_id,setSubcategory_id] = useState(null);
    const [usd_price,setUsd_price] = useState();
    // creating product
    const CreateProduct = async()=>{
      
      axiosInstance.post("/admin/products/add",{
        product_code: product_code,
        product_name_tm: name_tm,
        product_name_ru: name_ru,
        product_description_tm: description_tm,
        product_description_ru: description_ru,
        product_price:price,
        product_price_old:price_old,
        product_price_tmt: tmt_price,
        product_price_usd: usd_price,
        product_discount: product_discount,
        isActive:true,
        category_id: kategoriya_id,
        subcategory_id:subcategory_id,
        brand_id: brand_id,
        stock: {
         stock_quantity: sany
        }
      }).then((data)=>{
        console.log(data.data);
        message.success("successfully");
        getProducts();
        setName_tm();
        setName_ru();
        setDescription_tm();
        setDescription_ru();
        setPrice();
        setProduct_code();
        setSany();
        setPrice_old();
        setProduct_discount();
        setTmt_price();
        setUsd_price();
      }).catch((err)=>{
        console.log(err);
      })
    
     
    }

    /// geting data from Api
    
 
  
     

      function onChangeM(value) {
        console.log(`selected ${value}`);
        setBrand_id(value);
      }
      function onSearchM(val) {
        console.log('search:', val);
      }
      function onChangeK(value) {
        console.log(`selected ${value}`);
        setKategoriya_id(value);
      }
      function onSearchK(val) {
        console.log('search:', val);
      }

      useEffect(()=>{
        const time = setTimeout(()=>{
            axiosInstance.get("admin/categories").then((data)=>{
              let newData = data.data.filter((dat)=>{
                return dat.category_id == kategoriya_id;
              })
              if(newData[0] && newData[0].category_subcategories){
              setSubkategoriya(newData[0].category_subcategories);
              console.log(newData[0].category_subcategories)
              }
            })
        },500)
        return ()=> clearTimeout(time);
      },[kategoriya_id])
     

    return (
        <div
            className='suruji-yagdayy'>
            <form className='suruji-yagdayy--form' >
            <Select
            className='suruji-yagdayy--input' 
            // className="yolHaty-gozle--input"
            showSearch
            // style={{ width: 200 }}
            placeholder={dil==="tm"?tm.products.BrandSaýla:ru.products.BrandSaýla}
            optionFilterProp="children"
            onChange={onChangeM}
            onSearch={onSearchM}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {
              brands.map((brand)=>{
                return <Option value={brand.brand_id}>{dil==="tm"?brand.brand_name_tm:brand.brand_name_ru}</Option>
              })
            }
          </Select>
          <Select
           className='suruji-yagdayy--input'
            // className="yolHaty-gozle--input"
            showSearch
            // style={{ width: 200 }}
            placeholder={dil==="tm"?tm.products.KategoriýaSaýla:ru.products.KategoriýaSaýla}
            onChange={onChangeK}
            onSearch={onSearchK}
          >
            {
              kategoriya.map((kategor)=>{
                return <Option value={kategor.category_id}>{dil==="tm"?kategor.category_name_tm:kategor.category_name_ru}</Option>
              })
            }
          </Select>

          <Select
           className='suruji-yagdayy--input'
            // style={{ width: 200 }}
            placeholder={dil==="tm"?tm.products.SubKategoriýaSaýla:ru.products.SubKategoriýaSaýla}
            onChange={(value)=>setSubcategory_id(value)}
          >
            {
             subkategoriya && subkategoriya.map((kategor)=>{
                return <Option value={kategor.subcategory_id}>{dil==="tm"?kategor.subcategory_name_tm:kategor.subcategory_name_ru}</Option>
              })
            }
          </Select>
         
           <Input value={name_tm} onChange={(e)=>{setName_tm(e.target.value)}} addonBefore={dil==="tm"?tm.products.ady_tm:ru.products.ady_tm}  className='suruji-yagdayy--input' />
           <Input value={name_ru} onChange={(e)=>{setName_ru(e.target.value)}} addonBefore={dil==="tm"?tm.products.ady_ru:ru.products.ady_ru}  className='suruji-yagdayy--input' />
           <Input value={description_tm} onChange={(e)=>{setDescription_tm(e.target.value)}} addonBefore={dil==="tm"?tm.products.Description_tm:ru.products.Description_tm}  className='suruji-yagdayy--input' />
           <Input value={description_ru} onChange={(e)=>{setDescription_ru(e.target.value)}} addonBefore={dil==="tm"?tm.products.Description_ru:ru.products.Description_ru}  className='suruji-yagdayy--input' />
           <Input value={product_code} onChange={(e)=>{setProduct_code(e.target.value)}} addonBefore={dil==="tm"?tm.products.Code:ru.products.Code}  className='suruji-yagdayy--input' />
           <Input value={sany} onChange={(e)=>{setSany(e.target.value)}} addonBefore={dil==="tm"?tm.products.Stock:ru.products.Stock}  className='suruji-yagdayy--input' />
           {/* <Input value={price} onChange={(e)=>{setPrice(e.target.value)}} addonBefore='Baha'  className='suruji-yagdayy--input' />
           <Input value={price_old} onChange={(e)=>{setPrice_old(e.target.value)}} addonBefore='öňki Baha'  className='suruji-yagdayy--input' /> */}
           <Input value={tmt_price} onChange={(e)=>{setTmt_price(e.target.value)}} addonBefore={dil==="tm"?tm.products.tmt_Baha:ru.products.tmt_Baha}  className='suruji-yagdayy--input' />
           {/* <Input value={tmt_price_old} onChange={(e)=>{setTmt_price_old(e.target.value)}} addonBefore='öňki tmt Baha'  className='suruji-yagdayy--input' /> */}
           <Input value={usd_price} onChange={(e)=>{setUsd_price(e.target.value)}} addonBefore={dil==="tm"?tm.products.usd_Baha:ru.products.usd_Baha}  className='suruji-yagdayy--input' />
           <Input value={product_discount} onChange={(e)=>{setProduct_discount(e.target.value)}} addonBefore={dil==="tm"?tm.products.PrasentSkitga:ru.products.PrasentSkitga}  className='suruji-yagdayy--input' />

                <div style={{width:"100%",display:"flex",justifyContent:"center"}}>
                <Button style={{width:"40%"}} onClick={CreateProduct} icon={<PlusCircleFilled/>} shape='round' type='primary' className='suruji-yagdayy--button'>{dil==="tm"?tm.products.Hasaba_al:ru.products.Hasaba_al}</Button>
                <Button style={{width:"40%"}} onClick={props.onClick} shape='round' danger type='primary' className='suruji-yagdayy--button'> {dil==="tm"?tm.products.Cancel:ru.products.Cancel} </Button>
                </div>
            </form>
        </div>
    );
};

export default SurujiYagdayy;