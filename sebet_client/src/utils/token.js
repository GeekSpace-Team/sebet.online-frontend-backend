export const token = () => {
    if (JSON.parse(localStorage.getItem("sebetProfile"))) {
      var data = JSON.parse(localStorage.getItem("sebetProfile"));
      return data.token;
    }
  };
  