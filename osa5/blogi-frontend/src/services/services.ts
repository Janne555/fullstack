import axios from 'axios'

const BASE_URL = '/api/blogs'

export function getAll() {
  return axios.get(BASE_URL)
    .then(response => response.data)
}