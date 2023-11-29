import { API_URL } from "../config";
import axios from "axios";

export const fetchReview = async (/** @type {string} */ nombre) => {
    const url = `${API_URL}/api/docente/get`;

    return await axios.get(url,{params: { nombre:nombre }}).then( response => {
        console.log(response.data);
        return response.data;
    }).catch(err =>{
        console.log(err);
        return null;
    });
}