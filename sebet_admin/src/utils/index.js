export const logout = () => {
  localStorage.removeItem("AdminProfile");
};

export const isLogin = () => {
  if (localStorage.getItem("AdminProfile")) {
    var data = JSON.parse(localStorage.getItem("AdminProfile"));
    if (data.token) {
      return true;
    } else {
      localStorage.removeItem("AdminProfile");
    }
  }
  return false;
};

export const isLoginAdmin = () => {
  if (localStorage.getItem("AdminProfile")) {
    var data = JSON.parse(localStorage.getItem("AdminProfile"));
    if (data.token) {
      return true;
    } else {
      localStorage.removeItem("AdminProfile");
    }
  } else {
    return false;
  }
};
