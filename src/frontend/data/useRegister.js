import useSWR, { mutate as swrMutate } from "swr";
import axios from 'axios';

export async function registerUser(username, email, password) {
    const res = await axios.post('/auth/register', {
        username, email, password
    }).catch(err => {
        if (err.response) {
            return { data: err.response.data }
        }
    })

    return res.data
}