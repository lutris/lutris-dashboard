import request from '@/utils/request'

function paramsToObject(entries) {
  const result = {}
  for (const [key, value] of entries) {
    result[key] = value
  }
  return result
}

export function fetchSubmissions(url, order = 'newest') {
  let paramObj = new URLSearchParams()
  if (url) {
    const apiURL = new URL(url)
    url = apiURL.pathname
    paramObj = new URLSearchParams(apiURL.search)
  } else {
    url = '/api/installers/revisions'
  }
  paramObj.set('order', order)
  paramObj.set('type', 'submission')
  const params = paramsToObject(paramObj.entries())
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

export function fetchNewInstallers(url, order = 'newest') {
  let paramObj = new URLSearchParams()
  if (url) {
    const apiURL = new URL(url)
    url = apiURL.pathname
    paramObj = new URLSearchParams(apiURL.search)
  } else {
    url = '/api/installers'
  }
  paramObj.set('order', order)
  paramObj.set('status', 'new')
  return request({
    url: url,
    method: 'get',
    params: paramsToObject(paramObj.entries())
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
