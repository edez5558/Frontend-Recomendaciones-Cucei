import { API_URL } from "../config";
import axios from "axios";

export const fetchReview = async (/** @type {string} */ nombre) => {
    const url = `${API_URL}/api/review/get`;

    return await axios.get(url,{params: { nombre:nombre }}).then( response => {
        return response.data;
    }).catch(err =>{
        console.log(err);
        return null;
    });
}