<script>
  import { schoolYears } from '$lib/data/schoolYears'
  import ActiveSchoolYearSelect from '$lib/ActiveSchoolYearSelect.svelte'
</script>

<h1>School Years</h1>

{#if $schoolYears}
  <p>{$schoolYears.all?.length} school years in system.</p>

  {#if $schoolYears.all?.length > 0}
    {#if $schoolYears.current}
      <p>Current school year: {$schoolYears.current.name}</p>
    {:else}
      <p>Not currently in a recorded school year.</p>
    {/if}

    <ActiveSchoolYearSelect selected={$schoolYears.active.id} />
  {/if}

  <!-- Some kind of table would be nice have an edit and a delete button for the list -->

  <!-- Add school year form -->
{:else}
  <p>School Years not loaded.</p>
{/if}
