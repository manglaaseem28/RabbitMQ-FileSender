import axios from 'axios'

const apireq = () =>{
    axios.get('http://localhost:36/alluser')
    .then((result) => {
        console.log(result);
    }).catch((err) => {
        console.error(err);
    });
}

export default apireq