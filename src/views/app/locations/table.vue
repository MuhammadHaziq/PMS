<template>
  <div class="h-100">
    <div class="main-content table-list">
      <div class="wrapper">
        <vue-good-table
          mode="remote"
          @on-page-change="onPageChange"
          @on-sort-change="onSortChange"
          @on-column-filter="onColumnFilter"
          @on-per-page-change="onPerPageChange"
          @on-search="onSearch"
          :isLoading="isLoading"
          :columns="columns"
          :line-numbers="true"
          :search-options="{
            enabled: true,
            placeholder: 'Search',
            selectionInfoClass: ' flex-column flex-sm-row',
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
          <div slot="table-actions" class="mb-3">
            <b-button
              variant="primary"
              @click="
                () => {
                  $bvModal.show('add-location');
                }
              "
              class="btn-rounded d-sm-block d-none"
            >
              Add Location
            </b-button>
          </div>
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'action'">
              <a
                v-b-tooltip.hover
                class="o-hidden d-inline-block c-pointer"
                title="Delete"
              >
                <i
                  class="i-Close-Window text-25 text-danger"
                  @click="
                    confirmationPopup().then((result) => {
                      if (result.value) removeCard(props.row);
                    })
                  "
                ></i>
              </a>
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import * as moment from "moment";
// const STORAGE_KEY = 'invoice';
export default {
  data() {
    return {
      moment,
      // Table
      columns: [
        {
          label: "Location Name",
          field: "location_name",
        },
        {
          label: "Phone",
          field: "phone_number",
        },
        {
          label: "Company",
          field: "company",
        },
        {
          label: "Actions",
          field: "action",
        },
      ]
    };
  },
  mounted() {
    this.loadItems();
  },
  computed: mapGetters({
      getSelectedPractice: "getSelectedPractice",
      rows: "offices",
      isLoading: "office_isLoading",
      totalRecords: "office_totalRecords",
      serverParams: "office_serverParams"    
  }),
  methods: {
    ...mapActions(['listOffices']),
    ...mapMutations({
      updateParams: "office_serverParams"
    }),    
    confirmationPopup() {
      return this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
    },
    // Table
    onPageChange(params) {
      this.updateParams({page: params.currentPage});
      this.loadItems();
    },
    onPerPageChange(params) {
      this.updateParams({limit: params.currentPage});
      this.loadItems();
    },
    onSortChange(params) {
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
        this.loadItems();
      }
    },
    onColumnFilter(params) {
      this.updateParams(params);
      this.loadItems();
    },
    onSearch(params){
      this.updateParams({search: params.searchTerm});
      this.loadItems()
    },
    loadItems() {
      this.listOffices();
    }
  },
};
</script>