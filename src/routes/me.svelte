<script>
  import { auth } from '$lib/data/auth'

  $: groupList = !$auth.groups?.length
    ? 'none'
    : $auth.groups.map(group => group.name).join(', ')

  const getDateString = date => {
    const dateObject = new Date(date)
    return dateObject.toUTCString()
  }
</script>

<h1>User Profile</h1>
{#if $auth.id}
  <div class="overflow-x-auto">
    <table class="table w-full">
      <!-- head -->
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr>
          <td>name</td>
          <td>{$auth.name}</td>
        </tr>
        <tr>
          <td>ID</td>
          <td>{$auth.id}</td>
        </tr>
        <tr>
          <td>username</td>
          <td>{$auth.username}</td>
        </tr>
        <tr>
          <td>role</td>
          <td>{$auth.role}</td>
        </tr>
        <tr>
          <td>email</td>
          <td>{$auth.email || '--'}</td>
        </tr>
        <tr>
          <td>groups</td>
          <td>
            {groupList}
          </td>
        </tr>
        <tr>
          <td>created</td>
          <td>
            {getDateString($auth.createdAt)}
          </td>
        </tr>
        <tr>
          <td>updated</td>
          <td>
            {getDateString($auth.updatedAt)}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
{/if}
