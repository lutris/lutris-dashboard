import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/api/accounts/token',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: '/api/users/me',
    method: 'get'
  })
}

