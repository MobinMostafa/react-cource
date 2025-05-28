import axios from 'axios';

export const createConnectAccount = async (token) => {
  return  await axios.post(`${import.meta.env.VITE_API_URL}/create-connect-account`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const getAccountStatus = async (token) => {
  return  await axios.post(`${import.meta.env.VITE_API_URL}/get-account-status`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

//update user in localstorage
export const updateUserInLocalStorage = (user, next) => {
     if(window.localStorage.getItem("users")){
           let auth = JSON.parse(window.localStorage.getItem("users"));
           auth.user = user;
           localStorage.setItem("users", JSON.stringify(auth));
           next();
     }
}