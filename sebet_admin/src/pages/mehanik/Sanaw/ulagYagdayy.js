import React, { useState } from "react";

import { Select, Input, Button } from "antd";
import "antd/dist/antd.css";
import { PlusCircleFilled, CloseCircleOutlined } from "@ant-design/icons";

import "./ulagYagdayy.css";
import TextArea from "antd/lib/input/TextArea";
const Option = { Select };

const UlagYagdayy = (props) => {
  const [maglumat, setMaglumat] = useState(props.value);
  console.log("maglumat shu:", maglumat);
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(
      event.target.surujiNo,
      event.target.sene,
      event.target.yagdayy,
      event.target.komek
    );
  };
  const [yagday, setyagday] = useState();
  const Yagdayy = (value) => {
    setyagday(value);
    console.log(value);
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

  return (
    <div className="ulag-yagdayy">
      <form className="ulag-yagdayy--form" onSubmit={onSubmit}>
        <Input
          value={maglumat && maglumat.surujiNo}
          onChange={inputChangeHandler}
          name="surujiNo"
          addonBefore="Sürüji No"
          className="ulag-yagdayy--input"
        />
        <Input
          value={maglumat && maglumat.sene}
          onChange={inputChangeHandler}
          name="sene"
          type="date"
          size="middle"
          addonBefore="Sene"
          className="ulag-yagdayy--input"
        />
        <Select
          name="status"
          defaultValue={maglumat && maglumat.status}
          onChange={Yagdayy}
          placeholder="Ulag Ýagdaýy"
          className="ulag-yagdayy--input"
        >
          <Option value="Gurat">Gurat</Option>
          <Option value="Guratdal">Guratdal</Option>
        </Select>
        {yagday === "Guratdal" ? (
          <React.Fragment>
            <TextArea
              value={maglumat && maglumat.description}
              onChange={inputChangeHandler}
              name="description"
              rows={5}
              placeholder="Ulag Ýagdaýy Giňişleýin!"
              className="ulag-yagdayy--input"
            />
            <TextArea
              value={maglumat && maglumat.help}
              onChange={inputChangeHandler}
              name="help"
              rows={5}
              placeholder="Ulaga Edilen Remont!"
              className="ulag-yagdayy--input"
            />
          </React.Fragment>
        ) : null}
      </form>
    </div>
  );
};

export default UlagYagdayy;
