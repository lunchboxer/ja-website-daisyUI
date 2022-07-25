<script>
  import { auth } from '$lib/data/auth'
  import { notifications } from '$lib/notifications'
  import Input from '$lib/Input.svelte'
  import Error from '$lib/Error.svelte'
  import Loading from '$lib/Loading.svelte'

  let email = ''
  let username = ''
  let name = ''
  let password = ''
  let signup = false
  let errors = ''
  let loginForm
  let signupForm
  let loading = false
  let disabled = false
  let message

  const toggleSignup = () => {
    signup = !signup
  }
  const login = async () => {
    const isValid = loginForm.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'error',
      })
      return
    }
    message = 'Processing login'
    loading = true
    disabled = true
    try {
      await auth.login({ username, password })
      notifications.add({ text: `Logged in as '${username}'`, type: 'success' })
    } catch (error) {
      console.error(error)
      errors = error
      notifications.add({ text: 'Login failed.', type: 'error' })
    } finally {
      loading = false
      disabled = false
    }
  }
  const create = async () => {
    const isValid = signupForm.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'error',
      })
      return
    }
    message = 'Processing signup'
    loading = true
    disabled = true
    try {
      await auth.createUser({ email, password, username, name })
      notifications.add({
        text: `Created new user '${username}'`,
        type: 'success',
      })
    } catch (error) {
      console.error(error)
      errors = error
      notifications.add({ text: 'Sign up failed.', type: 'error' })
    } finally {
      loading = false
      disabled = false
    }
  }
</script>

{#if loading}
  <Loading {message} />
{/if}

<Error {errors} />
{#if !signup}
  <h1>Log in to continue</h1>
  <form bind:this={loginForm} novalidate on:submit|preventDefault={login}>
    <fieldset {disabled}>
      <Input bind:value={username} label="Username" required />
      <Input type="password" bind:value={password} label="Password" required />
      <p>
        <button type="reset" class="btn btn-error btn-outline" {disabled}
          >reset</button
        >
        <button type="submit" class="btn btn-success btn-outline" {disabled}>
          {loading ? 'Logging in' : 'Log me in'}
        </button>
      </p>
    </fieldset>
  </form>

  <p>Don't have an account?</p>
  <p>
    <button
      class="btn btn-secondary btn-outline"
      {disabled}
      on:click={toggleSignup}>Create user</button
    >
  </p>
{:else}
  <h1>Create a user account</h1>
  <form bind:this={signupForm} novalidate on:submit|preventDefault={create}>
    <fieldset {disabled}>
      <Input bind:value={username} label="Username" required />
      <Input bind:value={email} label="Email" />
      <Input bind:value={name} label="Name" />
      <Input type="password" bind:value={password} label="Password" required />
      <p>
        <button type="reset" class="btn btn-error btn-outline" {disabled}>
          reset
        </button>
        <button type="submit" class="btn btn-success btn-outline" {disabled}>
          {loading ? 'Creating user' : 'Create user'}
        </button>
      </p>
    </fieldset>
  </form>

  <p>Already have an account?</p>
  <p>
    <button
      class="btn btn-secondary btn-outline"
      {disabled}
      on:click={toggleSignup}
    >
      Log in
    </button>
  </p>
{/if}
