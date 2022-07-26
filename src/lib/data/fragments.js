export const AllUserInfo = /* GraphQL */ `
  fragment AllUserInfo on User {
    id
    name
    username
    email
    isVerified
    role
    groups {
      id
      name
    }
    createdAt
    updatedAt
  }
`

export const AllSchoolYearInfo = /* GraphQL */ `
  fragment AllSchoolYearInfo on SchoolYear {
    id
    name
    startDate
    endDate
    groups {
      id
      name
    }
    createdAt
    updatedAt
  }
`
