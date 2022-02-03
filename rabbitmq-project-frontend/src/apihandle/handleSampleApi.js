import axios from 'axios'

const apireq = () =>{
    console.log('Request')
    var data=[];
    axios.get('http://localhost:36/alluser')
    .then((result) => {
        console.log('request', result);
        data = result.data;
        return data;
    }).catch((err) => {
        console.error(err);
    });
}

export default apireq