import axios from 'axios'
import {message} from 'antd'

let apiUrl = process.env.REACT_APP_API_URL
let options = {
    baseURL: apiUrl,
    headers: {
        "Content-type": "application/json",
    },
};
console.log(options)
const axiosInstance = axios.create(options)

axiosInstance.interceptors.response.use(
    (response) => {
        // console.log(response)
        return response
    }
        ,
    (error) =>{
        let errorMessage = error.message || error.response.data.message
        if(errorMessage === "Network Error") {
            errorMessage = "Something went wrong. Please contact application administrator"
        }
        else if (error.response.status === 404) {
            errorMessage = "Some problem reaching API server. Please contact application administrator"
        }
        else if (error.response.status === 500) {
            errorMessage = "Some internal server error. Please contact application administrator"
        }
        else if (error.response.status === 401) {
            errorMessage = "Your request can not be authorized. Please contact application administrator"
        }
        console.log(errorMessage)
        setTimeout(()=>{
            message.error(errorMessage)
        },1000)
        return Promise.reject(
            (error.response && error.response.data) || "Something went wrong. Please contact application administrator"
        )
    }
)
export default axiosInstance
