import axios from "axios";

const axiosWithAuth = () => {
  const token = window.localStorage.getItem("token");
  return axios.create({
    baseURL: "https://ialkamal-be-amp.herokuapp.com/api",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export default axiosWithAuth;