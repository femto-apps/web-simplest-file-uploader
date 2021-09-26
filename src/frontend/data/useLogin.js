import useSWR, { mutate as swrMutate } from "swr";
import axios from 'axios';

export async function loginUser(userId, password) {
    const res = await axios.post('/auth/login', {
        userId, password
    }).catch(err => {
        if (err.response) {
            return { data: err.response.data }
        }
    })

    return res.data
}