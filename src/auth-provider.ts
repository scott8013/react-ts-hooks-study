// 在真实环境中，如果使用firabase这种第三方auth服务的话 本文件不需要开发这开发

import { User } from 'screens/project-list/search-panel'

const localStorageKey = '__auth_provider_token__'
const apiUrl = process.env.REACT_APP_API_URL
export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = (data: { username: string; password: string }) => {
  return window
    .fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then(async (res) => {
      if (res.ok) {
        return handleUserResponse(await res.json())
      } else {
        const e = await res.json()
        return Promise.reject(e)
      }
    })
}

export const register = (data: { username: string; password: string }) => {
  return window
    .fetch(`${apiUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then(async (res) => {
      if (res.ok) {
        return handleUserResponse(await res.json())
      } else {
        return Promise.reject(await res.json())
      }
    })
}

export const logout = async () => window.localStorage.removeItem(localStorageKey)
