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
      id
      name
      startDate
      endDate
      groups {
        id
      }
      createdAt
      updatedAt
    }
  }
`
