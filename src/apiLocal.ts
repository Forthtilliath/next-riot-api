import axios from "axios";


export const apiLocal = axios.create({
  baseURL: "http://localhost:3000",
});

export async function fetchApi(url: string) {
    const res = await apiLocal.get(url);
    return res.data;
}
