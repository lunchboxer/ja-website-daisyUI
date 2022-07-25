<script>
  import { school } from '$lib/data/school'
  import { notifications } from '$lib/notifications'
  import Loading from '$lib/Loading.svelte'
  import Error from '$lib/Error.svelte'
  import Input from '$lib/Input.svelte'
  import Textarea from '$lib/Textarea.svelte'
  import { browser } from '$app/env'

  if (browser) {
    school.get()
  }

  let name = $school.name
  let address = $school.address
  let form
  let errors = ''
  let disabled = false
  let loading = false

  const editSchool = async () => {
    const isValid = form.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'error',
      })
      return
    }
    loading = true
    disabled = true
    try {
      await school.edit({ name, address })
      notifications.add({
        text: `Saved changes for ${name}.`,
        type: 'success',
      })
    } catch (error) {
      console.error(error)
      errors = error
      notifications.add({ text: 'Could not save changes.', type: 'error' })
    } finally {
      loading = false
      disabled = false
    }
  }

  const reset = () => {
    address = $school.address
    name = $school.name
  }
  const loadValues = store => {
    address = store.address
    name = store.name
    return true
  }
</script>

<h1>School</h1>

{#if loading}
  <Loading message="Saving school info" />
{/if}

<Error {errors} />
{#if loadValues($school)}
  <form
    bind:this={form}
    novalidate
    on:submit|preventDefault={editSchool}
    on:reset|preventDefault={reset}
  >
    <fieldset {disabled}>
      <Input bind:value={name} label="Name" required />
      <Textarea bind:value={address} label="Address" required />
      <p>
        <button type="reset" class="btn btn-error btn-outline" {disabled}>
          reset
        </button>
        <button type="submit" class="btn btn-success btn-outline" {disabled}>
          {loading ? 'Saving' : 'Save Changes'}
        </button>
      </p>
    </fieldset>
  </form>
{/if}
