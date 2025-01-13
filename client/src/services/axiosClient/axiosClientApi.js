import { auth } from "../../firebase/firebaseConfig";
import axios from "axios";

export const client = axios.create({baseURL: process.env.REACT_APP_SERVER_URI})

client.interceptors.request.use(
    async (config) =>{
        const token = await auth.currentUser.getIdToken()        
        config.headers["Authorization"] = `Bearer ${token}`
        return config
    },
    (error) => {
        return Promise.reject("there's an error with axios client:" ,error)
    }
)