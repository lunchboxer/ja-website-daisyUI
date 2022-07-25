import { createClient } from 'graphql-ws'
// import { SubscriptionClient } from 'graphql-subscriptions-client'
import { variables } from '$lib/environment.js'
import { browser } from '$app/env'

const coldAuth =
  typeof localStorage !== 'undefined' && localStorage.getItem('auth')
const token = coldAuth ? JSON.parse(coldAuth).token : undefined

// SSR gets angry with websocket stuff
let requester = () => {}

if (browser) {
  const client = createClient({
    url: variables.endpoint,
    shouldRetry: () => true,
    connectionParams: { token },
  })

  // const client = new SubscriptionClient(variables.endpoint, {
  //   connectionParams: { token },
  //   connectionCallback: error => {
  //     error && console.error(error)
  //   },
  // })

  requester = async (query, variables) => {
    // const subscription = client.request({ query, variables }).subscribe({
    //   next(data) {
    //     if (data) {
    //       console.log("we've got something!", data)
    //     }
    //   },
    // })

    console.log('got to requester')
    const payload = JSON.stringify({ query, variables })
    console.log('payload is', payload)
    return new Promise((resolve, reject) => {
      let result
      client.subscribe(payload, {
        next: data => (result = data),
        error: reject,
        complete: () => resolve(result),
      })
    })
  }
}

export const request = requester
