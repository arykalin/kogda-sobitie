import axios from 'axios'

const baseURL = "http://127.0.0.1:8080"
// const baseURL = "https://api.kogda-sobitie.ga:8443"

const httpClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default httpClient
