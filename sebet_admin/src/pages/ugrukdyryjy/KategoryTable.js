import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Space, Modal, Input, Checkbox, Drawer, Popconfirm, message } from "antd";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined,PlusCircleOutlined } from "@ant-design/icons";

import tm from "../../lang/tm.json"
import ru from "../../lang/ru.json"

import "./yolHatyTable.css";
import axios from "axios";
import { axiosInstance,BASE_URL } from "../../utils/axiosIntance";
import { SebedimContext } from "../../context/Sebedim";

const YolHatyTable = (props) => {
  
  const { dil } = useContext(SebedimContext);
// geting all data from database with api
  const [data, setData] = props.data;
  const getData = props.getData;
  const getBrands = props.getBrands;
  const [brands, setBrands] = useState([]);

  const columns = [
    {
      title: dil==="tm"?tm.category.Number:ru.category.Number,
      dataIndex: "id",
    },
    
    {
      title:dil==="tm"?tm.category.KategoriýaAdy_tm:ru.category.KategoriýaAdy_tm,
      dataIndex: "category_name_tm",
    },
    {
      title:dil==="tm"?tm.category.KategoriýaAdy_ru:ru.category.KategoriýaAdy_ru,
      dataIndex: "category_name_ru",
    },
    {
      title: dil==="tm"?tm.category.GoşmaçaÖzgertmek:ru.category.GoşmaçaÖzgertmek,
      dataIndex: "goshmacha",
      render: (text, record) => (
        <Space size="middle">
          {/* <Button
            type="primary"
            shape="round"
            onClick={() => ShowModal(record)}
          >
            Goşmaça
          </Button> */}
          <Button
            type="primary"
            shape="round"
            onClick={() => ShowBrands(record)}
          >
            <PlusCircleOutlined />
          </Button>
          <Button
            type="primary"
            shape="round"
            onClick={() => ShowDrawer(record)}
          >
            <EditOutlined />
          </Button>
          
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => DeleteMarket(record)}
            // onCancel={cancel}
            okText={dil==="tm"?tm.category.Hawa:ru.category.Hawa}
            cancelText={dil==="tm"?tm.category.Yok:ru.category.Yok}
          >
             <Button
              type="primary"
              shape="round"
              danger
              // onClick={}
            >
              <DeleteOutlined />
            </Button>
          </Popconfirm>
            
         
        </Space>
      ),
    },
  ];

  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [ tel, setTel ] = useState(false);
  const [ img, setImg ] = useState(false);
  const [brandsShow,setBrandsShow] = useState(false);
  const [maglumat, setMaglumat] = useState([]);
  const [ phone, setPhone ] = useState([]);
  const [ newPhone, setNewPhone ] = useState();
  const [ name_tm, setName_tm ] = useState();
  const [ name_ru, setName_ru ] = useState();
  const [ name_en, setName_en ] = useState();
  const [ market , setMarket ] = useState();

  const [category_name_tm,setCategory_name_tm] = useState();
  const [category_name_ru,setCategory_name_ru] = useState();
  const [category_id,setCategory_id] = useState();
  /////////////////////////////////////////////////////
  
  ////////////////////////////////////////////////////
  const DeleteMarket = (event) => {
    let market_id=event.MarketId;
    axiosInstance.delete("/admin/categories/delete/"+event.category_id).then((data)=>{
      // console.log(data.data);
      message.success("successfully")
      getData();
      getBrands();
    }).catch((err)=>{
      console.log(err)
;    })
    console.log(event);
  };
 
  const ShowSurat = (event) => {
    setImg(!img);
    if(event){console.log("market:",event); setMarket(event)};
  };
  
  
  
  
  const ShowModal = (event) => {
    setVisible(!visible);
    console.log("goshmacha",event);
    setMaglumat([]);
    setMaglumat(event);
  };
  const ShowDrawer = async(event) => {
    setEdit(!edit);
    console.log(event);
    setMaglumat(event);
    if(event){
    setCategory_name_tm(event.category_name_tm);
    setCategory_name_ru(event.category_name_ru);
    setCategory_id(event.category_id); 
  }
    // if(event){
    //   await axiosInstance.get("admin/categories/"+event.category_id).then((data)=>{
    //     console.log(data.data);
    //     setMaglumat(data.data);
    //   }).catch((err)=>{
    //     console.log(err);
    //   })
    // }
  };

  const ShowBrands = async(event)=>{
    setBrandsShow(!brandsShow);
    setMaglumat(event);
    if(event){
      setCategory_id(event.category_id);
    }
    await axiosInstance.get("admin/brands").then((data)=>{
      setBrands(data.data);
    }).catch((err)=>{
      console.log(err);
    })
  }

  const inputChangeHandler = (event) => {
    console.log(event.target.name);
    let name = event.target.name;
    let value = event.target.value;

    setMaglumat({
      ...maglumat,
      [name]: value,
    });
  };
  
 
  
  const saveData = (event) => {
    console.log(event)
    axiosInstance.patch("/admin/categories/edit/"+category_id,{
      category_name_tm:category_name_tm,
      category_name_ru:category_name_ru,
    }).then((data)=>{
      console.log(data.data);
      message.success("successfully");
      getBrands()
      getData()
    }).catch((err)=>{
      console.log("errrorrr",err);
    })
  };

  const AddCategoryBrand =async(brand_id)=>{
    console.log("brand_id",brand_id);
    console.log("categori_id",category_id);
     axiosInstance.post("/admin/categories/add-brand/"+category_id,{
      brand_id:brand_id,
    }).then((data)=>{
      console.log(data.data);
      message.success("successfully!");
      getData()
    }).catch((err)=>{
      console.log(err);
    })
  }

  const DeleteCategoryBrand = async(brand_id)=>{
    console.log("brand_id",brand_id);
    console.log("categori_id",category_id);
    await axiosInstance.delete("/admin/categories/delete-brand",{
      params:{category_id:category_id,
              brand_id:brand_id,
            }
    }).then((data)=>{
      console.log(data.data);
      message.success("successfully!");
      getData();
    }).catch((err)=>{
      console.log(err);
    })
  }

  return (
    <div className="yolHatyTable">
     
      
      <Drawer
        width={500}
        className="lukman-table--drawer"
        title={dil==="tm"?tm.category.GoşmaçaÖzgertmek:ru.category.GoşmaçaÖzgertmek}
        placement="right"
        onClose={() => ShowDrawer()}
        visible={edit}
        footer={
          <div className="DrawerButtons">
            <Button
              className="DrawerButton"
              key="back"
              shape="round"
              danger
              type="primary"
              onClick={()=>ShowDrawer()}
            >
             {dil==="tm"?tm.category.GoýBolsun:ru.category.GoýBolsun}
            </Button>
            <Button
              className="DrawerButton"
              key="submit"
              shape="round"
              type="primary"
              onClick={()=>saveData(maglumat)}
            >
              {dil==="tm"?tm.category.Üýtget:ru.category.Üýtget} <EditOutlined />
            </Button>
          </div>
        }
      >
        <div className="yolHatyTable--uytgetmeler">
        <Input
            style={{ margin: "10px 0" }}
            addonBefore="Name tm"
            className="suruji-uytget--input"
            type="text"
            name={dil==="tm"?tm.category.KategoriýaAdy_tm:ru.category.KategoriýaAdy_tm}
            value={category_name_tm}
            onChange={(e)=>setCategory_name_tm(e.target.value)}
          />
          <Input
            style={{ margin: "10px 0" }}
            addonBefore="Name tm"
            className="suruji-uytget--input"
            type="text"
            name={dil==="tm"?tm.category.KategoriýaAdy_ru:ru.category.KategoriýaAdy_ru}
            value={category_name_ru}
            onChange={(e)=>setCategory_name_ru(e.target.value)}
          />
         <h2> {dil==="tm"?tm.category.CategoryBrands:ru.category.CategoryBrands} {maglumat && maglumat.category_name_tm && maglumat.category_name_tm}</h2>
          <table className="CategoryAdd">
          {
            maglumat  && maglumat.category_brands && maglumat.category_brands.map((brand)=>{
              return <tr>
                        <td className="CategoryName"> <h3>{brand.brand_name_tm}</h3></td>
                        <td className="CategoryButton"> <Popconfirm
                                    title="Are you sure to add this task?"
                                    onConfirm={() => DeleteCategoryBrand(brand.brand_id)}
                                    okText={dil==="tm"?tm.category.Hawa:ru.category.Hawa}
                                    cancelText={dil==="tm"?tm.category.Yok:ru.category.Yok}
                                  ><Button type="primary" shape="round" danger  > <DeleteOutlined /> </Button>
                                  </Popconfirm> 
                        </td>
                     </tr>
            })
          }
          </table>
          
        </div>
      </Drawer>

      <Drawer
        width={500}
        className="lukman-table--drawer"
        title={dil==="tm"?tm.category.BrandGoş:ru.category.BrandGoş}
        placement="right"
        onClose={() => ShowBrands()}
        visible={brandsShow}
        
      >
        <div className="yolHatyTable--uytgetmeler">
         
          
         <h2> {dil==="tm"?tm.category.CategoryBrands:ru.category.CategoryBrands} {maglumat && maglumat.category_name_tm && maglumat.category_name_tm}</h2>
          <table className="CategoryAdd">
          {
            brands  && brands.map((brand)=>{
              return <tr>
                        <td className="CategoryName"> <h3>{brand.brand_name_tm}</h3></td>
                        <td className="CategoryButton"> <Popconfirm
                                    title="Are you sure to add this task?"
                                    onConfirm={() => AddCategoryBrand(brand.brand_id)}
                                    okText={dil==="tm"?tm.category.Hawa:ru.category.Hawa}
                                    cancelText={dil==="tm"?tm.category.Yok:ru.category.Yok}
                                  ><Button type="primary" shape="round"  > <PlusCircleOutlined /> </Button>
                                  </Popconfirm> 
                        </td>
                     </tr>
            })
          }
          </table>
          
        </div>
      </Drawer>

      
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default YolHatyTable;
