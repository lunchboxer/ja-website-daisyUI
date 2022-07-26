<script>
  import { page } from '$app/stores'
  import { schoolYears } from '$lib/data/schoolYears'
  import { onMount } from 'svelte'
  import Error from '$lib/Error.svelte'
  import Input from '$lib/Input.svelte'
  import Form from '$lib/Form.svelte'
  import DeleteSchoolYear from '../_DeleteSchoolYear.svelte'
  import { notifications } from '$lib/notifications'

  let errors = ''

  let name = ''
  let startDate = ''
  let endDate = ''
  let id

  onMount(async () => {
    id = $page.params.id
    try {
      const schoolYear = await schoolYears.get(id)
      loadValues(schoolYear)
    } catch (error) {
      errors = error
    }
  })
  const onSubmit = async () => {
    await schoolYears.patch({ id, name, startDate, endDate })
    notifications.add({
      type: 'success',
      text: `Saved school year ${name}`,
    })
  }
  const onReset = () => {
    console.log('reset ')
    loadValues($schoolYears.all.find(year => year.id === id))
  }

  const loadValues = schoolYear => {
    name = schoolYear.name
    startDate = schoolYear.startDate
    endDate = schoolYear.endDate
  }
</script>

<Error {errors} />
<h1>Edit School Year</h1>

{#if name}
  <Form {onSubmit} {onReset} onError={onReset} submitLabel="Save changes">
    <Input bind:value={name} label="Name" required />
    <Input bind:value={startDate} label="Start Date" type="date" required />
    <Input bind:value={endDate} type="date" label="End Date" required />
  </Form>

  <DeleteSchoolYear {id} />
{/if}
