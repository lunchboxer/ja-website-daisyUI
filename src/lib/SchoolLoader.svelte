<script>
  import { school } from '$lib/data/school'
  import { state } from '$lib/data/state'
  import { notifications } from '$lib/notifications'
  import { browser, dev } from '$app/env'

  if (browser) {
    school
      .get()
      .then(() => {
        state.update(old => {
          old.school_fetch_error = 0
          return old
        })
      })
      .catch(error => {
        dev && console.error(error)
        state.update(old => {
          old.school_fetch_error = 1
          return old
        })
        notifications.add({
          type: 'error',
          text: "Couldn't fetch school data.",
        })
      })
  }
</script>
