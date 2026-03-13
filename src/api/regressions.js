import request from '@/utils/system/request.js'

export function fetchRegressions(params) {
  return request({
    url: '/api/regressions',
    method: 'get',
    params
  })
}

export function fetchRegression(id) {
  return request({
    url: `/api/regressions/${id}`,
    method: 'get'
  })
}

export function updateRegression(id, data) {
  return request({
    url: `/api/regressions/${id}`,
    method: 'patch',
    data
  })
}
