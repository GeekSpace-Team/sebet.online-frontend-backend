import React, { useContext, useEffect } from "react";
import Loader from "../img/logo_icon_header_litle.svg";
import NProgress from "nprogress";

import "./loading.css";
import { SebedimContext } from "../context/Sebedim";
export const Loading = () => {
  const {dil} = useContext(SebedimContext);
  useEffect(() => {
    NProgress.start();
    NProgress.configure({ showSpinner: false });
    NProgress.set(0.6);
    return () => {
      NProgress.done();
    };
  }, []);

  // 

  return <img src={Loader} alt={dil=="tm"?"Ýüklenýär":"Загружено"} className="main-loading" />;
};
