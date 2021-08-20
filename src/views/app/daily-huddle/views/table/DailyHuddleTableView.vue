<template>
  <div>
    <div class="card-table table-responsive">
      <vue-good-table
          mode="remote"
          :columns="columns"
          @on-page-change="onPageChange"
          @on-sort-change="onSortChange"
          @on-column-filter="onColumnFilter"
          @on-per-page-change="onPerPageChange"
          @on-search="onSearch"
          :isLoading="isLoading"
          :totalRows="totalRecords"
          :line-numbers="true"
          :search-options="{
            enabled: false,
            placeholder: 'Search appointments',
            selectionInfoClass: 'flex-column flex-sm-row',
          }"
          :pagination-options="{
            enabled: true,
            mode: 'records',
          }"
          styleClass="tableOne vgt-table"
          :selectOptions="{
            enabled: false,
            selectionInfoClass: 'table-alert__box',
          }"
          :rows="rows"
        >
      </vue-good-table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  name: "DailyHuddleTable",
  props: {},
  data() {
    return { 
      columns: [
        {
          label: "Date/Time",
          field: row => row.start_time,
        },
        {
          label: "Duration (in mins)",
          field: row => row.duration,
        },        
        {
          label: "Provider",
          field: row => row.provider.full_name,
        },
        {
          label: "Patient",
          field: row => row.patient.full_name,
        },
        {
          label: "Status",
          field: 'status'
        },
        {
          label: "Operatory",
          field: row => row.operatory.name,
        },
      ],
      // rows: [],
      // serverParams: {expand: 'provider,patient,operatory'},
      // isLoading: false,
      // totalRecords: 0,
    };
  },
  mounted() {
    this.listAppointments();
  },
  computed: {
    ...mapGetters({
      rows: "appointments",
      isLoading: "appt_isLoading",
      totalRecords: "appt_totalRecords",
      serverParams: "appt_serverParams"
    })
  },
  methods: {
    ...mapActions(["listAppointments"]),
    ...mapMutations({
      updateParams: "appt_serverParams"
    }),
    // Table
    onPageChange(params) {
      console.log('onPageChange', params)
      this.updateParams({page: params.currentPage});
      this.listAppointments();
    },
    onPerPageChange(params) {
      console.log('onPerPageChange', params)
      this.updateParams({limit: params.currentPage});
      this.listAppointments();
    },
    onSortChange(params) {
      console.log('onSortChange', params)
      var r = [];
      for(var i=0; i < params.length; i++){
        const f = params[i];
        const f_ = (f.type=='desc'?'-':'') + f.field
        r.push(f_);
      }
      if(r.length > 0){
        this.updateParams({
          ordering: r.join(','),
        });
        this.listAppointments();
      }

    },
    onColumnFilter(params) {
      this.updateParams(params);
      this.listAppointments();
    },
    onSearch(params){
      this.updateParams({search: params.searchTerm});
      this.listAppointments()
    },
  },
};
</script>