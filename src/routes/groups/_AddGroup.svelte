<script>
  import Form from '$lib/Form.svelte'
  import Input from '$lib/Input.svelte'
</script>

<h2>Add a group</h2>
<Form>
  <Input label="Name" required />
  <Input label="Grade" required />
</Form>
