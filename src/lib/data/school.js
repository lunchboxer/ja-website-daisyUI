import { writable } from 'svelte/store'
import { request } from './fetch-client'
import { SCHOOL, UPDATE_SCHOOL } from './queries.graphql'

const getSchoolFromStorage = () => {
  const coldSchool =
    typeof localStorage !== 'undefined' && localStorage.getItem('school')
  if (!coldSchool || coldSchool === 'undefined') return
  return JSON.parse(coldSchool)
}

const createSchoolStore = () => {
  // pull school info from localStorage if it's there
  const school = getSchoolFromStorage()
  const { subscribe, set } = writable({ ...school })
  return {
    subscribe,
    get: async () => {
      const response = await request(SCHOOL)
      typeof localStorage !== 'undefined' &&
        localStorage.setItem('school', JSON.stringify(response.school))
      const school = response.school
      set({ ...school })
    },
    edit: async variables => {
      const response = await request(UPDATE_SCHOOL, variables)
      typeof localStorage !== 'undefined' &&
        localStorage.setItem('school', JSON.stringify(response.updateSchool))
      const school = response.updateSchool
      set({ ...school })
    },
  }
}

export const school = createSchoolStore()
