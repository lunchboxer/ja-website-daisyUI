<script>
  import Logo from '$lib/Logo.svelte'
  import { schoolYears } from '$lib/data/schoolYears'
  export let checked = ''
</script>

<div class="drawer-side">
  <label for="my-drawer" class="drawer-overlay" />
  <ul
    class="menu p-4 overflow-y-auto w-64 bg-base-300 text-base-content"
    on:click={() => {
      checked = ''
    }}
  >
    <Logo />
    <div class="divider" />
    <!-- Sidebar content here -->
    <li class="m-1"><a href="/school">School</a></li>
    <li class="m-1">
      <a href="/schoolyears">
        School Years
        {#if $schoolYears?.all}
          <div class="badge">{$schoolYears.all.length}</div>
        {/if}
      </a>
    </li>
  </ul>
</div>
