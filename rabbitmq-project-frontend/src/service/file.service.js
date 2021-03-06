import axios from "axios";

const apiURL = process.env.REACT_APP_BACKEND_API;
/**
 * This function uploads the file and creates connection between frontend and backend 
 * @param {file} fileData 
 * @returns {object} response 
 */
export const uploadFile = async (fileData) => {
  var response;
  await axios
    .post(apiURL + "/sendfile?file", fileData, {})
    .then((res) => {
    //   console.log(res);
      response = res;
    })
    .catch((e) => {
    //   console.log(e.response);
      response = e.response;
    });
  return response;
};

export const fetchdata = async () => {
  var response;
  await axios
    .post(apiURL + "/senddata")
    .then((res) => {
    //   console.log(res);
      response = res;
    })
    .catch((e) => {
    //   console.log(e.response);
      response = e.response;
    });
  return response;
}