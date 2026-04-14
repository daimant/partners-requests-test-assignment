import axios, { AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({ baseURL: 'http://localhost:3000' })

export default async function fetchPartnersApi () {
  try {
    const res = await api.get('/partners')
    if (res && res.data) return res.data
  } catch (e) {
    console.error(e)
  }
}
