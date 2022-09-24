import request from "@/utils/request";

export function fetchStats() {
  return request({
    url: "/api/games/stats",
    method: "get",
  });
}

export function searchGames(query) {
  if (!query) {
    return {
      results: [],
    };
  }
  return request({
    url: "/api/games",
    method: "get",
    params: { search: query },
  });
}

export function getGame(slug) {
  return request({
    url: `/api/games/${slug}`,
    method: "get",
  });
}

export function fetchGameSubmissions() {
  return request({
    url: `/api/games/submissions`,
    method: "get",
  });
}

export function sendSubmissionAccept(submissionID) {
  return request({
    url: `/api/games/submissions/${submissionID}`,
    method: "post",
  });
}

export function mergeGames(slug1, slug2) {
  return request({
    url: `/api/games/${slug1}/merge/${slug2}`,
    method: "post",
  });
}
