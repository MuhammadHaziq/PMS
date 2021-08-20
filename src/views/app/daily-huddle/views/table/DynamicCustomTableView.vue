<template>
  <div class="card-table table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th :key="column" v-for="column in columns">
            <span>{{ column }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td>
            <span>{{ row.time }} <label>12 Apr</label></span>
          </td>
          <td>
            <span>{{ row.location }}</span>
          </td>
          <td>
            <span>{{ row.name }}</span>
          </td>
          <td>
            <span>{{ row.dob }}</span>
          </td>
          <td>
            <span>{{ row.contact }}</span>
          </td>
          <td>
            <b-dropdown class="status-dropdown" :text="row.status">
              <b-dropdown-item
                v-for="status in statusList"
                :value="status.title"
                :key="status.id"
                @click="row.status = status.title"
                >{{ status.title }}</b-dropdown-item
              >
            </b-dropdown>
          </td>
          <!--<td>
            <span
              :class="{
                'badge-outline-success': row.status == 'Done',
                'badge-outline-danger': row.status !== 'Done',
              }"
              class="badge badge-pill p-2"
              >{{ row.status }}
            </span>
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "DynamicCustomTable",
  props: {
    columns: Array,
    rows: Array,
    statusList: Array,
  },
};
</script>