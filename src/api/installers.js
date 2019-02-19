import request from '@/utils/request'

export function fetchSubmissions() {
  return request({
    url: '/api/installers/revisions',
    method: 'get',
    params: { type: 'submission' }
  })
}

export function fetchDrafts() {
  return request({
    url: '/api/installers/revisions',
    method: 'get',
    params: { type: 'draft' }
  })
}

export function fetchSubmission(id) {
  return request({
    url: `/api/installers/revisions/${id}`,
    method: 'get'
  })
}

export function fetchRevisions(slug) {
  return request({
    url: `/api/installers/game/${slug}/revisions`,
    method: 'get'
  })
}

export function acceptSubmission(id) {
  return request({
    url: `/api/installers/revisions/${id}`,
    method: 'put',
    data: {
      action: 'accept'
    }
  })
}

export function deleteSubmission(id) {
  return request({
    url: `/api/installers/revisions/${id}`,
    method: 'delete'
  })
}
