import axios from "axios";

export const LoginApi = (values: any) => {
  return axios({
    method: "POST",
    url: "https://dummyjson.com/auth/login ",
    data: values,
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response)
    .catch((err) => err);
};

export const getNumberOfusers = () => {
  try {
    return axios
      .get(`https://dummyjson.com/users`, {
        params: {
          limit: 100,
          skip: 0,
        },
      })
      .then((response) => {
        return response;
      });
  } catch (error) {
    console.log(error);
  }
};

export const getNumberOfProductslist = () => {
  try {
    return axios
      .get("https://dummyjson.com/products", {
        params: {
          limit: 200,
        },
      })
      .then((response) => {
        return response;
      });
  } catch (error) {
    console.log(error);
  }
};
export const getUsers = (searchUser: any) => {
  try {
    return axios
      .get(`https://dummyjson.com/users/search?q=${searchUser}`)
      .then((response) => {
        return response;
      });
  } catch (error) {
    console.log(error);
  }
};

export const createUser = (data: any) => {
  try {
    return axios({
      method: "post",
      url: "https://dummyjson.com/users/add",
      data: data,
      headers: { "Content-Type": "application/json" },
    }).then((response) => {
      console.log("response ==> ", response);
      return response;
    });
  } catch (error) {
    console.log("error ==> ", error);
  }
};
