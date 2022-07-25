import { variables } from '$lib/environment.js'

const { endpoint } = variables

export const request = async (query, variables) => {
  const coldAuth = window.localStorage.getItem('auth')
  const token = coldAuth ? JSON.parse(coldAuth).token : undefined
  const url = window.localStorage.getItem('endpoint') || endpoint
  const body =
    typeof query === 'function'
      ? query(variables)
      : JSON.stringify({ query, variables })
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` || '',
    },
    body,
  })
  const result = response && (await response.json())
  if (response && response.ok && !result.errors && result.data) {
    return result.data
  } else {
    throw result.errors
  }
}
