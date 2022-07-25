import { AllUserInfo } from './fragments'

export const LOGIN = /* GraphQL */ `
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        ...AllUserInfo
      }
    }
  }
  ${AllUserInfo}
`

export const CREATE_USER = /* GraphQL */ `
  mutation CreateUser(
    $username: String!
    $name: String
    $email: String
    $password: String!
  ) {
    createUser(
      username: $username
      name: $name
      email: $email
      password: $password
    ) {
      token
      user {
        ...AllUserInfo
      }
    }
  }
  ${AllUserInfo}
`

export const EDIT_SCHOOL = /* GraphQL */ `
  mutation EditSchool($name: String, $address: String) {
    editSchool(name: $name, address: $address) {
      name
      address
    }
  }
`
