import React,{useContext, useEffect, useState} from 'react';

import {Button,Input,Drawer,Select} from 'antd';
import "antd/dist/antd.css";
import { SearchOutlined,PlusCircleFilled } from '@ant-design/icons';

import tm from "../../lang/tm.json"
import ru from "../../lang/ru.json"
import { SebedimContext } from "../../context/Sebedim";

import LukmanFilter from './lukmanFilter'; 
import SurujiYagdayy from './SurujiYagdayy';
import LukmanSanawTable from './LukmanSanawTableGizli';
import  './lukman.css';
import { axiosInstance } from '../../utils/axiosIntance';

const {Option} = Select;

const Lukman = () =>{

    const { dil } = useContext(SebedimContext);
    const [ brands,setBrands] = useState([]);
    const [ kategoriya, setKategoriya] = useState([]);
    const [ products, setProducts] = useState([]);
    const [all,setAll] = useState(null);
    const [kategor,setKategor] = useState(null);
    const [brand_id,setBrand_id] = useState(null);

    useEffect(()=>{
        getBrands();
        getKategoriyas();
    },[])

    useEffect(()=>{
        getProducts();
    },[all,kategor,brand_id])
    const getProducts = ()=>{
        axiosInstance.get("/admin/products/non-active",{
            params:{
                keyword:all,
                categoryId:kategor,
                brandId:brand_id,
                limit:1000,
            }
        }).then((data)=>{
                console.log(data.data);
                setProducts(data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const getBrands = ()=>{
        axiosInstance.get("/admin/brands").then((data)=>{
            console.log(data.data);
            setBrands(data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const getKategoriyas = ()=>{
        axiosInstance.get("/admin/categories").then((data)=>{
            console.log(data.data);
            setKategoriya(data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }
    const [Gosh,setGosh]=useState(false);
    const [state,setState] = useState(false)
    const GoshButton = ()=>{
        setState(true);
            setGosh(true);
            console.log(Gosh);
    }
    const Close=()=>{
        setState(false)
        setGosh(false);
         }
    
    return(
        <div className="lukman">
             {/* <div className='lukman--top'>
                <h2 className="lukman--header">Lukman Gözegçiligi</h2>
                <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman--gosh'>Hasaba Al</Button>
            </div> */}
            <Drawer
            width={600}
            className='lukman-gosh--drawer'
            title={dil==="tm"?tm.products.HarytGoş:ru.products.HarytGoş}
            placement="right"
            onClose={()=>Close()}
            visible={state}
            >
            <SurujiYagdayy getProducts={getProducts} brands={[ brands,setBrands]} kategoriya={[kategoriya,setKategoriya]} onClick={Close}/>
            </Drawer>
            
             <div className='lukman--gozleg'>
             <div className='lukman-gozleg'>
            <form className='lukman-gozleg--form'>
                <div>
                <Input value={all} onChange={(e)=>setAll(e.target.value)} placeholder={dil==="tm"?tm.products.UmumyGözleg:ru.products.UmumyGözleg} className='lukman-gozleg--input' />
                <Select onChange={(value)=>setKategor(value)} placeholder={dil==="tm"?tm.products.KategoriýaSaýla:ru.products.KategoriýaSaýla} className='lukman-gozleg--input'>
                    <Option value={null}>{dil==="tm"?tm.products.Ählisi:ru.products.Ählisi}</Option>
                    {
                        kategoriya && kategoriya.map((kat)=>{
                            return <Option value={kat.id}>{dil==="tm"?kat.category_name_tm:kat.category_name_ru}</Option>
                        })
                    }
                </Select>
                <Select onChange={(value)=>setBrand_id(value)} placeholder={dil==="tm"?tm.products.BrandSaýla:ru.products.BrandSaýla} className='lukman-gozleg--input'>
                    <Option value={null}>{dil==="tm"?tm.products.Ählisi:ru.products.Ählisi}</Option>
                        {
                            brands && brands.map((brand)=>{
                                return <Option value={brand.id}>{dil==="tm"?brand.brand_name_tm:brand.brand_name_ru}</Option>
                            })
                        }
                </Select>
                </div>
                <div>
                <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='lukman-gozleg--button'> {dil==="tm"?tm.products.HarytGoş:ru.products.HarytGoş} </Button>

                </div>
                </form>
            
        </div>
            </div>
            <div className='lukman-Table'>
                <LukmanSanawTable data={[ products, setProducts]} getProducts={getProducts} />
            </div>
        </div>
    );
};

export default Lukman; 