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

export function acceptSubmission(submission) {
  const id = submission.revision_id
  submission.action = 'accept'
  return request({
    url: `/api/installers/revisions/${id}`,
    method: 'put',
    data: submission
  })
}

export function deleteSubmission(id) {
  return request({
    url: `/api/installers/revisions/${id}`,
    method: 'delete'
  })
}

export function deleteInstaller(id) {
  return request({
    url: `/api/installers/id/${id}`,
    method: 'delete'
  })
}
