import axios from 'axios'
import authHeader from './authHeader';

const apiURL = process.env.REACT_APP_BACKEND_API;
/**
 * Gets the username and user designation
 * 
 * @returns {object} response 
 */
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