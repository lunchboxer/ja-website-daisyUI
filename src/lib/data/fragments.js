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
