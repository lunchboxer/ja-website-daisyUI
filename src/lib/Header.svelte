<script>
  import { auth } from '$lib/data/auth'
  import { notifications } from '$lib/notifications'
  import { goto } from '$app/navigation'
  import Logo from '$lib/Logo.svelte'

  const logout = async () => {
    if (!$auth.token) {
      notifications.add({
        text: 'Cannot log out. User not logged in.',
        type: 'error',
      })
      return
    }
    const username = await auth.logout()
    notifications.add({ text: `Logged out user ${username}`, type: 'success' })
    goto('/')
  }
</script>

<nav class="navbar">
  <div class="flex-none lg:hidden">
    <label for="my-drawer" class="btn btn-square btn-ghost drawer-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="inline-block w-5 h-5 stroke-current"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        /></svg
      >
    </label>
  </div>
  <div class="flex-1">
    <div class="lg:hidden">
      <Logo />
    </div>
  </div>
  <div class="flex-none">
    <div class="dropdown dropdown-end dropdown-hover">
      <label tabindex="0" class="btn btn-square btn-ghost m-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-5 h-5 stroke-current"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          /></svg
        >
      </label>
      <ul
        tabindex="0"
        class="menu dropdown-content p-2 shadow bg-base-300 rounded-box w-52"
      >
        {#if $auth.id}
          <li>
            <a href="/me" class="justify-between"> Profile </a>
          </li>
        {/if}
        <li><a href="/settings">Settings</a></li>
        {#if $auth.id}
          <li><button on:click={logout}>Logout</button></li>
        {/if}
      </ul>
    </div>
  </div>
</nav>
