import { writable } from 'svelte/store'
import { request } from './fetch-client'
import { GETSCHOOL } from './queries'
import { UPDATE_SCHOOL } from './mutations'

const getSchoolFromStorage = () => {
  const coldSchool =
    typeof localStorage !== 'undefined' && localStorage.getItem('school')
  if (!coldSchool || coldSchool === 'undefined') return
  return JSON.parse(coldSchool)
}

const createSchoolStore = () => {
  // pull token and user from localStorage if it's there
  const school = getSchoolFromStorage()
  const { subscribe, set } = writable({ ...school })
  return {
    subscribe,
    get: async () => {
      const response = await request(GETSCHOOL)
      typeof localStorage !== 'undefined' &&
        localStorage.setItem('school', JSON.stringify(response.school))
      const school = response.school
      set({ ...school })
    },
    edit: async variables => {
      const response = await request(UPDATE_SCHOOL, variables)
      typeof localStorage !== 'undefined' &&
        localStorage.setItem('school', JSON.stringify(response.editSchool))
      const school = response.editSchool
      set({ ...school })
    },
  }
}

export const school = createSchoolStore()
