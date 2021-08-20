<template>
  <div>
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
              @click="() => { $bvModal.show('add-patient-modal'); }"
              class="btn-rounded d-sm-block d-none"
            >
              Create
            </b-button>
          </div>

          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'action'">
              <a
                v-b-tooltip.hover
                class="o-hidden d-inline-block c-pointer"
                title="Edit"
              >
                <i
                  class="i-Eraser-2 text-25 text-info mr-2"
                  @click="
                    () => {}
                  "
                ></i>
              </a>
              <a
                v-b-tooltip.hover
                class="o-hidden d-inline-block c-pointer"
                title="Delete"
              >
                <i
                  class="i-Close-Window text-25 text-danger"
                  @click="
                    confirmationPopup().then((result) => {
                      if (result.value){ };
                    })
                  "
                ></i>
              </a>
            </span>
            <span v-else-if="props.column.field == 'customer_card'">
              <a class="o-hidden d-inline-block">
                <b-button
                  size="sm"
                  class="btn-radius mr-2"
                  variant="primary"
                  @click="
                    () => {
                      setRecord(props.row);
                      $bvModal.show('patient-card-add');
                    }
                  "
                >
                  Add
                </b-button>
              </a>
              <a
                class="o-hidden d-inline-block"
                v-if="props.row.customer_card && props.row.customer_card.length"
              >
                <b-button
                  size="sm"
                  class="btn-radius"
                  variant="primary"
                  @click="
                    () => {
                      setRecord(props.row);
                      $bvModal.show('patient-card-view');
                    }
                  "
                >
                  View
                </b-button>
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
// const STORAGE_KEY = 'invoice';
export default {
  data() {
    return {
      columns: [
        {
          label: "Full Name",
          field: "full_name",
        },
        {
          label: "Email",
          field: "email_address",
        },
        {
          label: "Phone",
          field: "phone",
        },
        // {
        //   label: "Customer Card",
        //   field: "customer_card",
        // },
        {
          label: "Action",
          field: "action",
        },
      ],
    };
  },
  mounted(){
    this.listPatients();
  },
  computed: {
    ...mapGetters({
      rows: "patients",
      isLoading: "patient_isLoading",
      totalRecords: "patient_totalRecords",
      serverParams: "patient_serverParams"
    })
  },  
  methods: {
    ...mapActions([
      "listPatients"
    ]),
    ...mapMutations({
      updateParams: "patient_serverParams"
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
    onPageChange(params) {
      this.updateParams({page: params.currentPage});
      this.listPatients();
    },
    onPerPageChange(params) {
      this.updateParams({limit: params.currentPage});
      this.listPatients();
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
        this.listPatients();
      }
    },
    onColumnFilter(params) {
      this.updateParams(params);
      this.listPatients();
    },
    onSearch(params){
      this.updateParams({search: params.searchTerm});
      this.listPatients()
    },
  },
};
</script>