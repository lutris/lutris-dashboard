import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      console.log('Setting token in headers')
      config.headers['Authorization'] = 'Token ' + getToken()
      config.headers['Accept'] = 'Application/json'
    }
    return config
  },
  error => {
    // Do something with request error
    console.log('Failed to set headers')
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (!res) {
      Message({
        message: 'Failed to get response',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject('Server error')
    } else {
      return response
    }
  },
  error => {
    console.log('Error getting response from server: ' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
