import request from '@/utils/system/request'

export function loginApi(data) {
  return request({
    url: "/api/accounts/token",
    method: 'post',
    data
  })
}

export function getInfoApi(data) {
  return request({
    url: "/api/users/me",
    method: 'get',
    data
  })
}

export function loginOutApi() {
  return request({
    url: '/user/out',
    method: 'post'
  })
}
