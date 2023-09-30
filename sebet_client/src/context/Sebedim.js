import React ,{ useState, useEffect,createContext} from "react";

export const SebedimContext = createContext();

const SebedimContextProvider = (props)=>{
    
    
    let localData;
        const harytlar =localStorage.getItem("sebedim");
    if(harytlar){
        localData = JSON.parse(harytlar);
    }
    else{
        localData = [];
    }


    
  
    const [sebedim,setSebedim]=useState(localData);    

    const  Increment = async(id,sany)=>{
        let haryt;
        let num ;
        await sebedim.map((sebet,no)=>{
            if(sebet.id===id){
                haryt=sebet;
                num=no;
            }
            
        return null;
        });
        if(sany){
            haryt.sany=haryt.sany+sany;
        }else{
            haryt.sany=haryt.sany+1;
        }
        
        let sebet = []; 
        await sebedim.map((obj,index)=>{
            if(index===num){
                sebet.push(haryt);
            }else{
                sebet.push(obj);
            }
            
        return null;
        })      
         setSebedim(
                sebet 
        );
    }
    const  Decrement = async(id,sany)=>{
        let haryt;
        let num ;
        await sebedim.map((sebet,no)=>{
            if(sebet.id===id){
                haryt=sebet;
                num=no;
            }
            
        return null;
        });
        haryt.sany=haryt.sany-1;
        
        let sebet = []; 
        await sebedim.map((obj,index)=>{
            if(index===num){
                sebet.push(haryt);
            }else{
                sebet.push(obj);
            }
            
        return null;
        })      
         setSebedim(
                sebet 
        );
    }
    const AddTo = async(product)=>{
        console.log("addtoo",product);
        let id = product.id;
        let barmy=false;
             await sebedim.map((haryt)=>{
                if(haryt.id===id){
                   Increment(id);
                   barmy=true;
                }
                
        return null;
            });
            if(!barmy){   
                let harytlar = sebedim;
                harytlar.push() ;        
                    setSebedim([
                        ...sebedim,
                        {
                            id:product.id,
                            baha:product.product_price,
                            product,
                            sany:1,
                            }
                    ]);
                }
    }
    const AddToMany = async(product,sany)=>{
        let barmy=false;
        let id=product.id;
             await sebedim.map(async(haryt)=>{
                if(haryt.id===id){
                   Increment(id,sany);
                   barmy=true;
                }else{
                //    await AddTo(product);
                //    Increment(product.id,sany-1)

                }
                
        return null;
            });
            if(!barmy){   
                let harytlar = sebedim;
                harytlar.push() ;        
                    setSebedim([
                        ...sebedim,
                        {
                            id:product.id,
                            baha:product.product_price,
                            product,
                            sany:sany,
                            }
                    ]);
                }
    }
    const Remove = async(id)=>{
        const harytlar = await sebedim.filter((haryt)=>{
            return id !== haryt.id;
        });
         setSebedim(harytlar);

    }
    const RemoveAll = async(id)=>{
        
         setSebedim([]);

    }
    const  Barlag = async(id,sany)=>{
        let haryt;
        let num ;
        let bool=false;
        await sebedim.map((sebet,no)=>{
            if(sebet.product.product_id===id){
                haryt=sebet;
                num=no;
            }
            
        return null;
        });
        console.log("sebedim barlag",sany,haryt)
        // if(haryt.sany!=sany){
        //     bool=true;
        // }
        haryt.sany=sany;
        
        let sebet = []; 
        await sebedim.map((obj,index)=>{
            if(index===num){
                sebet.push(haryt);
            }else{
                sebet.push(obj);
            }
            
        return null;
        })      
         setSebedim(
                sebet 
        );
        // return bool;
    }
    useEffect(()=>{
        
            localStorage.setItem("sebedim",JSON.stringify(sebedim));
        
    },[sebedim]);

  
   
    let [dil,setDil]=useState();
    useEffect(()=>{
            let dilData = localStorage.getItem("sebetDil");
        if(dilData){
            setDil(JSON.parse(dilData));
        }else{
            setDil("tm");
        }
    },[])

    const ChangeDil = (event)=>{
            setDil(event);
            localStorage.setItem("sebetDil",JSON.stringify(event));
    }

    return(
        <SebedimContext.Provider value={{sebedim,dil,Increment,Decrement,AddTo,AddToMany,Remove,RemoveAll,ChangeDil,Barlag}}>
            {props.children}
        </SebedimContext.Provider>
    );
};
 

export default SebedimContextProvider;