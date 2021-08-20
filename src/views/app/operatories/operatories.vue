<template>
  <div v-if="!getLoading">
    <div class="main-content table-list">
      <div class="mb-3 page-title">
        <h3 class="font-weight-bold m-0">Operatories</h3>
      </div>
      <div class="wrapper">
        <vue-good-table
          mode="remote"
          :columns="columns"
          @on-page-change="onPageChange"
          @on-sort-change="onSortChange"
          @on-column-filter="onColumnFilter"
          @on-per-page-change="onPerPageChange"
          @on-search="onSearch"
          :isLoading.sync="isLoading"
          :totalRows="totalRecords"
          :line-numbers="true"
          :search-options="{
            enabled: true,
            placeholder: 'Search operatory',
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
              @click="$bvModal.show('add-operatory-modal')"
              class="btn-rounded d-sm-block d-none"
            >
              Add Operatory
            </b-button>
          </div>
        </vue-good-table>
      </div>

      <b-modal id="add-operatory-modal" size="xl" hide-header hide-footer>
        <div>
          <b-col>
            <b-form>
              <b-form-group class="col-md-12 mb-3" label="Office">
                <OfficeSearchSelect v-on:update="onChangeOffice"/>
              </b-form-group>
              <b-form-group class="col-md-12 mb-3" label="Name">
                <b-form-input
                  type="text"
                  required
                  placeholder="Name"
                  v-model="$v.operatory_name.$model"
                ></b-form-input>
              </b-form-group>
              <b-form-group class="col-md-12 mb-3" label="Description">
                <b-form-input
                  type="text"
                  required
                  placeholder="Description"
                  v-model="operatory_notes"
                ></b-form-input>
              </b-form-group>
              <b-form-group class="col-md-12 mb-3">
                <div class="align-items-center">
                  <label class="checkbox checkbox-outline-primary">
                    <input type="checkbox" v-model="operatory_status" checked />
                    <span class="checkmark"></span>Status</label
                  >
                </div>
              </b-form-group>
              <div class="col-md-12">
                <b-button
                  size="sm"
                  class="btn-radius"
                  variant="primary"
                  @click="save()"
                >
                  Save
                </b-button>
                <b-button
                  size="sm"
                  class="btn-radius ml-2"
                  variant="outline-primary"
                  @click="cancel()"
                >
                  Cancel
                </b-button>
              </div>
            </b-form>
          </b-col>
        </div>
      </b-modal>
    </div>
  </div>
  <Loader v-else />

</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "../../../components/loader/loader";
import OfficeSearchSelect from "../../../components/office/OfficeSearchSelect";
import { required } from "vuelidate/lib/validators";
// const STORAGE_KEY = 'invoice';
export default {
  data() {
    return {
      // input: [
      //   {
      //     name: "",
      //   },
      // ],
      newTodo: "",
      // Operatory
      office_id: null,
      operatory_name: '',
      operatory_notes: '',
      operatory_status: false,
      operatory_id: null,
      // Table
      columns: [
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Description",
          field: "notes",
        },
        {
          label: "Status",
          field: "status",
        },
        {
          label: "Location",
          field: row => row.office.location_name
        }
      ],
      rows: [],
      serverParams: {expand: "office"},
      isLoading: false,
      totalRecords: 0,
    };
  },
  mounted() {
    this.loadItems();
  },
  components: { Loader,  OfficeSearchSelect},
  computed: mapGetters(["getLoading", "create"]),
  validations: {
      operatory_name:{
        required
      }
  },
  methods: {
    ...mapActions(["createOperatory", "setLoading", "listOperatories"]),
    onChangeOffice(val) {
      this.office_id = val?val.id:val;
    },
    // Modal
    save(){
      this.$v.$touch();
      if (this.$v.$anyError || this.office_id == null) {
        console.log(this.$v)
        return;
      }
      if(this.operatory_id == null){
        this.createOperatory({
          office_id: this.office_id,
          name: this.operatory_name,
          notes: this.operatory_notes,
          status: this.operatory_status,
        }).then(data=>{
            this.operatory_id = data.id;
            console.log('create operatory:', data);
            this.$bvToast.toast('Successfully created new operatory.', {
                title: 'Success to create new operatory',
                variant: 'success',
                solid: true,
            });
        }).catch(err=>{
            for(const key in err.response.data || {}){
              this.$bvToast.toast(err.response.data[key], {
                title: 'Failed to create new operatory',
                variant: 'warning',
                solid: true,
              });
            }
        })
      }
    },
    cancel(){
      this.$bvModal.hide('add-operatory-modal')
    },
    // Table
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps);
    },
    onPageChange(params) {
      console.log('onPageChange', params)
      this.updateParams({page: params.currentPage});
      this.loadItems();
    },
    onPerPageChange(params) {
      console.log('onPerPageChange', params)
      this.updateParams({limit: params.currentPage});
      this.loadItems();
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
      this.isLoading = true;
      this.listOperatories(this.serverParams).then(data => {
        this.isLoading = false;
         this.totalRecords = data.count;
         this.rows = data.results;
      }).catch(err=>{
          console.log('operatory list error', err);
          this.isLoading = false;
      });
    }
  },

};
</script>