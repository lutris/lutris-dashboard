import request from '@/utils/request'

export function fetchSubmissions() {
  return request({
    url: '/api/installers/revisions',
    method: 'get',
    params: { type: 'submission' }
  })
}

export function fetchSubmission(id) {
  console.log(id)
  return request({
    url: '/api/installers/revisions/' + id,
    method: 'get',
    params: null
  })
}
