import axios from 'axios'

export function login(username: string, password: string) {
  return axios.post('/api/login', {
    username,
    password,
  })
}

export function logout() {
  return axios.post('/api/logout')
}

export function createUser(username: string, password: string) {
  return axios.post('/api/users', {
    username,
    password,
  })
}

export function deleteUser(id: number) {
  return axios.delete(`/api/users/${id}`)
}

export function createReview(userId: number, body: string) {
  return axios.post('/api/reviews', { userId, body })
}
export function updateReview(id: number, body: string) {
  return axios.put(`/api/reviews/${id}`, { body })
}

export function assignFeedback(reviewId: number, userId: number) {
  return axios.post('/api/feedbackRequests', { userId, reviewId })
}

export function createFeedback(reviewId: number, feedback: string) {
  return axios.post('/api/feedbacks', { reviewId, feedback })
}
