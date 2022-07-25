<script>
  import ThemeSwitcher from '$lib/ThemeSwitcher.svelte'
  import { variables } from '$lib/environment.js'
  import Input from '$lib/Input.svelte'
  import { browser } from '$app/env'
  import { notifications } from '$lib/notifications'

  const { endpoint } = variables

  let customEndpoint = ''
  let endpointForm
  let error = ''

  function isValidHttpUrl(string) {
    let url

    try {
      url = new URL(string)
    } catch {
      return false
    }

    return url.protocol === 'http:' || url.protocol === 'https:'
  }
  const saveCustomEndpoint = () => {
    if (!isValidHttpUrl(customEndpoint)) {
      error = 'Not a valid http url'
    } else if (browser) {
      window.localStorage.setItem('endpoint', customEndpoint)
      notifications.add({ type: 'success', text: 'Changed server endpoint' })
      window.location = './'
    }
  }
  const resetEndpoint = () => {
    loadEndpoint()
    browser && window.localStorage.removeItem('endpoint')
  }
  const useDefaultEndpoint = () => {
    customEndpoint = endpoint
    browser && window.localStorage.removeItem('endpoint')
  }

  const loadEndpoint = () => {
    customEndpoint =
      (browser && window.localStorage.getItem('endpoint')) || endpoint
    return true
  }
</script>

<h1>Settings</h1>

<h2>Appearance</h2>
<ThemeSwitcher />

<h2>Server Endpoint</h2>
<p>Default: {endpoint}</p>
<p>
  <button class="btn-secondary btn" on:click={useDefaultEndpoint}>
    Use default
  </button>
</p>

{#if loadEndpoint()}
  <form
    bind:this={endpointForm}
    novalidate
    on:submit|preventDefault={saveCustomEndpoint}
    on:reset|preventDefault={resetEndpoint}
  >
    <Input bind:value={customEndpoint} label="Endpoint" {error} required />
    <p>
      <button type="reset" class="btn btn-error btn-outline"> reset </button>
      <button type="submit" class="btn btn-success btn-outline">
        Save custom endpoint
      </button>
    </p>
  </form>
{/if}
