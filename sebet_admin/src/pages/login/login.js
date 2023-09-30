import {useState,useEffect} from 'react';
import {BASE_URL,axiosInstance} from '../../utils/axiosIntance'
import { message,Input } from 'antd';
import {token} from '../../utils/token'
import {Redirect,useHistory} from 'react-router-dom'
import axios from 'axios'

  import { Button } from "antd";

import { Select } from "antd";
import "antd/dist/antd.css";
import "./login.css";
import { async } from 'q';

const Login = () =>{

    const history = useHistory()
    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("")


const onSubmit=async()=>{
  
  axiosInstance.post("/admin/login",{
 
username:username,
password: password,
     
} ).then((res)=>{
 
 
  if(res.data.token){
        localStorage.setItem("AdminProfile", JSON.stringify(res.data))
        message.success("Successfully")
         window.location.href="/orders";
    }else{
        message.warn(res.data.message)
    }
    

}).catch((err)=>{
    console.log(err);
    
})

}

const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
    onSubmit()
  }
}


return(
    <div  className="login-page" >
    <div className="login " >
    <div className="login--form">
      <h2 className="login--header">Içeri Gir</h2>
      {/* <Input      type='text' 
                          element='input'  
                          label="Ady" 
                          validators={[VALIDATOR_REQUIRE()]}  
                          errorText='Adyňyzy Giriziň!' /> */}
      <label >Ulanyjy Ady:</label>
      <Input
        // onKeyDown={handleKeyDown}
        name="login"
        value={username} onChange={(e)=>setUsername(e.target.value)}
      />
      <label >Password</label>
      <Input
        onKeyDown={handleKeyDown}
        id="myInput"
        type="password" name="password"
        value={password} onChange={(e)=>setPassword(e.target.value)}
      />
      <Button  className="Button" onClick={()=>onSubmit()}  >Içeri Gir</Button>
    </div> 
  </div>
  </div>

    // <div>
    //     Login page
        
    //     <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="login"/>
    //     <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password" />
    //     <button onClick={()=>onSubmit()}>Login</button>

    //     {token()}
    // </div>
)


}



export default Login;