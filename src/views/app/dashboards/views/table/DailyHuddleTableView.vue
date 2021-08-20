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
            <span>{{ row.phone }}</span>
          </td>
          <td>
            <span><i class="i-Receipt c-pointer"></i></span>
          </td>
          <td>
            <span>{{ row.lastTreatment }}</span>
          </td>
          <td>
            <span>{{ row.pendingTreatment }}</span>
          </td>
          <td>
            <span>{{ row.insuranceExample }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "DailyHuddleTable",
  props: {
    columns: Array,
    rows: Array,
  },
};
</script>