<script>
  import { schoolYears } from '$lib/data/schoolYears'
  import ActiveSchoolYearSelect from '$lib/ActiveSchoolYearSelect.svelte'
  import SchoolYearRow from './_SchoolYearRow.svelte'
  import AddSchoolYear from './_AddSchoolYear.svelte'
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

    <ActiveSchoolYearSelect selected={$schoolYears.active} />

    <div class="overflow-x-auto w-full">
      <table class="table table-zebra w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {#each $schoolYears.all as schoolYear}
            <SchoolYearRow {schoolYear} />
          {/each}
        </tbody>
      </table>
    </div>
  {/if}
  <AddSchoolYear />
  <!-- Add school year form -->
{:else}
  <p>School Years not loaded.</p>
{/if}
