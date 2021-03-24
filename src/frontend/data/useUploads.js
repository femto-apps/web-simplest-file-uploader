import useSWR, { mutate as swrMutate } from "swr";
import axios from 'axios';

const fetcher = url => fetch(url).then(r => r.json())

export default function useUploads() {
    let { data, mutate, error } = useSWR("/api/uploads", fetcher);

    if (data && data.error) {
        error = data.error
    }

    const loading = !data && !error;

    return {
        loading,
        data,
        error,
        mutate
    };
}

export async function deleteUpload(item) {
    const res = await axios.delete(`/api/upload/${item.short}`)

    swrMutate('/api/uploads')
}