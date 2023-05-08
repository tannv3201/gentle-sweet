import axios from "axios";

export const getAllUsers = () => {
    var url = "http://localhost:8080/v1/adminUser/";
    return axios.get(url);
};
