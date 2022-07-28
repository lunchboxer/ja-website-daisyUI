import { writable } from 'svelte/store'
import { request } from './fetch-client'
import { GROUP, GROUPS } from './queries.graphql'

// it may be useful to have a division between the active school year's groups and all groups
// we could just keep groups nested in schoolyears
// I think in the UI I'll want to have all the groups, then sort and filter them.
function createGroupsStore() {
  // the server should return an array so null indicates we haven't hit the server yet
  const { subscribe, set, update } = writable()
  return {
    subscribe,
    get: async id => {
      if (id) {
        const response = await request(GROUP, { id })
        if (response.group === null) {
          throw new Error('group not found')
        }
        update(groups => {
          return groups.map(group => {
            if (group.id === id) return response.group
            return group
          })
        })
        return response.group
      }
      const response = await request(GROUPS)
      set(response.groups)
    },
  }
}

export const groups = createGroupsStore()
