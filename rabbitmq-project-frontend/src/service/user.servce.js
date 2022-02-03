import axios from 'axios'
import authHeader from './authHeader';

const apiURL = process.env.REACT_APP_BACKEND_API;

const getUserData = async () => {
    await axios.get(apiURL + '/userData', {headers: authHeader()})
    .then((result) => {
        return result.data;
    }).catch((err) => {
        console.log(err);
        return '';
    });
}

export default {getUserData}