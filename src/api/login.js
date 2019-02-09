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

export function logout() {
  // That doesn't need an API call, just deleting the token
  return request({
    url: '/api/',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/api/users/me',
    method: 'get',
    params: { token }
  })
}

