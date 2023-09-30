import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Space, Modal, Input, Checkbox, Drawer, Popconfirm, message } from "antd";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";

import { SebedimContext } from "../../context/Sebedim";
import tm from "../../lang/tm.json"
import ru from "../../lang/ru.json"

import "./yolHatyTable.css";
import axios from "axios";
import { axiosInstance,BASE_URL } from "../../utils/axiosIntance";

const YolHatyTable = (props) => {
  
  const { dil } = useContext(SebedimContext);
// geting all data from database with api
  const data = props.data;
  const getData = props.getData;
console.log("data",data)
  const columns = [
    {
      title:dil==="tm"?tm.brand.Nomber:ru.brand.Nomber,
      dataIndex: "id",
    },
    {
      title:dil==="tm"?tm.brand.BrandAdy_tm:ru.brand.BrandAdy_tm,
      dataIndex: "brand_name_tm",
    },
    {
      title:dil==="tm"?tm.brand.BrandAdy_ru:ru.brand.BrandAdy_ru,
      dataIndex: "brand_name_ru",
    },
    {
      title:dil==="tm"?tm.brand.BrandSurat:ru.brand.BrandSurat,
      dataIndex: "brand_preview_image",
      render:(text,record)=>(
        <img style={{width:"50px",height:"50px",objectFit:"contain"}} src={BASE_URL+"/"+record.brand_preview_image} alt="Brand Surat" />
      )
    },
    {
      title:dil==="tm"?tm.brand.GoşmaçaÖzgertmek:ru.brand.GoşmaçaÖzgertmek,
      dataIndex: "goshmacha",
      render: (text, record) => (
        <Space size="middle">
          
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
          
          <Button
            type="primary"
            shape="round"
            onClick={() => ShowSurat(record)}
          >
             {dil==="tm"?tm.brand.Surat:ru.brand.Surat}
          </Button>
            <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => DeleteMarket(record)}
            // onCancel={cancel}
            okText={dil==="tm"?tm.brand.Hawa:ru.brand.Hawa}
            cancelText={dil==="tm"?tm.brand.Yok:ru.brand.Yok}
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
  const [ addCategory,setAddCategory] = useState(false);
  const [category,setCategory] = useState([])
  const [maglumat, setMaglumat] = useState([]);
  const [ phone, setPhone ] = useState([]);
  const [ newPhone, setNewPhone ] = useState();
  const [ sur, setSur ] = useState();
  const [ market , setMarket ] = useState();
  const [ address_tm, setAddres_tm ] = useState();
  const [ address_ru, setAddres_ru ] = useState();
  const [ address_en, setAddres_en ] = useState();
  const [ description_tm, setDescription_tm ] = useState();
  const [ description_ru, setDescription_ru ] = useState();
  const [ description_en, setDescription_en ] = useState();

  const [brand_name_ru,setBrand_name_ru]=useState();
  const [brand_name_tm,setBrand_name_tm]=useState();
  const [brand_id,setBrand_id ] = useState();

  /////////////////////////////////////////////////////
  
  ////////////////////////////////////////////////////
  const DeleteMarket = (event) => {
    axiosInstance.delete("/admin/brands/delete/"+event.brand_id).then((data)=>{
      console.log(data.data);
      message.success(data.data.msg)
      getData();
    }).catch((err)=>{
      console.log(err)
;    })
    console.log(event);
  };
  const DeleteTel = (event) => {
    axiosInstance.delete("/api/market/phone/delete/"+event).then((data)=>{
      console.log(data.data);
      message.success(data.data.msg)
      getData();
      let phoneState = phone;
      let galany = phone.PhoneNumbers.filter((tel)=>{
        return tel.id !== event
      })
      phoneState.PhoneNumbers = galany;
      setPhone(phoneState);
    }).catch((err)=>{
      console.log(err)
;    })
    console.log(event);
  };
  const ShowSurat = (event) => {
    setImg(!img);
    if(event){console.log("market:",event); setMarket(event)};
  };

  const ShowBrands = async(event)=>{
    if(event){
      setBrand_id(event.brand_id);
    }
    setAddCategory(!addCategory);
      await axiosInstance.get("admin/categories").then((data)=>{
        console.log(data.data);
        setCategory(data.data);
      }).catch(err=>{
        console.log(err);
      })
  }

  const UpdateSurat = async(e)=>{
    console.log("eee::",e,sur)

    const toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      });

      let newImg = {
            img_name:sur.name,
            img:await toBase64(sur)
          }
       

      axiosInstance.post("/admin/brands/upload-image/"+e.brand_id,{
       photo: newImg
      })
      .then((data)=>{
        console.log(data.data);
          let oldmarket = market;
          oldmarket.brand_preview_image = data.data.brand_preview_image;
          let e={brand_preview_image:data.data.brand_preview_image}
          ShowSurat(e);
          setMarket(oldmarket);
          getData();
      })
      .catch((err)=>{
        console.log(err)
      })
      

  }
  const ImgChangeHandler = (e)=>{
    setSur(e.target.files[0]);
  }
  
  
  
  const ShowDrawer = async(event) => {
    setEdit(!edit);
    console.log(event)
    if(event){
      setBrand_name_ru(event.brand_name_ru)
      setBrand_name_tm(event.brand_name_tm);
      setMaglumat(event.brand_categories);
      setBrand_id(event.brand_id);
       }
     
  };
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
    console.log(event);
    setEdit(false);
    axiosInstance.patch("admin/brands/edit/"+brand_id,{
      brand_name_tm:brand_name_tm,
      brand_name_ru:brand_name_ru,
    }).then((data)=>{
      console.log(data.data);
      message.success("successfully");
      getData();
    }).catch((err)=>{
      console.log(err);
    })
  };


  const DeleteBrandCategory = async(category_id)=>{
    console.log("brand_id",brand_id);
    console.log("categoriya_id",category_id)
    await axiosInstance.delete("admin/brands/delete-category",{
      params:{ brand_id:brand_id,
        category_id:category_id}
    }).then((data)=>{
      console.log("oçurildi",data.data);
      message.success("Öçürildi!");
      getData();
      // ShowDrawer(obj);
    }).catch((err)=>{
      console.log(err);
    })
  }
const AddBrandCategory = async(category_id)=>{

  console.log("category_id",category_id)
  console.log("brand_id",brand_id)

  axiosInstance.post("admin/brands/add-category/"+brand_id,{
    category_id:category_id
  }).then((data)=>{
    console.log(data.data);
    message.success("Goşuldy!");
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
        title={dil==="tm"?tm.brand.CategoryAýyr:ru.brand.CategoryAýyr}
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
              {dil==="tm"?tm.brand.GoýBolsun:ru.brand.GoýBolsun}
            </Button>
            <Button
              className="DrawerButton"
              key="submit"
              shape="round"
              type="primary"
              onClick={()=>saveData(maglumat)}
            >
             {dil==="tm"?tm.brand.Üýtget:ru.brand.Üýtget} <EditOutlined />
            </Button>
          </div>
        }
      >
        <div className="yolHatyTable--uytgetmeler">
         
          <Input
            style={{ margin: "10px" }}
            addonBefore={dil==="tm"?tm.brand.BrandAdy_tm:ru.brand.BrandAdy_tm}
            className="suruji-uytget--input"
            type="text"
            name="brand_name"
            value={brand_name_tm}
            onChange={(e)=>setBrand_name_tm(e.target.value)}
          />
          <Input
            style={{ margin: "10px" }}
            addonBefore={dil==="tm"?tm.brand.BrandAdy_ru:ru.brand.BrandAdy_ru}
            className="suruji-uytget--input"
            type="text"
            name="brand_name"
            value={brand_name_ru}
            onChange={(e)=>setBrand_name_ru(e.target.value)}
          />
          <h2> {dil==="tm"?tm.brand.BrandCategories:ru.brand.BrandCategories} </h2>
          <table className="CategoryAdd">
          {
            maglumat && maglumat.map((category)=>{
              return <tr>
                        <td className="CatagoryName"> <h3>{category.category_name_tm}</h3></td>
                        <td className="CatagoryButton"> <Popconfirm
                                    title="Are you sure to delete this task?"
                                    onConfirm={() => DeleteBrandCategory(category.category_id)}
                                    okText={dil==="tm"?tm.brand.Hawa:ru.brand.Hawa}
                                    cancelText={dil==="tm"?tm.brand.Yok:ru.brand.Yok}
                                  ><Button type="primary" shape="round" danger > <DeleteOutlined /> </Button>
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
        title={dil==="tm"?tm.brand.CategoryGoş:ru.brand.CategoryGoş}
        placement="right"
        onClose={() => ShowBrands()}
        visible={addCategory}
        footer={
          <div className="DrawerButtons">
            <Button
              className="DrawerButton"
              key="back"
              shape="round"
              danger
              type="primary"
              onClick={()=>ShowBrands()}
            >
              {dil==="tm"?tm.brand.GoýBolsun:ru.brand.GoýBolsun}
            </Button>
            <Button
              className="DrawerButton"
              key="submit"
              shape="round"
              type="primary"
              onClick={()=>saveData(maglumat)}
            >
              {dil==="tm"?tm.brand.Üýtget:ru.brand.Üýtget} <EditOutlined />
            </Button>
          </div>
        }
      >
        <div className="yolHatyTable--uytgetmeler">
         
          {/* <Input
            style={{ marginRight: "20px" }}
            addonBefore="Brand ady"
            className="suruji-uytget--input"
            type="text"
            name="name_tm"
            value={maglumat && maglumat.brand_name}
            onChange={inputChangeHandler}
          /> */}
          <h2>{dil==="tm"?tm.brand.BrandCategories:ru.brand.BrandCategories} {maglumat && maglumat.brand_name_tm && maglumat.brand_name_tm}</h2>
          <table className="CategoryAdd">
          {
            category  && category.map((category)=>{
              return <tr>
                        <td className="CategoryName"> <h3>{category.category_name_tm}</h3></td>
                        <td className="CategoryButton"> <Popconfirm
                                    title="Are you sure to add this task?"
                                    onConfirm={() => AddBrandCategory(category.category_id)}
                                    okText={dil==="tm"?tm.brand.Hawa:ru.brand.Hawa}
                                    cancelText={dil==="tm"?tm.brand.Yok:ru.brand.Yok}
                                  ><Button type="primary" shape="round"  > <PlusCircleOutlined /> </Button>
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
        title={dil==="tm"?tm.brand.GoşmaçaÖzgertmek:ru.brand.GoşmaçaÖzgertmek}
        placement="right"
        onClose={() => ShowSurat()}
        visible={img}
        
      >
        <div className="yolHatyTable--uytgetmeler">
        <div style={{width:"100%",display:"inline-flex",justifyContent:"space-between"}}>
           <input
               className="suruji-uytget--input"
               style={{width:"80%"}}
               type="file"
               onChange={(e)=>ImgChangeHandler(e)}
             />
              <Button
              type="primary"
              shape="round"
              onClick={()=>UpdateSurat(market)}

            >
              {dil==="tm"?tm.brand.Üýtget:ru.brand.Üýtget}
            </Button>
            </div>
         {market &&  <img src={BASE_URL+"/"+market.brand_preview_image} alt="Brand Surat" style={{width:"450px",height:"500px",objectFit:"contain"}} />}
          
        </div>
      </Drawer>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default YolHatyTable;
