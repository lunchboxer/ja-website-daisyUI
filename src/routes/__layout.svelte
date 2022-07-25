<script>
  import '../app.css'
  import Header from '$lib/Header.svelte'
  import Login from '$lib/Login.svelte'
  import Error from '$lib/Error.svelte'
  import { auth } from '$lib/data/auth'
  import { NotificationList } from '$lib/notifications'
  import { browser } from '$app/env'
  import { onMount } from 'svelte'
  import { themeChange } from 'theme-change'
  import SchoolLoader from '$lib/SchoolLoader.svelte'
  import SchoolYearLoader from '$lib/SchoolYearLoader.svelte'
  import { state } from '$lib/data/state'
  import { page } from '$app/stores'
  import SidebarNav from '$lib/SidebarNav.svelte'

  let checked = ''

  onMount(() => {
    themeChange(false)
  })

  // Loading automatically from localstorage. Fetching from server just in case.

  let checkedAuth = false

  // we want to avoid all flashing of login page before auth gets properly checked.
  const checkIfLoginNeeded = authStore => {
    if (!browser) return true
    const auth = localStorage.getItem('auth')
    const token = JSON.parse(auth)?.token
    checkedAuth = true
    return !token
  }
</script>

<SchoolLoader />
<SchoolYearLoader />

<div class="drawer drawer-mobile">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" bind:checked />
  <div class="drawer-content flex flex-col">
    <Header />

    <div class="container prose mx-auto px-4 py-4">
      {#if $state.school_fetch_error && $state.school_year_fetch_error}
        <Error
          errors="Unable to fetch data from server. Check server endpoint settings"
        />
      {/if}

      {#if checkIfLoginNeeded($auth) && checkedAuth && $page.url.pathname !== '/settings'}
        <Login />
      {:else}
        <slot />
      {/if}
    </div>
  </div>
  <SidebarNav bind:checked />
</div>

<NotificationList />
