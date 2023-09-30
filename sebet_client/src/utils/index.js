import { message } from "antd";

export const logout = () => {
  
  localStorage.removeItem("sebetProfile");
};

export const isLogin = () => {
  if (localStorage.getItem("sebetProfile")) {
    var data = JSON.parse(localStorage.getItem("sebetProfile"));
    if (data.token) {
      return true;
    } else {
      // localStorage.removeItem("sebetProfile");
    }
  }
  return false;
};

export const isLoginAdmin = () => {
  if (localStorage.getItem("sebetProfile")) {
    var data = JSON.parse(localStorage.getItem("sebetProfile"));
    if (data.permission && data.token) {
      return true;
    } else {
      // localStorage.removeItem("sebetProfile");
    }
  } else {
    return false;
  }
};
