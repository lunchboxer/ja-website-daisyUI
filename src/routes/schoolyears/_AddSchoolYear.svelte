<script>
  import { schoolYears } from '$lib/data/schoolYears'
  import Form from '$lib/Form.svelte'
  import Input from '$lib/Input.svelte'

  let name
  let startDate
  let endDate
  const onReset = () => {
    name = ''
    startDate = ''
    endDate = ''
  }
  const onSubmit = async () => {
    await schoolYears.create({ name, startDate, endDate })
    onReset()
  }
</script>

<h2>Add School Year</h2>

<Form {onReset} {onSubmit} submitLabel="Add">
  <Input bind:value={name} label="Name" required />
  <Input bind:value={startDate} label="Start Date" type="date" required />
  <Input bind:value={endDate} label="End Date" type="date" required />
</Form>
