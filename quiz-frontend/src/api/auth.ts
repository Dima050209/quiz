import axios from "axios";
import env from "@/config/validateEnv";

const API_BASE_URL = env.NEXT_PUBLIC_API_BASE_URL;

export const login = async(email: string, password: string) => {
    try {
        return await axios.post(API_BASE_URL + '/auth/login', {email, password});
    } catch (error) {
        console.log(error);
    }
}

export const logout = async() => {
    try {
        return await axios.post(API_BASE_URL + '/auth/logout');
    } catch (error) {
        console.log(error);
    }
}