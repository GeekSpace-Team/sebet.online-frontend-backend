import React ,{ useState, useEffect,createContext} from "react";

export const SebedimContext = createContext();

const SebedimContextProvider = (props)=>{
    
     
    
                
     
 
    

  
   
    let [dil,setDil]=useState();
    useEffect(()=>{
            let dilData = localStorage.getItem("sebetAdminDil");
        if(dilData){
            setDil(dilData);
        }else{
            localStorage.setItem("sebetAdminDil","tm");
            setDil("tm");
        }
    },[])

    const ChangeDil = (event)=>{
            setDil(event);
            localStorage.setItem("sebetAdminDil",JSON.stringify(event));
    }

    return(
        <SebedimContext.Provider value={{dil,ChangeDil}}>
            {props.children}
        </SebedimContext.Provider>
    );
};
 

export default SebedimContextProvider;