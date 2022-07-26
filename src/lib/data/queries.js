import { AllSchoolYearInfo } from './fragments'

export const GETSCHOOL = /* GraphQL */ `
  {
    school {
      name
      address
    }
  }
`

export const GET_SCHOOL_YEARS = /* GraphQL */ `
  {
    schoolYears {
      ...AllSchoolYearInfo
    }
  }
  ${AllSchoolYearInfo}
`

export const GET_SCHOOL_YEAR = /* GraphQL */ `
  query SchoolYear($id: ID!) {
    schoolYear(id: $id) {
      ...AllSchoolYearInfo
    }
  }
  ${AllSchoolYearInfo}
`
