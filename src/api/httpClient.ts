import axios from 'axios'

// const baseURL = "http://127.0.0.1:8080"
const baseURL = "https://95.216.158.138:80"

const httpClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default httpClient
