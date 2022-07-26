import { AllUserInfo, AllSchoolYearInfo } from './fragments'

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

export const UPDATE_SCHOOL = /* GraphQL */ `
  mutation UpdateSchool($name: String, $address: String) {
    updateSchool(name: $name, address: $address) {
      name
      address
    }
  }
`

export const UPDATE_SCHOOL_YEAR = /* GraphQL */ `
  mutation UpdateSchoolYear(
    $id: ID!
    $name: String!
    $startDate: String!
    $endDate: String!
  ) {
    updateSchoolYear(
      id: $id
      name: $name
      startDate: $startDate
      endDate: $endDate
    ) {
      ...AllSchoolYearInfo
    }
  }
  ${AllSchoolYearInfo}
`

export const DELETE_SCHOOL_YEAR = /* GraphQL */ `
  mutation DeleteSchoolYear($id: ID!) {
    deleteSchoolYear(id: $id) {
      id
    }
  }
`

export const CREATE_SCHOOL_YEAR = /* Graphql */ `
  mutation CreateSchoolYear($name: String!, $startDate: String!, $endDate: String!){
    createSchoolYear(name: $name, startDate: $startDate, endDate: $endDate) {
      ...AllSchoolYearInfo
    }
  }
  ${AllSchoolYearInfo}
`
