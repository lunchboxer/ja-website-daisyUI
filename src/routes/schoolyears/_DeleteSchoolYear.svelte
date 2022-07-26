<script>
  import { schoolYears } from '$lib/data/schoolYears'
  import Error from '$lib/Error.svelte'
  import { goto } from '$app/navigation'
  export let id
  let errors = ''

  const schoolYear = $schoolYears.all.find(year => year.id === id)

  const deleteSchoolYear = async () => {
    try {
      await schoolYears.remove(id)
      goto('/schoolyears')
    } catch (error) {
      errors = error
    }
  }
</script>

<Error {errors} />

<h2>Delete School Year</h2>
<p>This school year has {schoolYear.groups?.length} groups connected to it.</p>
<button class="btn btn-error" on:click={deleteSchoolYear}>Delete</button>
