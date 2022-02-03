import axios from 'axios'

const apiURL = process.env.REACT_APP_BACKEND_API;

export const logIn = async(userLogInCredentials) =>{
    console.log('Request')
    var data=[];
    await axios.post(apiURL + '/login', userLogInCredentials)
    .then((result) => {
        data = result.data;
        if (data.accessToken) {
            localStorage.setItem("user", JSON.stringify(data));
            return result
          }

    }).catch((err) => {
        console.error(err);
    });
    // console.log(data)
}

export const registerUser = async(userCredentials) =>{
    console.log('Request')
    var data=[];
    await axios.post(apiURL + '/register', userCredentials)
    .then((result) => {
        console.log('request', result);
        data = result.data;
    }).catch((err) => {
        console.error(err);
    });
    console.log(data);
}

export const logout = () => {
    localStorage.removeItem('user');
    window.location.reload()
}