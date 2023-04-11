import request from '@/utils/system/request.js'

export function fetchStats() {
  return request({
    url: '/api/games/stats',
    method: 'get'
  })
}

export function searchGames(query) {
  if (!query) {
    return {
      results: []
    }
  }
  return request({
    url: '/api/games',
    method: 'get',
    params: { 'search': query }
  })
}

export function getGame(slug) {
  return request({
    url: `/api/games/${slug}`,
    method: 'get'
  })
}

export function fetchGameSubmissions() {
  return request({
    url: `/api/games/submissions`,
    method: 'get'
  })
}


export function fetchGameChanges() {
  return request({
    url: `/api/games/changes`,
    method: 'get'
  })
}


export function sendSubmissionAccept(submissionID) {
  return request({
    url: `/api/games/submissions/${submissionID}`,
    method: 'post',
    data: {"accepted": true}
  })
}

export function sendSubmissionReject(submissionID) {
  return request({
    url: `/api/games/submissions/${submissionID}`,
    method: 'post',
    data: {"accepted": false}
  })
}

export function mergeGames(slug1, slug2) {
  return request({
    url: `/api/games/${slug1}/merge/${slug2}`,
    method: 'post'
  })
}


export function fetchGameScreenshots() {
  return request({
    url: `/api/games/screenshots`,
    method: 'get'
  })
}

export function sendScreenshotReview(screenshotId, accepted) {
  return request({
    url: `/api/games/screenshots/${screenshotId}`,
    method: 'post',
    data: {"accepted": accepted}
  })
}
