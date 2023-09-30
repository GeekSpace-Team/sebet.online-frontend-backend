import axios from 'axios'
import { token} from './token'
//  10.172.16.27
 const BASE_URL = 'https://sebet.online:5003'
// const BASE_URL = 'http://95.85.121.148:5001'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 1000000,
  
    headers:{
       Authorization: 'Bearer ' + token(),
      'Content-Type':'application/json',
      // Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwibmFtZSI6IktlcmltIiwiaWF0IjoxNjE2NDUwNjU3fQ.v8iyHYmwNlKVhLUA7LzxybICB8zzbVjRyXeFZbV7IPw'
    }
  })
  export {BASE_URL, axiosInstance}