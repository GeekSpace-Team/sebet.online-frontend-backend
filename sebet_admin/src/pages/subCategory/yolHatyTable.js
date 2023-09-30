import React, { useState, useEffect } from "react";
import { Table, Button, Space, Modal, Input, Checkbox, Drawer, Popconfirm, message } from "antd";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";

import "./yolHatyTable.css";
import axios from "axios";
import { axiosInstance,BASE_URL } from "../../utils/axiosIntance";

const YolHatyTable = (props) => {
  
// geting all data from database with api
  const data = props.data;
  const getData = props.getData;
console.log("data",data)
  const columns = [
    {
      title: "No",
      dataIndex: "id",
    },
    {
      title: "Brand Ady",
      dataIndex: "brand_name",
    },
    {
      title: "Brand Surat",
      dataIndex: "brand_preview_image",
      render:(text,record)=>(
        <img style={{width:"50px",height:"50px",objectFit:"contain"}} src={BASE_URL+"/"+record.brand_preview_image} alt="Brand Surat" />
      )
    },
    {
      title: "Goşmaça maglumat we Özgertmek",
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
             Surat 
          </Button>
            <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => DeleteMarket(record)}
            // onCancel={cancel}
            okText="Howwa"
            cancelText="Ýok"
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
      setMaglumat(event);
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
  const ShowTelefon = (event) => {
    setTel(!tel);
    setPhone([]);
    if(event){console.log("tel:",event); setPhone(event)};
  };
  const AddPhone = (event)=>{
    console.log(event,newPhone);
    let phoneNumbers=[];
    phoneNumbers.push(newPhone);
    axiosInstance.post("/api/market/phone/create/"+event,{
      phoneNumber:phoneNumbers
    }).then((data)=>{
      console.log(data.data);
      message.success(data.data.msg);
      let newp = phone;
      newp.PhoneNumbers.push(data.data.data);
      setPhone(newp);
      setNewPhone();
      getData()
    }).catch((err)=>{
      console.log(err);
    })
  }
  const ShowModal = (event) => {
    setVisible(!visible);
    console.log("goshmacha",event);
    setMaglumat([]);
    setMaglumat(event);
  };
  const ShowDrawer = async(event) => {
    setEdit(!edit);
    console.log(event)
    if(event){
    await axiosInstance.get("/admin/brands/"+event.brand_id).then((data)=>{
      setMaglumat(data.data);
      console.log("brand:",data.data)
    }).catch((err)=>{
      console.log(err);
    })
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
    axiosInstance.patch("admin/brands/edit/"+maglumat.brand_id,{
      brand_name:maglumat.brand_name,
    }).then((data)=>{
      console.log(data.data);
      message.success("successfully");
      getData();
    }).catch((err)=>{
      console.log(err);
    })
  };


  const DeleteBrandCategory = async(category_id,brand_id)=>{
    console.log("brand_id",brand_id);
    console.log("categoriya_id",category_id)
    await axiosInstance.delete("admin/brands/delete-category/"+brand_id,{
      category_id:category_id
    }).then((data)=>{
      console.log("oçurildi",data.data);
      message.success("Öçürildi!")
      // ShowDrawer(obj);
    }).catch((err)=>{
      console.log(err);
    })
  }
const AddBrandCategory = async(category_id,brand_id)=>{

  console.log(category_id,brand_id)
  axiosInstance.post("admin/brands/add-category/"+brand_id,{
    category_id:category_id
  }).then((data)=>{
    console.log(data.data);
    message.success("Goşuldy!");
  }).catch((err)=>{
    console.log(err);
  })
}
  return (
    <div className="yolHatyTable">
      
      <Drawer
        width={500}
        className="lukman-table--drawer"
        title="Category aýyr"
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
              Goý bolsun
            </Button>
            <Button
              className="DrawerButton"
              key="submit"
              shape="round"
              type="primary"
              onClick={()=>saveData(maglumat)}
            >
              Üýtget <EditOutlined />
            </Button>
          </div>
        }
      >
        <div className="yolHatyTable--uytgetmeler">
         
          <Input
            style={{ marginRight: "20px" }}
            addonBefore="Brand ady"
            className="suruji-uytget--input"
            type="text"
            name="brand_name"
            value={maglumat && maglumat.brand_name}
            onChange={inputChangeHandler}
          />
          <h2>Brand Categories</h2>
          <table className="CategoryAdd">
          {
            maglumat && maglumat.brand_categories && maglumat.brand_categories.map((category)=>{
              return <tr>
                        <td className="CatagoryName"> <h3>{category.category_name}</h3></td>
                        <td className="CatagoryButton"> <Popconfirm
                                    title="Are you sure to delete this task?"
                                    onConfirm={() => DeleteBrandCategory(category.category_id,maglumat.brand_id)}
                                    okText="Howa"
                                    cancelText="Ýok"
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
        title="Category goş"
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
              Goý bolsun
            </Button>
            <Button
              className="DrawerButton"
              key="submit"
              shape="round"
              type="primary"
              onClick={()=>saveData(maglumat)}
            >
              Üýtget <EditOutlined />
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
          <h2>Brand Categories {maglumat.brand_name}</h2>
          <table className="CategoryAdd">
          {
            category  && category.map((category)=>{
              return <tr>
                        <td className="CategoryName"> <h3>{category.category_name}</h3></td>
                        <td className="CategoryButton"> <Popconfirm
                                    title="Are you sure to add this task?"
                                    onConfirm={() => AddBrandCategory(category.category_id,maglumat.brand_id)}
                                    okText="Howa"
                                    cancelText="Ýok"
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
        title="Üýtgetmeler"
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
              Üýtget
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
