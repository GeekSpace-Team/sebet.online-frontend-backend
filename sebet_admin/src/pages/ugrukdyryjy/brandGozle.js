import React, { useContext } from "react";
import { Input, Button } from "antd";
import "antd/dist/antd.css";
import {
  PlusCircleFilled,
  CloseCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { SebedimContext } from "../../context/Sebedim";
import tm from "../../lang/tm.json"
import ru from "../../lang/ru.json"

import "./yolHatyGozle.css";

const YolHatyGozle = (props) => {

  const { dil } = useContext(SebedimContext);
  const GoshButton = props.GoshButton;
  return (
    <div className="yolHaty-gozle">
      <form className="yolHaty-gozle--form">
        <div>
        <h2 style={{margin:"10px 10px"}}>{dil==="tm"?tm.brand.AdminBrandPage:ru.brand.AdminBrandPage}</h2>
          {/* <Input
            className="yolHaty-gozle--input"
            placeholder="Id No"
            addonAfter={<SearchOutlined />}
          />
          <Input
            className="yolHaty-gozle--input"
            placeholder="Umumy Gözleg"
            addonAfter={<SearchOutlined />}
          /> */}
        </div>
        <div>
          <Button
            onClick={GoshButton}
            shape="round"
            type="primary"
            icon={<PlusCircleFilled />}
            className="yolHaty-gozle--button"
          >
            {dil==="tm"?tm.brand.BrandDöret:ru.brand.BrandDöret}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default YolHatyGozle;
