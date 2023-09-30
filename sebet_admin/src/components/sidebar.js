import React, { useContext, useState } from "react";
import "./sidebar.css";
import { logout } from "../utils";
// import logo_ from "../../img/logo_.svg";
// import logo from "../../img/logo.svg";
import { Layout, Menu, Tooltip } from "antd";
import { Link } from "react-router-dom";
import {
  NotificationOutlined,
  RiseOutlined,
  SettingOutlined,
  DashboardOutlined,
  LogoutOutlined,
  HeartFilled,
  ScheduleOutlined,
  CarOutlined,
  ToolOutlined,
  FileTextOutlined,FileImageOutlined,HomeOutlined
} from "@ant-design/icons";
import tm from "../lang/tm.json";
import ru from "../lang/ru.json";
import { SebedimContext } from "../context/Sebedim";

const { SubMenu } = Menu;
const { Sider } = Layout;

  const SiderDemo = ()=> {
  
const [collapsed,setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

   
    const {dil} = useContext(SebedimContext);

    return (
      // <div>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0,
        }}
        className="Sider"
        width={220}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        {/* <div
          className="toggle"
          
        >
          {React.createElement(
            this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: this.toggle,
            }
          )}
        </div> */}
        <div align="center">
          {collapsed ? (
            <Tooltip color="green" placement="right" title="Open">
              {/* <img
                onClick={this.toggle}
                className="logo"
                src={logo}
                alt="logo"
              /> */}
              <div onClick={toggle} className="logo">
                Sebet
              </div>
            </Tooltip>
          ) : (
            <Tooltip color="green" placement="right" title="Close">
              <div onClick={toggle} className="logo">
                Sebet Market
              </div>
            </Tooltip>
          )}
        </div>
        <Menu
          mode="inline"
          // defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          className="sidebar-left"
        >
          {/* 1  Dashboard   */}
          <SubMenu
            key="sub1"
            title={
              <span>
                <DashboardOutlined />
                <span className="menuitem ">{dil==="tm"?tm.sidebar.zakazlar:ru.sidebar.zakazlar}</span>
              </span>
            }
          >
            <Menu.Item className="menuitem menuitem2" key="taze">
              <Link to="/newOrders">{dil==="tm"?tm.sidebar.tazeZakazlar:ru.sidebar.tazeZakazlar}</Link>
            </Menu.Item>
            <Menu.Item className="menuitem menuitem2" key="1">
              <Link to="/orders">{dil==="tm"?tm.sidebar.zakazlar:ru.sidebar.zakazlar}</Link>
            </Menu.Item>
            <Menu.Item className="menuitem menuitem2" key="gowshurylan">
              <Link to="/doneOrders">{dil==="tm"?tm.sidebar.gowshurylan:ru.sidebar.gowshurylan}</Link>
            </Menu.Item>
            <Menu.Item className="menuitem menuitem2" key="canceled">
              <Link to="/delOrders">{dil==="tm"?tm.sidebar.yatyrylan:ru.sidebar.yatyrylan}</Link>
            </Menu.Item>
            <Menu.Item className="menuitem menuitem2" key="2">
              <Link to="/hasabat">{dil==="tm"?tm.sidebar.hasabat:ru.sidebar.hasabat}</Link>
            </Menu.Item>
            {/* <Menu.Item className="menuitem menuitem2" key="3">
              <Link to="#">Hereketler</Link>
            </Menu.Item> */}
          </SubMenu>

          {/* 2  Ugrukdyryjy   */}
          <SubMenu
            key="sub8"
            title={
              <span className="menuitem">
                <FileTextOutlined />
                <span>{dil==="tm"?tm.sidebar.brandKategoriya:ru.sidebar.brandKategoriya}</span>
              </span>
            }
          >
            <Menu.Item className="menuitem menuitem2" key="17">
            <Link to="brands">{dil==="tm"?tm.sidebar.brand:ru.sidebar.brand}</Link>
            </Menu.Item>
            <Menu.Item className="menuitem menuitem2" key="18">
            <Link to="marketCategory">{dil==="tm"?tm.sidebar.Kategoriýalar:ru.sidebar.Kategoriýalar}</Link>
            </Menu.Item>
            <Menu.Item className="menuitem menuitem2" key="88">
            <Link to="subCategory">{dil==="tm"?tm.sidebar.SubKategoriýalar:ru.sidebar.SubKategoriýalar}</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span className="menuitem">
                <ScheduleOutlined />
                <span>{dil==="tm"?tm.sidebar.Harytlar:ru.sidebar.Harytlar}</span>
              </span>
            }
          >
            <Menu.Item className="menuitem menuitem2" key="5">
            <Link to="products">{dil==="tm"?tm.sidebar.Harytlar:ru.sidebar.Harytlar}</Link>
            </Menu.Item>
            <Menu.Item className="menuitem menuitem2" key="4">
            <Link to="gizliHaryt">{dil==="tm"?tm.sidebar.GizliHarytlar:ru.sidebar.GizliHarytlar}</Link>
            </Menu.Item>            
          </SubMenu>

          <SubMenu
            key="sub3"
            title={
              <span className="menuitem">
                <FileImageOutlined /> 
                <span>{dil==="tm"?tm.sidebar.Sliderler:ru.sidebar.Sliderler}</span>
              </span>
            }
          >
            <Menu.Item className="menuitem menuitem2" key="6">
              <Link to="/sliders" >{dil==="tm"?tm.sidebar.Sliderler:ru.sidebar.Sliderler}</Link>
            </Menu.Item>
            {/* <Menu.Item className="menuitem menuitem2" key="7">
               <Link to="/busses">Awtobuslar</Link>
            </Menu.Item> */}
          </SubMenu>

          {/* <SubMenu
            key="sub4"
            title={
              <span className="menuitem">
                <ToolOutlined />
                <span>Favourites</span>
              </span>
            }
          >
            <Menu.Item className="menuitem menuitem2" key="9">
              <Link to='mehanik'> Favourites </Link>
            </Menu.Item> */}
            {/* <Menu.Item className="menuitem menuitem2" key="8">
              <Link to='mehanik_sanaw'>Sanaw</Link>
            </Menu.Item>             */}
          {/* </SubMenu> */}

          <SubMenu
            key="sub9"
            title={
              <span className="menuitem">
               <HomeOutlined />
                <span>{dil==="tm"?tm.sidebar.Config:ru.sidebar.Config}</span>
              </span>
            }
          >
            {/* <Menu.Item className="menuitem menuitem2" key="19">
            <Link to="#">Posts</Link>
            </Menu.Item> */}
            <Menu.Item className="menuitem menuitem2" key="20">
            <Link to="config">{dil==="tm"?tm.sidebar.Currency:ru.sidebar.Currency}</Link>
            </Menu.Item>
            {/* <Menu.Item className="menuitem menuitem2" key="21">
            <Link to="#garaz_sanaw">Currency</Link>
            </Menu.Item> */}
          </SubMenu>

          {/* <SubMenu
            key="sub5"
            title={
              <span className="menuitem">
                <CalculatorOutlined />
                <span>Hasaphana</span>
              </span>
            }
          >
            <Menu.Item className="menuitem menuitem2" key="10">
              Hasaphana
            </Menu.Item>
          </SubMenu> */}

          {/* <SubMenu
            key="sub6"
            title={
              <span className="menuitem">
                <NotificationOutlined />
                <span>Bildirişler</span>
              </span>
            }
          >
            <Menu.Item className="menuitem menuitem2" key="11">
              <Link to="#">Bildirişler</Link>
            </Menu.Item>
            <Menu.Item className="menuitem menuitem2" key="12">
              <Link to="#">Habarlar</Link>
            </Menu.Item>
          </SubMenu> */}

          <SubMenu
            key="sub7"
            title={
              <span>
                <SettingOutlined />
                <span className="menuitem">{dil==="tm"?tm.sidebar.Sazlamalar:ru.sidebar.Sazlamalar}</span>
              </span>
            }
          >
            {/* <Menu.Item className="menuitem" key="9">
              Genral
            </Menu.Item> */}
            <Menu.Item className="menuitem menuitem2" key="13">
              <Link to="/users">{dil==="tm"?tm.sidebar.Users:ru.sidebar.Users}</Link>
            </Menu.Item>
            <Menu.Item className="menuitem menuitem2" key="14">
              <Link to="/admin">{dil==="tm"?tm.sidebar.admin:ru.sidebar.admin}</Link>
            </Menu.Item>
            {/* <Menu.Item className="menuitem menuitem2" key="15">
              <Link to="/ulanyjy_hereket">Ulnyjy hereketler</Link>
            </Menu.Item> */}

            {/* <Menu.Item className="menuitem menuitem2" key="16">
              <Link to="/users_type">User Type</Link>
            </Menu.Item> */}

            {/* <Menu.Item className="menuitem menuitem2" key="16">
              <Link to="#">Ugurlar</Link>
            </Menu.Item> */}
          </SubMenu>
        </Menu>

        <div className="admin-footer">
          <center style={{ fontSize: 12, color: "#C0C0C0", fontWeight: 600 }}>
            Developed By WB
          </center>
        </div>
      </Sider>
    );
  }

export default SiderDemo;