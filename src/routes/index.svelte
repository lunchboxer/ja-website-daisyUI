<script>
  import { school } from '$lib/data/school'
  import { schoolYears } from '$lib/data/schoolYears'
  import ActiveSchoolYearSelect from '$lib/ActiveSchoolYearSelect.svelte'
</script>

{#if $school?.name}
  <h2>{$school.name}</h2>
  <ActiveSchoolYearSelect selected={$schoolYears?.active} />
{:else}
  <h1>Setting up deployment</h1>
  <p>This deployment has not been set up yet.</p>
  <a href="/school" class="btn btn-primary">set up now</a>
{/if}
