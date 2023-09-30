export const token = () => {
    if (JSON.parse(localStorage.getItem("AdminProfile"))) {
      var data = JSON.parse(localStorage.getItem("AdminProfile"));
      return data.token;
    }
  };
  