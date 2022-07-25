<script>
  import { schoolYears } from '$lib/data/schoolYears'
  let errors = ''

  export let selected = '0'

  const selectActive = () => {
    if (!selected) return
    try {
      schoolYears.setActive(selected)
    } catch (error) {
      errors = error
    }
  }
</script>

{#if $schoolYears?.all?.length > 0}
  <div class="form-control w-full max-w-xs">
    <label class="label" for="schoolYearSelect">
      <span class="label-text">School Year</span>
      {#if errors}
        <span class="label-text error-text">
          {errors}
        </span>
      {/if}
    </label>
    <select
      name="schoolYearSelect"
      bind:value={selected}
      on:change={selectActive}
      class="select select-bordered w-full max-w-xs"
    >
      <option disabled selected value="0">
        Select a school year to work on
      </option>
      {#each $schoolYears.all as schoolYear}
        <option value={schoolYear.id}>{schoolYear.name}</option>
      {/each}
    </select>
  </div>
{:else}
  <p>No school years have been add yet.</p>
{/if}
