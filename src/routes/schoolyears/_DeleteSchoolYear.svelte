<script>
  import { schoolYears } from '$lib/data/schoolYears'
  import Error from '$lib/Error.svelte'
  import { goto } from '$app/navigation'
  import { notifications } from '$lib/notifications'
  export let id
  let errors = ''

  const schoolYear = $schoolYears.all.find(year => year.id === id)

  const deleteSchoolYear = async () => {
    try {
      await schoolYears.remove(id)
      notifications.add({
        type: 'success',
        text: `Deleted school year ${schoolYear.name}`,
      })
      goto('/schoolyears')
    } catch (error) {
      errors = error
    }
  }
</script>

<Error {errors} />

<h2>Delete School Year</h2>
{#if schoolYear.groups?.length > 0}
  <div class="alert alert-warning shadow-lg">
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current flex-shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        /></svg
      >
      <span
        >This school year has {schoolYear.groups?.length} groups connected to it.
        Move these groups to another schoool year before deleting.</span
      >
    </div>
  </div>
{:else}
  <label for="my-modal" class="btn modal-button">Delete</label>

  <!-- Put this part before </body> tag -->
  <input type="checkbox" id="my-modal" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative">
      <label
        for="my-modal"
        class="btn btn-sm btn-circle absolute right-2 top-2"
      >
        ✕
      </label>
      <h3>
        Really delete school year '{schoolYear.name}'?
      </h3>
      <p>This action cannot be undone.</p>
      <div class="modal-action">
        <label for="my-modal" class="btn">nevermind</label>
        <label for="my-modal" class="btn btn-error" on:click={deleteSchoolYear}
          >Delete</label
        >
      </div>
    </div>
  </div>{/if}
