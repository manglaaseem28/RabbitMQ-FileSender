import axios from "axios";

const apiURL = process.env.REACT_APP_BACKEND_API;

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
