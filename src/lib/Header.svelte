<script>
  import { auth } from '$lib/data/auth'
  import { notifications } from '$lib/notifications'
  import { goto } from '$app/navigation'
  import Logo from '$lib/Logo.svelte'
  import MenuDotsIcon from '$lib/icons/MenuDotsIcon.svelte'
  import MenuHamburgerIcon from '$lib/icons/MenuHamburgerIcon.svelte'
  import ProfileIcon from '$lib/icons/ProfileIcon.svelte'
  import SettingsIcon from '$lib/icons/SettingsIcon.svelte'
  import LogoutIcon from '$lib/icons/LogoutIcon.svelte'

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
  <div class="navbar-start">
    <div class="flex-none lg:hidden">
      <label for="my-drawer" class="btn btn-square btn-ghost drawer-button">
        <MenuHamburgerIcon />
      </label>
    </div>
  </div>
  <div class="navbar-center">
    <div class="lg:hidden">
      <Logo />
    </div>
  </div>
  <div class="navbar-end">
    <div class="dropdown dropdown-end">
      <label for="dropdown-menu" tabindex="0" class="btn btn-square btn-ghost">
        <MenuDotsIcon />
      </label>
      <ul
        tabindex="0"
        id="dropdown-menu"
        class="menu dropdown-content p-2 shadow bg-base-300 rounded-box"
      >
        {#if $auth.id}
          <li>
            <a href="/me"><ProfileIcon />Profile</a>
          </li>
        {/if}
        <li><a href="/settings"><SettingsIcon />Settings</a></li>
        {#if $auth.id}
          <li><button on:click={logout}><LogoutIcon />Logout</button></li>
        {/if}
      </ul>
    </div>
  </div>
</nav>
