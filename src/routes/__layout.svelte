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
  import Logo from '$lib/Logo.svelte'

  let checked = ''

  $: console.log(checked)

  const toggleSidebar = () => {
    checked = checked === 'checked' ? '' : 'checked'
  }
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

    {#if $state.school_fetch_error && $state.school_year_fetch_error}
      <Error
        errors="Unable to fetch data from server. Check server endpoint settings"
      />
    {/if}

    <div class="container prose mx-auto px-4 py-4">
      {#if checkIfLoginNeeded($auth) && checkedAuth && $page.url.pathname !== '/settings'}
        <Login />
      {:else}
        <slot />
      {/if}
    </div>
  </div>
  <div class="drawer-side">
    <label for="my-drawer" class="drawer-overlay" />
    <ul
      class="menu p-4 overflow-y-auto w-80 bg-base-300 text-base-content"
      on:click={() => {
        checked = ''
      }}
    >
      <Logo />
      <div class="divider p-2" />
      <!-- Sidebar content here -->
      <li class="m-1"><a href="/school">School</a></li>
      <li class="m-1"><a href="/schoolyear">School Years</a></li>
    </ul>
  </div>
</div>
<NotificationList />
