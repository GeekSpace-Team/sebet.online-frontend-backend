import React, { useState,useContext, useEffect } from 'react';
import {Link, useHistory} from "react-router-dom";
import {SebedimContext} from "../context/Sebedim";

import { Select, Drawer, message, Menu } from "antd";
import "antd/dist/antd.css";
import {GlobalOutlined,UsergroupAddOutlined,LoginOutlined,UserOutlined,LogoutOutlined} from '@ant-design/icons';
import "./header.css";
import logo from "../img/logo.png";
import logo_litle from "../img/logo_icon_header_litle.svg";
import sebet_icon from "../img/sebet_icon.svg";
import { axiosInstance } from '../utils/axiosIntance';
import {logout} from "../utils/index";
const  {Fragment} = React;
// import search from "../img/header/search.svg";
const {Option} = Select;
const { SubMenu } = Menu;
const Header = (props)=>{
    const {sebedim,ChangeDil,dil} = useContext(SebedimContext);
    let sany=0;
    sebedim.map((haryt)=>{
            sany=sany+haryt.sany;
            return null;
    });
    
    
    const [menu,setMenu]=useState(false);
    const [kategories,setKategories] = useState([]);
    const [brands,setBrands] = useState();
    let   [user,setUser] = useState();
    const history = useHistory();

    const LogOut = ()=>{
        message.success(dil=="tm"?"Siz ulgamdan çykdyňyz":"Вы вышли из системы")
        logout();
        window.location.href="/";
    }


    useEffect(()=>{
        getKategory();
        getBrands();
        setUser(JSON.parse(localStorage.getItem("sebetProfile")));
    },[])

    const getKategory =()=>{
        axiosInstance.get("public/categories").then((data)=>{
            setKategories(data.data);
            console.log("kategory",data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }
    
    const getBrands =()=>{
        axiosInstance.get("public/brands",{
            params:{
                limit:9999
            }
        }).then((data)=>{
            setBrands(data.data);
            console.log("brands",data.data);
        }).catch((err)=>{
            console.log(err);
        })
    }

    const [forSearch,setForSearch] = useState();

    useEffect(()=>{
        let time = setTimeout(()=>{
                Gozle(forSearch);
        },500);
        return ()=>clearTimeout(time);
    },[forSearch])
    const Gozle = (e)=>{
        // setForSearch(e.targ;
            axiosInstance.get("public/products/search",{
                params:{
                    keyword:e,
                    limit:10000
                }
            }).then((data)=>{
                console.log(data.data);
                // setForSearch("");
                history.push({
                    pathname: '/products',
                    // search: '?query=abc',
                    state: { data: data.data,type:3,search:e }
                })
            }).catch((err)=>{
                console.log(err);
            })
    }


    const KategoryProduct = async(id)=>{
        setMenu(false);
        // console.log("id::",id);
        await axiosInstance.get("public/categories/products/"+id,{
            params:{
                limit:10000
            }
        }).then((data)=>{
            console.log("kategory Products",data.data);
            history.push({
                pathname: '/products',
                // search: '?query=abc',
                state: { data: data.data,id:id,type:1 }
            })
        }).catch((err)=>{
            console.log(err);
        });

        

        
    }
    const SubKategoryProduct = async(id)=>{
        console.log("sub",id)
        setMenu(false);
        await axiosInstance.get("/public/sub-categories/products/"+id,{
            params:{
                limit:10000
            }
        }).then((data)=>{
            console.log("kategory Products",data.data);
            history.push({
                pathname: '/products',
                // search: '?query=abc',
                state: { data: data.data,id:id,type:2 }
            });
        }).catch((err)=>{
            console.log(err);
        });
        
        
    }

    return (
        <div className="header">
            {menu && <Drawer 
            title={dil=="tm"? "Kategoriýalar":"Категории"}
            placement="left"
             width="80%" 
             visible={menu} 
             onClose={()=>setMenu(false)} > 
             {   kategories.map((kategory)=>{
                 
                    return <Menu
                            mode="inline"
                            // defaultSelectedKeys={["1"]}
                            // defaultOpenKeys={["sub1"]}
                            className="sidebar-left"
                        >
                        <SubMenu
                            key={kategory.id}
                            title={<span className="menuitem ">{dil=="tm"?kategory.category_name_tm:kategory.category_name_ru}</span>}
                          >
                              <Menu.Item style={{marginLeft:"-50px",width:"120%",height:"50px",paddingLeft:"50px"}} className="menuitem menuitem2" key={`ahli${kategory.id}`}>
                                <h2 onClick={()=>KategoryProduct(kategory.category_id)} style={{height:"50px",paddingTop:"0px",lineHeight:"50px"}}  className="menu_nav">{dil=="tm"?"Ählisi":"Все"} </h2>
                              </Menu.Item>
                              { kategory && kategory.category_subcategories && kategory.category_subcategories.map((sub)=>{
                                           return <Menu.Item style={{marginLeft:"-50px",width:"120%",height:"50px",paddingLeft:"50px"}} className="menuitem menuitem2" key={sub.id}>
                                                    <h2 onClick={()=>SubKategoryProduct(sub.subcategory_id)} style={{height:"50px",paddingTop:"0px",lineHeight:"50px"}}  className="menu_nav">{dil=="tm"?sub.subcategory_name_tm:sub.subcategory_name_ru} </h2>
                                                  </Menu.Item>
                              })
                            }
                        </SubMenu>
                    </Menu>
                })
            }


            </Drawer>}
            <div className="top-section">
            <button onClick={()=>setMenu(true)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <a href="/">
                <img id="bigLogo" alt="img" src={logo}  /></a>
                
                <ul>
                    { !user && <Fragment>
                     <li><Link to="/login"><LoginOutlined className="nav_icons" />{dil=="tm"? "Içeri gir" :"Войти"}</Link></li>
                    <li> <Link to="/signup"><UsergroupAddOutlined  className="nav_icons" />{dil=="tm"?"Agza bol":"Регистрация"}</Link></li>
                    </Fragment> }
                    { user && <Fragment>
                     <li><Link to="/profile"><UserOutlined className="nav_icons" />{dil=="tm"? "Hasabym" :"Мой аккаунт"}</Link></li>
                        <li onClick={()=>LogOut()}><Link to="/"><LogoutOutlined  className="nav_icons" />{dil=="tm"? "Çykmak" :"Выйти"}</Link>

                    </li>
                    </Fragment>
                    }
                    <li className="dildil" >
                        <GlobalOutlined className="nav_icons nav_dil_icon"  />
                        <Select onChange={(value)=>ChangeDil(value)} className="dil" defaultValue={dil=="tm" ? (dil=="tm"?"Türkmençe":"Туркмен") :(dil=="tm"?"Rusça":"Русский")}  bordered={false}>
                            <Option value="tm">{dil=="tm"?"Türkmençe":"Туркмен"}</Option>
                            <Option value="ru">{dil=="tm"?"Rusça":"Русский"}</Option>
                        </Select>
                    </li>
                </ul>
            </div>
            <div className="middle-section">
                <a href="/">
                <img id="smollLogo" alt="" src={logo_litle} />
                </a>
                <Link to="/sebet">
                <button className="nav-sebet" > 
                 {/* onClick={()=>window.location.assign("/sebet")} */}
                {sany===0 ? (null):(<span className="sebet-batch">{sany}</span>)}
                  <img alt="img" src={sebet_icon} style={{margin:"-5px 10px 0 0"}} />{dil=="tm"?"Sebet":"Корзина"}
               </button> 
                  </Link>

            </div>
            <div className="search-section">
              
               <div class="dropdown katigoriya">
                    <button class="dropbtn katigoriya" id="katigoriya">{dil=="tm"? "Kategoriýalar":"Категории"}</button>
                    <div class="dropdown-content">
                        
                            {   kategories.map((kategory)=>{
                               return  <div  className="arzanladysh">
                                 <p>{dil=="tm"?kategory.category_name_tm:kategory.category_name_ru}</p>
                                 <div className="arzanladysh-content">
                                 <div >
                                            <p onClick={()=>KategoryProduct(kategory.category_id)}  >{dil=="tm"?"Ählisi":"Все"}</p></div>
                                    { kategory && kategory.category_subcategories && kategory.category_subcategories.map((sub)=>{
                                           return  <div >
                                            <p onClick={()=>SubKategoryProduct(sub.subcategory_id)} style={{color:"#686d76"}} >{dil=="tm"?sub.subcategory_name_tm:sub.subcategory_name_ru}</p></div>
                                        
                                        })
                                        }
                                        
                                        
                                </div>
                                </div>
                                })
                            }
                            

                        {/* <div className="gokBakja">
                            <Link to="/">Gök we bakja önümleri</Link>
                            <div className="gokBakja-content">
                                    <div>
                                    <Link to="/">Arzanladyşdaky harytlar</Link></div>
                                    <div>
                                    <Link to="/">Aksiýadaky harytlar</Link></div>
                                    <div>
                                    <Link to="/">Sowgatlyk Paketler</Link></div>
                                    <div>
                                    <Link to="/">Täze harytlar</Link></div>
                            </div>
                        </div>
                        <div className="iymitOnumleri">
                            <Link to="/">Iýmit önümleri</Link>
                                <div className="iymitOnumleri-content">
                                            <div className="kofe">
                                                <Link to="/">Kofe we Kakao</Link>
                                                <div className="kofe-content">
                                                        <div>
                                                        <Link id="kofeLink" to="/">Tebigy ereýän kofeler</Link></div>
                                                        <div>
                                                        <Link id="kofeLink" to="/">Kiçi paket kofeler</Link></div>
                                                        <div>
                                                        <Link id="kofeLink" to="/">Tebigy däne kofeler</Link></div>
                                                        <div>
                                                        <Link id="kofeLink" to="/">Kakao içgileri</Link></div>
                                                </div>
                                            </div>
                                            <div className="keks">
                                                <Link to="/">Şokolad we keksler</Link>
                                                    <div className="keks-content">
                                                            <Link to="/">Plitgalar</Link>
                                                            <Link to="/">Batonçikler</Link>
                                                            <Link to="/">Keksler</Link>
                                                            <Link to="/">Krem Şokoladlar</Link>
                                                            <Link to="/">Çagalar üçin</Link>
                                                    </div>
                                            </div>
                                            <div>
                                                <Link to="/">Taýýar ertirlikler</Link>
                                            </div>
                                            <div>
                                                <Link to="/">Çörek we un önümleri</Link>
                                            </div>
                                            <div>
                                                <Link to="/">Sowgatlyk Paketler</Link>
                                            </div>
                                            <div>
                                            <   Link to="/">Ýumurtga, Bal, Süýt önümleri</Link>
                                            </div>
                                            <div>
                                                <Link to="/">Et we şöhlat önümleri</Link>
                                            </div>
                                            <div>
                                                <Link to="/">Bakaleýa</Link>
                                            </div>
                                            <div>
                                                <Link to="/">Konserwirlenen we doňdurylan iýmitler</Link>
                                            </div>
                                            <div>
                                                <Link to="/">Aşhana we Kulinariýa</Link>
                                            </div>
                                            <div>
                                                <Link to="/">Alkagolsyz içgiler</Link>
                                            </div>
                                            <div>
                                                <Link to="/">Doňdurma</Link>
                                            </div>
                                            <div>
                                                <Link to="/">Ketçup, Maýonez we Sous</Link>
                                            </div>
                                            <div>
                                                <Link to="/">Köke önümleri</Link>
                                            </div>
                                            <div>
                                                <Link to="/">Gury iýmişler</Link>
                                            </div>
                                            <div>
                                                <Link to="/">Suharikler, Çipsler</Link>
                                            </div>
                                            <div>
                                                <Link to="/">Süýjiler</Link>
                                            </div>
                                </div>
                        </div>
                        <div className="hojalyk">
                            <Link to="/">Arassacylyk we Hojalyk</Link>
                            <div className="hojalyk-content">
                                        <div className="kir">
                                            <Link to="/">Kir ýuwyjy serişdeler</Link>
                                                <div className="kir-content">
                                                        <Link to="/">Awtomat üçin</Link>
                                                        <Link to="/">Elde ýuwmak üçin</Link>
                                                        <Link to="/">Ýumşadyjylar</Link>
                                                        <Link to="/">Kire garşy serşdeler</Link>
                                                        <Link to="/">Agardyjylar</Link>
                                                </div>
                                        </div>
                                        <div className="kagyz">
                                            <Link to="/">Kagyz önümleri</Link>
                                                <div className="kagyz-content">
                                                        <Link to="/">Kagyz süpürjiler</Link>
                                                        <Link to="/">Hajathana kagyzlary</Link>
                                                        <Link to="/">Salfetkalar</Link>
                                                        <Link to="/">Çygly süpürgiçler</Link>
                                                </div>
                                        </div>
                                        <div className="sabyn">
                                            <Link to="/">Sabynlar</Link>
                                                <div className="sabyn-content">
                                                        <Link to="/">Adaty Sabynlar</Link>
                                                        <Link to="/">Suwuk Sabynlar</Link>
                                                </div>
                                        </div>
                                        <div>
                                            <Link to="/">Öý arassaçylygy</Link>
                                        </div>
                                        <div>
                                            <Link to="/">Aşhana üçin serişdeler</Link>
                                        </div>
                                        <div>
                                            <Link to="/">Hajathana üçin serişdeler</Link>
                                        </div>
                                        <div>
                                            <Link to="/">Awtoulag üçin serişdeler</Link>
                                        </div>
                                        <div>
                                            <Link to="/">Batareýler</Link>
                                        </div>
                                        <div>
                                            <Link to="/">Ýagtylandyryş</Link>
                                        </div>
                                        <div>
                                            <Link to="/">Paketler</Link>
                                        </div>
                            </div>
                        </div>
                        <div className="ideg">
                            <Link to="/">Şagsy gözellik we ideg</Link>
                            <div className="ideg-content"> 
                                    <div>
                                        <Link to="/">Kosmetika</Link>
                                    </div>
                                    <div className="sac">
                                        <Link to="/">Saç üçin serişdeler</Link>
                                            <div className="sac-content">
                                                <Link to="/">Zenanlar üçin Şampunlar</Link>
                                                <Link to="/">Erkekler üçin Şampunlar</Link>
                                                <Link to="/">Saç uçin Balzamlar</Link>
                                                <Link to="/">Saç üçin ideg Serişdeleri</Link>
                                                <Link to="/">Saç üçin timar Serişdeleri</Link>
                                                <Link to="/">Saç Boýaglary</Link>
                                            </div>
                                    </div>
                                    <div className="dis">
                                        <Link to="/">Diş saglygy we arassaçylygy</Link>
                                            <div className="dis-content">
                                                <Link to="/">Diş pastalary</Link>
                                                <Link to="/">Diş şýotgalary</Link>
                                                <Link to="/">Diş üçin ýüpler</Link>
                                                <Link to="/">Çaýkaýjylar</Link>
                                            </div>
                                    </div>
                                    <div>
                                        <Link to="/">Deri üçin ideglar</Link>
                                    </div>
                                    <div className="parfumeria">
                                        <Link to="/">Parfumeriýa</Link>
                                            <div className="parfumeria-content">
                                                <Link to="/">Zenanlar üçin</Link>
                                                <Link to="/">Erkekler üçin</Link>
                                                <Link to="/">Unisex</Link>
                                            </div>
                                    </div>
                                    <div className="dezodorant">
                                        <Link to="/">Dezodorant we Antiperspirant</Link>
                                            <div className="dezodorant-content">
                                                <Link to="/">Zenanlar üçin</Link>
                                                <Link to="/">Erkekler üçin</Link>
                                            </div>
                                    </div>
                                    <div className="dush">
                                        <Link to="/">Duş gelleri</Link>
                                            <div className="dush-content">
                                                <Link to="/">Zenanlar üçin</Link>
                                                <Link to="/">Erkekler üçin</Link>
                                            </div>
                                    </div>
                                    <div>
                                        <Link to="/">Sakgal syrmak üçin serişdeler</Link>
                                    </div>
                                    <div>
                                        <Link to="/">Pagtaly çöpler</Link>
                                    </div>
                                    <div>
                                        <Link to="/">Aýakgap üçin serişdeler</Link>
                                    </div> 
                                    <div>
                                        <Link to="/">Kalgotgalar</Link>
                                    </div>
                                    <div>
                                        <Link to="/">Prokladkalar we şagsy gigiýena</Link>
                                    </div>

                            </div>
                            
                        </div>
                        <div className="cagalar">
                            <Link to="/">Çagalar üçin serişdeler</Link>
                                <div className="cagalar-content">
                                    <div>
                                        <Link to="/">Çaga Arlyklary</Link>
                                    </div>
                                    <div>
                                        <Link to="/">Çaga Iýmitleri</Link>
                                    </div>
                                    <div>
                                        <Link to="/">Oýnawaçlar</Link>
                                    </div>
                                    <div className="iymitlendirme">
                                        <Link to="/">Iýmitlendirme serişdeleri</Link>
                                            <div className="iymitlendirme-content">
                                                <Link to="/">Iýmitlendirme çüýşeleri</Link>
                                                <Link to="/">Emzikler</Link>
                                                <Link to="/">Çüýşe emzikleri</Link>
                                            </div>
                                    </div>
                                    <div>
                                        <Link to="/">Çaga ideg serişdeleri</Link>
                                    </div>
                                    <div>
                                        <Link to="/">Çaga üçin çygly süpürgiçler</Link>
                                    </div>
                                    <div>
                                        <Link to="/">Eneler üçin serişdeleri</Link>
                                    </div>
                                    <div>
                                        <Link to="/">Çaga üçin pagtaly çöpler</Link>
                                    </div>
                                    <div>
                                        <Link to="/">Diş rahatlandyryjylary</Link>
                                    </div>
                                    <div>
                                        <Link to="/">Aksesuarlar</Link>
                                    </div>

                                </div>

                        </div>
                        <div className="tekstil">
                            <Link to="/">Tekstil Önümleri</Link>
                                <div className="tekstil-content">
                                    <div>
                                        <Link to="/">Polotensalar</Link>
                                    </div>
                                    <div>
                                        <Link to="/">Örtükler (Maskalar)</Link>
                                    </div>
                                    <div>
                                        <Link to="/">Egin-Eşik</Link>
                                    </div>
                                    <div>
                                        <Link to="/">Hojalyk harytlary</Link>
                                    </div>
                                </div>
                        </div>
                        <div className="haýwanlar">
                            <Link to="/">Öý haýwanlarynyň idegi</Link>
                                <div className="haywanlar-content">
                                    <div>
                                        <Link to="/">Pişik iýmitleri</Link>
                                    </div>
                                    <div>
                                        <Link to="/">Ideg serişdeleri</Link>
                                    </div>
                                </div>
                        </div> */}
                        
                    </div>
                </div>

               <Link to="/brends">
               <button id="brendler" className="brendler">
                   {dil=="tm"?"Brend":"Бренд"}
               </button>
               </Link>
              
               <input value={forSearch} onChange={(e)=>setForSearch(e.target.value)}  type="text" placeholder={dil=="tm"?"Haryt gözle":"Поиск товара"} />
               <Link to="/sebet">
               <button className="nav-sebet" id="search_sec_button">
               {/* onClick={()=>window.location.assign("/sebet")}  */}
                   {sany===0 ? (null):(<span className="sebet-batch">{sany}</span>)}
                  <img alt="img" src={sebet_icon} style={{margin:"-5px 10px 0 0"}} />{dil=="tm"?"Sebet":"Корзина" }
                  
               </button></Link>
            </div>
        </div>
    );
};

export default Header;
