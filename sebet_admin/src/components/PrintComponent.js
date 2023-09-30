import React, { useRef } from "react";
import "antd/dist/antd.css";
import { Button } from "antd";
import ReactToPrint from "react-to-print";
import { BASE_URL } from "../utils/axiosIntance";
import logo from "../img/load.png";
export default function PrintComponent(props){
  let componentRef = useRef();
  console.log(props.maglumat)
  console.log(props.details)
  return (
    <>
      <div id="print_component">
        {/* button to trigger printing of target component */}
        <ReactToPrint
          trigger={() => <Button style={{margin:"10px auto"}} type="primary" shape="round">Print!</Button>}
          content={() => componentRef}
        />

        {/* component to be printed */}
        <div style={{ display: "none" }}>
          <ComponentToPrint ref={(el) => (componentRef = el)} maglumat={props.maglumat} details={props.details}/>
        </div>
      </div>
    </>
  );
}

// component to be printed
class ComponentToPrint extends React.Component {
  render() {
    
    return (
      <div key={"etokey"} style={{width:"48%",margin:"2% 1%"}}>
        <div key={"etokey1"}>
              <img key={"etokeysurat"} src={logo} alt="logo"/>
              <h3 key={"etokeynomur"} style={{marginTop:"15px",marginbottom:"0px"}}>Telefon: +99365584800 / +99342230660</h3>
              <h3 key={"etokeyimo"} style={{marginTop:"3px",marginbottom:"0px"}}>IMO: +99342230660</h3>
              <h3 key={"etokeyinstagram"} style={{marginTop:"3px",marginbottom:"0px"}}>Instagram:	@sebet.online</h3>
              <h3 key={"etokeyemail"} style={{marginTop:"3px",marginbottom:"0px"}}>Email:	hergun.2015@mail.ru</h3>
        </div>
        <h2 key={"etokeysargytNo"} style={{ color: "green",textAlign:"center" }}>Sargyt No {this.props.details?.id}</h2>
        <hr xkey={"etokeycyzyk"}></hr>
        <div key={"etokeybirzatlar"} style={{width:"100%",display:"inline-flex"}}>
          <div key={"etokeydalnydiv"} style={{width:"50%"}}>
            <h3 key={"etokeyAdyulanjy"}><b>Ady:</b> {this.props.details?.user_name}</h3>
            <h3 key={"etokeytelonuser"}><b>Telefon No:</b> {this.props.details?.user_phone}</h3>
            <h3 key={"etokeysalgyuser"}><b>Salgysy:</b> {this.props.details?.address}</h3>
            <h3 key={"etokeybellikuser"}><b>Bellik:</b> {this.props.details?.note}</h3>
          </div>
          <div style={{width:"50%"}}>
            <h3><b>Sargyt edilen senesi:</b> {this.props.details?.createdAt?.slice(0,10)}</h3>
            <h3><b>Eltip berme wagty:</b> 
            {this.props.details?.delivery_time=="11" && "Şu gün (9:00 - 12:00)"}
            {this.props.details?.delivery_time=="12" && "Şu gün (12:00 - 15:00)"}
            {this.props.details?.delivery_time=="13" && "Şu gün (18:00 - 21:00)"}

            {this.props.details?.delivery_time=="21" && "Ertir (9:00 - 12:00)"}
            {this.props.details?.delivery_time=="22" && "Ertir (12:00 - 15:00)"}
            {this.props.details?.delivery_time=="23" && "Ertir (18:00 - 21:00)"}
            
            </h3>
            <h3><b>Töleg şekili :</b> {this.props.details?.payment_type==1?"Nagt":"Toleg Terminal"}</h3>
            <h3><b>Jemi:</b> {this.props.details?.total_price}</h3>
          </div>
        </div>
        { true && <table style={{width:"100%"}} border="1" className="goshmacha--ul">
                            <tr className="modalLi" key={"er"}>
                            <td>Ady </td>
                            <td>Mukdar </td>
                            <td>Kody </td>
                            <td>Baha </td>
                            <td>Jemi</td>
                            </tr>
                            {this.props.maglumat?.map((product)=>{
                              return <tr>
                                    <td>{product?.product_name_tm} </td>
                                    <td>{product?.quantity} </td>
                                    <td>{product?.product_code} </td>
                                    <td>{product?.order_price} </td>
                                    <td>{product?.total_price}</td>
                              </tr>
                            })}
                           
                           
                        </table>}
      </div>
    );
  }
}
