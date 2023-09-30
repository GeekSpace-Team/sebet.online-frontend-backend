import React, { useState } from "react";

import { Button, Input, Drawer } from "antd";
import "antd/dist/antd.css";
import { SearchOutlined, PlusCircleFilled } from "@ant-design/icons";

import MehanikFilter from "./mehanikFilter";
import UlagYagdayy from "./ulagYagdayy";
import MehanikTable from "./mehanikTable";
import "./mehanik_sanaw.css";

const MehanikSanaw = () => {
  const [Gosh, setGosh] = useState(false);
  const [state, setState] = useState(false);
  const GoshButton = () => {
    setState(true);
    setGosh(true);
    console.log(Gosh);
  };
  const Close = () => {
    setState(false);
    setGosh(false);
  };

  return (
    <div className="mehanik-sanaw">
      {/* <div className='mehanik-sanaw--top'>
                <h2 className="mehanik-sanaw--header">Mehanik-sanaw </h2>
                <Button onClick={()=>GoshButton()} shape='round' type='primary' icon={<PlusCircleFilled />} className='mehanik-sanaw--gosh'>Hasaba Al</Button>
            </div> */}
      <Drawer
        width={400}
        className="mehanik-sanaw-gosh--drawer"
        title="Basic Drawer"
        placement="right"
        // closable={true}
        onClose={() => Close()}
        visible={state}
        footer={
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              icon={<PlusCircleFilled />}
              shape="round"
              type="primary"
              htmlType="submit"
              className="ulag-yagdayy--button"
            >
              Hasaba al
            </Button>
            <Button
              onClick={() => Close()}
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
        <UlagYagdayy />
      </Drawer>

      <div className="mehanik-sanaw--gozleg">
        <MehanikFilter GoshButton={GoshButton} />
      </div>
      <div className="mehanik-sanaw-Table">
        <MehanikTable />
      </div>
    </div>
  );
};

export default MehanikSanaw;
