import axios from 'axios'

const baseURL = process.env.NODE_ENV
  ? 'http://localhost:3000/api/v1'
  : 'https://hohagtrip.com/api/v1'

const httpClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default httpClient
