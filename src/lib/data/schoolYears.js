import { writable } from 'svelte/store'
import { request } from './fetch-client'
import { GET_SCHOOL_YEARS, GET_SCHOOL_YEAR } from './queries'
import {
  UPDATE_SCHOOL_YEAR,
  DELETE_SCHOOL_YEAR,
  CREATE_SCHOOL_YEAR,
} from './mutations'
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
  const found = schoolYears.find(schoolYear => {
    const start = new Date(schoolYear.startDate).getTime()
    const end = new Date(schoolYear.endDate).getTime()
    return start < now && now < end
  })
  return found?.id
}

const updateAll = (schoolYears, all) => {
  schoolYears.all = all
  schoolYears.current = findCurrentSchoolYear(schoolYears.all)
  // now that changes have been made, make sure that active still exists
  if (schoolYears.active) {
    const foundActive = schoolYears.all.find(
      year => year.id === schoolYears.active,
    )
    if (!foundActive) schoolYears.active = ''
  }
  updateLocalStorage(schoolYears)
  return schoolYears
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
          const found = schoolYears.all.find(year => {
            return year.id === schoolyearId
          })
          if (!found) throw new Error('School Year not found')
          schoolYears.active = found.id
          updateLocalStorage(schoolYears)
          return schoolYears
        }
      }),
    get: async id => {
      if (id) {
        const response = await request(GET_SCHOOL_YEAR, { id })
        if (response.schoolYear === null) {
          throw new Error('School Year not found')
        }
        update(schoolYears => {
          const otherYears = schoolYears.all.filter(
            schoolYear => schoolYear.id !== id,
          )
          return updateAll(schoolYears, [...otherYears, response.schoolYear])
        })
        return response.schoolYear
      }
      const response = await request(GET_SCHOOL_YEARS)
      update(schoolYears => updateAll(schoolYears, response.schoolYears))
    },
    patch: async schoolYear => {
      const response = await request(UPDATE_SCHOOL_YEAR, { ...schoolYear })
      update(schoolYears => {
        const otherYears = schoolYears.all.filter(
          year => year.id !== schoolYear.id,
        )
        return updateAll(schoolYears, [
          ...otherYears,
          response.updateSchoolYear,
        ])
      })
    },
    remove: async id => {
      const response = await request(DELETE_SCHOOL_YEAR, { id })
      console.log(response)
      update(schoolYears => {
        const otherYears = schoolYears.all.filter(year => year.id !== id)
        return updateAll(schoolYears, otherYears)
      })
    },
    create: async variables => {
      const response = await request(CREATE_SCHOOL_YEAR, variables)
      console.log(response)
      update(schoolYears => {
        return updateAll(schoolYears, [
          ...schoolYears.all,
          response.createSchoolYear,
        ])
      })
    },
  }
}

export const schoolYears = createSchoolYearsStore()
