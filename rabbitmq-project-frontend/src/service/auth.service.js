import axios from "axios";

const apiURL = process.env.REACT_APP_BACKEND_API;
/**
 * Function used to post user credentials from frontend and backend 
 * @param {object} userLogInCredentials 
 * @returns {object} response
 */
export const logIn = async (userLogInCredentials) => {
  console.log("Request");
  var response;
  await axios
    .post(apiURL + "/login", userLogInCredentials)
    .then((result) => {
      // console.log('Login Result', result)
      var data = result.data;
      if (data.accessToken) {
        localStorage.setItem("user", JSON.stringify(data));
      }
      response = result;
    })
    .catch((err) => {
      const error = err.response;
      // console.log(error)
      response = error;
    });
  return response;
};
/**
 * Function used to post the user data from frontend to backend 
 * @param {object} userCredentials 
 * @returns {object} response
 */
export const registerUser = async (userCredentials) => {
  console.log("Request");
  var response;
  await axios
    .post(apiURL + "/register", userCredentials)
    .then((result) => {
      // result.data = JSON.parse(result.data)
      console.log("request", result);
      response = result;
    })
    .catch((err) => {
      console.error(err);
      response = err.response;
    });
  return response;
};

export const logout = () => {
  localStorage.removeItem("user");
  window.location.reload();
};
