<script>
  import { schoolYears } from '$lib/data/schoolYears'
  import { state } from '$lib/data/state'
  import { notifications } from '$lib/notifications'
  import { browser, dev } from '$app/env'

  if (browser) {
    schoolYears
      .get()
      .then(() => {
        state.update(old => {
          old.school_year_fetch_error = 0
          return old
        })
      })
      .catch(error => {
        dev && console.error(error)
        state.update(old => {
          old.school_year_fetch_error = 1
          return old
        })
        notifications.add({
          type: 'error',
          text: "Couln't fetch school year data.",
        })
      })
  }
</script>
