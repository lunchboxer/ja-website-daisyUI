<script>
  let input
  export let value
  export let label = ''
  export let error = false
  export let required = false
  export let pattern = '^.+$'
  export let minlength = 1
  export let maxlength
  export let type = 'text'
  export let description = ''
  export let min
  export let max
  let show = false

  $: name = label.replace(/\W+(.)/g, (match, chr) => chr.toUpperCase())
  $: descriptionId = `description${name}`

  function checkValidity() {
    error =
      !input.validity.valid && input.validationMessage
        ? input.validationMessage
        : ''
  }
  const toggleShow = () => {
    if (type === 'password' && show) {
      input.type = 'text'
    } else if (!show) {
      input.type = 'password'
    }
  }
</script>

<div class="form-control">
  <label class="label" for={name}>
    <span class="label-text">{label}</span>
    {#if error}
      <span class="lable-text error-text">{error}</span>
    {/if}
  </label>

  {#if type === 'date'}
    <input
      bind:this={input}
      bind:value
      class="input input-bordered"
      class:input-error={error}
      type="date"
      {required}
      {name}
      {min}
      {max}
      aria-describedby={descriptionId}
      on:input={checkValidity}
      on:invalid|preventDefault={checkValidity}
    />
  {/if}
  {#if type === 'text'}
    <input
      bind:this={input}
      bind:value
      class="input input-bordered"
      class:input-error={error}
      type="text"
      {required}
      {name}
      {pattern}
      {minlength}
      {maxlength}
      aria-describedby={descriptionId}
      on:input={checkValidity}
      on:invalid|preventDefault={checkValidity}
    />
  {/if}
  {#if type === 'password'}
    <input
      bind:this={input}
      bind:value
      class="input input-bordered"
      class:input-error={error}
      type="password"
      {required}
      {name}
      {pattern}
      {minlength}
      {maxlength}
      aria-describedby={descriptionId}
      on:input={checkValidity}
      on:invalid|preventDefault={checkValidity}
    />
  {/if}
  {#if type === 'password' || show === true}
    <div class="form-control justify-end">
      <label class="label cursor-pointer">
        <span class="label-text">{show ? 'hide' : 'show'}</span>
        <input
          type="checkbox"
          class="toggle"
          bind:checked={show}
          on:change={toggleShow}
        />
      </label>
    </div>
  {/if}

  {#if description}
    <label class="label" for={name}>
      <span class="label-text-alt help-text" id={descriptionId}>
        {description}
      </span>
    </label>
  {/if}
</div>

<style>
  .error-text {
    font-size: 0.875rem;
    color: hsl(var(--er));
  }
  .help-text {
    font-size: 0.875rem;
    color: hsl(var(--in));
  }
</style>
