import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 25000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = 'Token ' + getToken()
      config.headers['Accept'] = 'Application/json'
    }
    return config
  },
  error => {
    console.log('Failed to set headers')
    console.log(error)
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.status > 299) {
      Message({
        message: 'Failed to get response',
        type: 'error',
        duration: 5000
      })
      return Promise.reject(`Server responded with status ${response.status}`)
    } else {
      return response
    }
  },
  error => {
    console.log('Error getting response from server: ' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5000
    })
    return Promise.reject(error)
  }
)

export default service
