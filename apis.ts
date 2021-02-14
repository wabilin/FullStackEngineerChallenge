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
