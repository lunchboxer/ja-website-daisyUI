<script context="module">
  import { createClient, defaultExchanges } from '@urql/core'
  import { variables } from '$lib/environment'

  export const client = createClient({
    url: variables.endpoint,
    exchanges: defaultExchanges,
    fetchOptions: () => {
      const coldAuth = window.localStorage.getItem('auth')
      const token = coldAuth ? JSON.parse(coldAuth).token : undefined
      return {
        headers: { authorization: token ? `Bearer ${token}` : '' },
      }
    },
  })
</script>
