import { writable } from 'svelte/store'
import { request } from './fetch-client'
import { GET_SCHOOL_YEARS } from './queries'
import { browser } from '$app/env'

const getSchoolYearsFromStorage = () => {
  const coldSchoolYears = browser && localStorage.getItem('schoolYears')
  const schoolYears = coldSchoolYears && JSON.parse(coldSchoolYears)
  // update this as it could change from day to day
  if (schoolYears) schoolYears.current = findCurrentSchoolYear(schoolYears.all)
  return schoolYears
}

const updateLocalStorage = data => {
  browser && localStorage.setItem('schoolYears', JSON.stringify(data))
}

const findCurrentSchoolYear = schoolYears => {
  if (!Array.isArray(schoolYears)) return
  const now = Date.now()
  return schoolYears.find(schoolYear => {
    const start = new Date(schoolYear.startDate).getTime()
    const end = new Date(schoolYear.endDate).getTime()
    return start < now && now < end
  })
}

// the store is an object with all schoolyears with id as key and one of them keyed as "current"
// If no curent schoolyear exists then use upcoming
function createSchoolYearsStore() {
  // pull token and user from localStorage if it's there
  const schoolYears = getSchoolYearsFromStorage()
  const { subscribe, update } = writable(schoolYears)
  return {
    subscribe,
    setActive: schoolyearId =>
      update(schoolyears => {
        if (schoolYears && schoolYears.all) {
          schoolYears.active = schoolYears.all.find(year => {
            return year.id === schoolyearId
          })
          if (!schoolYears.active) throw new Error('School Year not found')
          updateLocalStorage(schoolYears)
          return schoolYears
        }
      }),
    get: async id => {
      if (id) return
      const response = await request(GET_SCHOOL_YEARS)
      update(schoolYears => {
        schoolYears.all = response.schoolYears
        schoolYears.current = findCurrentSchoolYear(schoolYears.all)
        updateLocalStorage(schoolYears)
        return schoolYears
      })
    },
  }
}

export const schoolYears = createSchoolYearsStore()
