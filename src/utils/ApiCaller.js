import axios from 'axios'
import * as config from './../constants/Config'

export default function calApi(endpoint, method = 'GET', body) {
    
    return axios({
        method: method,
        url: `${config.API_URL}/${endpoint}`,
        data: body,
        headers: {'Content-Type': 'application/json'}
    }).catch( err => {
        console.log(err);
    });
}