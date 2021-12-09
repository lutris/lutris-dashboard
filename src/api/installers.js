import request from '@/utils/request'

export function fetchSubmissions(url, order) {
  let params = {}
  if (!order) {
    order = 'newest'
  }
  params.order = order
  if (!url) {
    url = '/api/installers/revisions'
    params = { type: 'submission', order: order }
  }

  return request({
    url: url,
    method: 'get',
    params: params
  })
}

export function fetchDrafts() {
  return request({
    url: '/api/installers/revisions',
    method: 'get',
    params: { type: 'draft' }
  })
}

export function fetchNewInstallers() {
  return request({
    url: '/api/installers',
    method: 'get',
    params: { status: 'new' }
  })
}

export function acceptInstaller(installer) {
  if (!installer) {
    throw new Error('Missing installer')
  }
  installer.published = true
  return request({
    url: '/api/installers/id/' + installer.id,
    method: 'patch',
    data: installer
  })
}

export function fetchInstaller(installerId) {
  if (!installerId) {
    throw new Error('Missing installer ID')
  }
  return request({
    url: '/api/installers/id/' + installerId,
    method: 'get'
  })
}

export function fetchSubmission(id) {
  if (!id) {
    throw new Error('Missing submission ID')
  }
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
  if (!id) {
    throw new Error('Missing installer ID')
  }
  return request({
    url: `/api/installers/id/${id}`,
    method: 'delete'
  })
}
