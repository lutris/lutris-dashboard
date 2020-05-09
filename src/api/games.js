import request from '@/utils/request'

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
