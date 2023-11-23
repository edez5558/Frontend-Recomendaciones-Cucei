import { API_URL } from "../config";
import axios from "axios";

export const fetchDocente = async (/** @type {string} */ nombre) => {
    const url = `${API_URL}/api/review/search`;

    return await axios.get(url,{params: { nombre:nombre }}).then( response => {
        return response.data;
    }).catch(err =>{
        console.log(err);
        return null;
    });
}