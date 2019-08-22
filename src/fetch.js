
import axios from 'axios';

export function get(source) {
    return axios.get(source).then(res => res.data);
}