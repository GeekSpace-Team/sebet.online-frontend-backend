import React, { useState } from "react";

import { Button, Space, message, Table, Modal, Drawer } from "antd";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import UlagYagdayy from "./ulagYagdayy";
import "./mehanikTable.css";

const MehanikTable = (props) => {
  const [data, setData] = useState([
    {
      key: "1",
      surujiNo: 1728,
      wayDocumentId: 154875,
      dowletNo: "AB2021AG",
      status: "Gurat",
      description: "",
      help: "",
      sene: "23.02.2021",
      remontEden: "Plany Planyyew",
      mehanik: "Shageldi Alyyew",
    },
    {
      key: "2",
      surujiNo: 1475,
      wayDocumentId: 154548,
      dowletNo: "AB2021AG",
      status: "Guratdal",
      description: "Mator Gyzyar.",
      help: "Radyatyr chalyshyldy",
      sene: "23.02.2021",
      remontEden: "Plany Planyyew",
      mehanik: "Shageldi Alyyew",
    },
    {
      key: "3",
      surujiNo: 1458,
      wayDocumentId: 154875,
      dowletNo: "AB2021AG",
      status: "Gurat",
      description: "",
      help: "",
      sene: "23.02.2021",
      remontEden: "Plany Planyyew",
      mehanik: "Shageldi Alyyew",
    },
    {
      key: "4",
      surujiNo: 1478,
      wayDocumentId: 154548,
      dowletNo: "AB2021AG",
      status: "Guratdal",
      description: "Teker Deshilen.",
      help: "Bir tekeri bejirildi",
      sene: "23.02.2021",
      remontEden: "Plany Planyyew",
      mehanik: "Shageldi Alyyew",
    },
  ]);

  const columns = [
    {
      title: "Sürüji No",
      dataIndex: "surujiNo",
    },
    {
      title: "Ýol Haty No",
      dataIndex: "wayDocumentId",
    },
    {
      title: "Dowlet No",
      dataIndex: "dowletNo",
    },
    {
      title: "Ýagdaýy",
      dataIndex: "status",
      render: (text, record) =>
        record.status === "Guratdal" ? (
          <div style={{ color: "red", fontWeight: "600" }}>{record.status}</div>
        ) : (
          <div style={{ color: "green", fontWeight: "600" }}>
            {record.status}
          </div>
        ),
    },
    {
      title: "Giňişleýin",
      dataIndex: "description",
    },
    {
      title: "Edilen Remont",
      dataIndex: "help",
    },
    {
      title: "Sene",
      dataIndex: "sene",
    },
    {
      title: "Mehanik Gözegçiligi we Özgertmek",
      dataIndex: "goshmacha",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            shape="round"
            onClick={() => MoreInformation(record)}
          >
            Goşmaça
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
            danger
            onClick={() => DeleteUser(record)}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  const [edit, setEdit] = useState(false);
  const [maglumat, setMaglumat] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const DeleteUser = (event) => {
    console.log(event);
    message.success("Deleted!", 5);
  };
  const MoreInformation = (event) => {
    console.log(event);
    setShowInfo(!showInfo);
    setMaglumat([]);
    setMaglumat(event);
  };
  const ShowDrawer = (event) => {
    setEdit(!edit);
    console.log(event);
    setMaglumat([]);
    setMaglumat(event);
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
    setData([...data, maglumat]);
    setEdit(false);
  };

  return (
    <div className="MehanikTable">
      <Drawer
        width={400}
        className="mehanik-table--drawer"
        title="Goşmça Maglumat"
        placement="right"
        onClose={() => MoreInformation()}
        visible={showInfo}
      >
        <table border="1" className="mehanikGoshmachaUl">
          <tr className="mehanikGoshmachaLi">
            <td>Sene: </td>
            <td>{maglumat && maglumat.sene}</td>
          </tr>
          <tr className="mehanikGoshmachaLi">
            <td>Ady Familýasy: </td>
            <td>Planyýew Plany</td>
          </tr>
          <tr className="mehanikGoshmachaLi">
            <td>Sürüji No: </td>
            <td>{maglumat && maglumat.surujiNo} </td>
          </tr>
          <tr className="mehanikGoshmachaLi">
            <td>Ýol hat No: </td>
            <td>{maglumat && maglumat.wayDocumentId}</td>
          </tr>
          <tr className="mehanikGoshmachaLi">
            <td>Dowlet No: </td>
            <td>{maglumat && maglumat.dowletNo}</td>
          </tr>
          <tr className="mehanikGoshmachaLi">
            <td>Ýagdaýy: </td>
            <td>{maglumat && maglumat.status} </td>
          </tr>
          {maglumat && maglumat.description && (
            <tr className="mehanikGoshmachaLi">
              <td>Sebäbi: </td>
              <td>{maglumat && maglumat.description}</td>
            </tr>
          )}
          {maglumat && maglumat.help && (
            <tr className="mehanikGoshmachaLi">
              <td>Edilen Remont: </td>
              <td>{maglumat && maglumat.help}</td>
            </tr>
          )}
          {maglumat && maglumat.help && (
            <tr className="mehanikGoshmachaLi">
              <td>Remont Eden: </td>
              <td>{maglumat && maglumat.remontEden}</td>
            </tr>
          )}
          <tr
            className="mehanikGoshmachaLi"
            style={{
              borderTop: "2px solid grey",
              marginTop: "30px",
              paddingTop: "10px",
            }}
          >
            <td>Gozegçi Mehanik: </td>
            <td>{maglumat && maglumat.mehanik} </td>
          </tr>
        </table>
      </Drawer>
      <Drawer
        width={400}
        className="mehanik-table--drawer"
        title="Üýtgetmeler1"
        placement="right"
        onClose={() => ShowDrawer()}
        visible={edit}
        footer={
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              shape="round"
              type="primary"
              htmlType="submit"
              className="ulag-yagdayy--button"
            >
              Uytgetmek
            </Button>
            <Button
              onClick={() => ShowDrawer()}
              shape="round"
              danger
              type="primary"
              className="ulag-yagdayy--button"
            >
              Goybolsyn
            </Button>
          </div>
        }
      >
        <UlagYagdayy
          onClick={ShowDrawer}
          value={maglumat}
          inputChangeHandler={inputChangeHandler}
        />
      </Drawer>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default MehanikTable;
