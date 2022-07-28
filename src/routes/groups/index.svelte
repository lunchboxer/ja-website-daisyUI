<script>
  import { groups } from '$lib/data/groups.js'
  import { onMount } from 'svelte'
  import Loading from '$lib/Loading.svelte'
  import AddGroup from './_AddGroup.svelte'

  onMount(async () => {
    await groups.get()
  })
</script>

<h1>Groups</h1>

{#if $groups}
  <p>{$groups.length} groups in system.</p>
{:else}
  <Loading message="loading groups" />
{/if}

<AddGroup />
