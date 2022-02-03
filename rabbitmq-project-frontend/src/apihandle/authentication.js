import axios from 'axios'

export const logIn = async(userLogInCredentials) =>{
    console.log('Request')
    var data=[];
    await axios.post('http://localhost:36/login', userLogInCredentials)
    .then((result) => {
        data = result.data;
    }).catch((err) => {
        console.error(err);
    });
    console.log(data)
}

export const registerUser = async(userCredentials) =>{
    console.log('Request')
    var data=[];
    await axios.post('http://localhost:36/register', userCredentials)
    .then((result) => {
        console.log('request', result);
        data = result.data;
    }).catch((err) => {
        console.error(err);
    });
    console.log(data);
}
