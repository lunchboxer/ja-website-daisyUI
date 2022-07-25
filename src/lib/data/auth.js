import { writable } from 'svelte/store'
import { request } from './fetch-client'
import { LOGIN, CREATE_USER } from './mutations'

const getAuthFromStorage = () => {
  const coldAuth =
    typeof localStorage !== 'undefined' && localStorage.getItem('auth')
  const user = coldAuth ? JSON.parse(coldAuth).user : undefined
  const token = coldAuth ? JSON.parse(coldAuth).token : undefined
  return { user, token }
}

const createAuthStore = () => {
  // pull token and user from localStorage if it's there
  const { user, token } = getAuthFromStorage()
  const { subscribe, set, update } = writable({
    ...user,
    token,
  })

  return {
    subscribe,
    login: async variables => {
      const response = await request(LOGIN, variables)
      window.localStorage.setItem('auth', JSON.stringify(response.login))
      update(previous => ({
        ...previous,
        ...response.login.user,
        token: response.login.token,
      }))
    },
    logout: () => {
      const { user } = getAuthFromStorage()
      window.localStorage.removeItem('auth')
      set({})
      return user && user.username
    },
    createUser: async parameters => {
      const response = await request(CREATE_USER, parameters)
      window.localStorage.setItem('auth', JSON.stringify(response.createUser))
      update(previous => ({
        ...previous,
        ...response.createUser.user,
        token: response.createUser.token,
      }))
    },
  }
}

export const auth = createAuthStore()
