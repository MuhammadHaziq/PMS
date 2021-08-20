<template>
  <div class="main-content" v-if="!getLoading">
    <b-row>
      <b-col lg="12" xl="12" md="12">
        <div class="d-flex justify-content-between">
          <div class="d-flex align-items-center mb-4">
            <div class="mr-3 page-title">
              <h3 class="font-weight-bold m-0">Patients</h3>
            </div>
          </div>
        </div>

        <Table />

        <b-modal
          id="add-patient-modal"
          size="lg"
          hide-header
          hide-footer
          no-close-on-backdrop
        >
          <CreatePatient/>
          <!-- <div>
            <b-col>
              <b-form>
                <div class="row">
                  <div class="col-md-4">
                    <b-form-group class="mb-3" label="First Name">
                      <b-form-input
                        type="text"
                        required
                        v-model="getPatientForm.first_name"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-4">
                    <b-form-group class="mb-3" label="Middle Name">
                      <b-form-input
                        type="text"
                        required
                        v-model="getPatientForm.middle_name"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-4">
                    <b-form-group class="mb-3" label="Last Name">
                      <b-form-input
                        type="text"
                        required
                        v-model="getPatientForm.last_name"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <b-form-group class="mb-3" label="Email Address">
                      <b-form-input
                        type="email"
                        required
                        v-model="getPatientForm.email_address"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-4">
                    <b-form-group class="mb-3" label="Date of Birth">
                      <b-form-datepicker
                        :date-format-options="{
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                        }"
                        :max="new Date()"
                        v-model="getPatientForm.date_of_birth"
                      ></b-form-datepicker>
                    </b-form-group>
                  </div>
                  <div class="col-md-4">
                    <b-form-group class="mb-3" label="Gender">
                      <b-dropdown
                        class="gender-dropdown"
                        :text="genders[getPatientForm.gender]"
                      >
                        <b-dropdown-item
                          v-for="value, key in genders"
                          :value="value"
                          :key="key"
                          @click="getPatientForm.gender = key"
                          >{{ value }}</b-dropdown-item
                        >
                      </b-dropdown>
                    </b-form-group>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <b-form-group class="mb-3" label="Nick Name">
                      <b-form-input
                        type="text"
                        required
                        v-model="getPatientForm.nick_name"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-4">
                    <b-form-group class="mb-3" label="Phone">
                      <b-form-input
                        type="text"
                        required
                        v-model="getPatientForm.phone"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-4">
                    <b-form-group class="mb-3" label="Cell">
                      <b-form-input
                        type="text"
                        required
                        v-model="getPatientForm.cell"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <b-form-group class="mb-3" label="Foreign Id">
                      <b-form-input
                        type="text"
                        required
                        v-model="getPatientForm.foreign_id"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-4">
                    <b-form-group class="mb-3" label="Guardian">
                      <b-form-input
                        type="text"
                        required
                        v-model="getPatientForm.guardian"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-4">
                    <b-form-group class="mb-3" label="SSN">
                      <b-form-input
                        type="text"
                        required
                        v-model="getPatientForm.ssn"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <b-form-group class="mb-3" label="Home Office">
                      <b-form-input
                        type="text"
                        required
                        v-model="getPatientForm.home_office"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-4">
                    <b-form-group class="mb-3" label="Other Notes">
                      <b-form-input
                        type="text"
                        required
                        v-model="getPatientForm.other_notes"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-4">
                    <b-form-group class="mb-3" label="Insurance Policy#">
                      <b-form-input
                        type="text"
                        required
                        v-model="getPatientForm.insurance_policy"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <b-button
                      size="sm"
                      class="btn-radius"
                      variant="primary"
                      @click="submitPatientForm"
                    >
                      Save
                    </b-button>
                    <b-button
                      size="sm"
                      class="btn-radius ml-2"
                      variant="outline-primary"
                      @click="
                        setDefaultPatientForm();
                        $bvModal.hide('add-patient');
                      "
                    >
                      Cancel
                    </b-button>
                  </div>
                </div>
              </b-form>
            </b-col>
          </div> -->
        </b-modal>

        <b-modal id="patient-card-add" size="md" hide-header hide-footer>
          <div>
            <b-row>
              <b-col>
                <div class="row">
                  <div class="col-md-12">
                    <b-form-group class="mb-3">
                      <b-form-input
                        type="text"
                        v-model="customerCardForm.card_number"
                        required
                        placeholder="Card Number"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-6 col-lg-6">
                    <b-form-group class="mb-3">
                      <b-form-input
                        type="text"
                        v-model="customerCardForm.expiry_date"
                        required
                        placeholder="MM/YY"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-6 col-lg-6">
                    <b-form-group class="mb-3">
                      <b-form-input
                        type="password"
                        v-model="customerCardForm.cvv"
                        required
                        placeholder="CVV"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <b-button
                  size="sm"
                  class="btn-radius"
                  variant="primary"
                  @click="
                    () => {
                      savePatientCard(customerCardForm);
                      $bvModal.hide('patient-card-add');
                    }
                  "
                >
                  Submit
                </b-button>
                <b-button
                  size="sm"
                  class="btn-radius ml-2"
                  variant="primary"
                  @click="$bvModal.hide('patient-card-add')"
                >
                  Cancel
                </b-button>
              </b-col>
            </b-row>
          </div>
        </b-modal>

        <!-- <b-modal id="patient-card-view" size="lg" hide-header hide-footer>
          <div class="wrapper">
            <vue-good-table
              :columns="card_list_table_columns"
              :line-numbers="true"
              :search-options="{
                enabled: true,
                placeholder: 'Search Card',
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
              :rows="
                (getSelectedPatient && getSelectedPatient.customer_card) || []
              "
            >
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
                          if (result.value) removePatientCard(props.row);
                        })
                      "
                    ></i>
                  </a>
                </span>
              </template>
            </vue-good-table>
          </div>
        </b-modal> -->
      </b-col>
    </b-row>
  </div>
  <Loader v-else />
</template>
<script>
import Table from "./table";

import { mapActions, mapGetters } from "vuex";
import Loader from "../../../components/loader/loader";
import Vue from "vue";
import CreatePatient from "../../../components/patient/CreatePatient.vue";

export default {
  components: {
    Table,
    Loader,
    CreatePatient
  },
  data() {
    return {
      customerCardForm: {
        card_number: "",
        expiry_date: "",
        cvv: "",
      },
      card_list_table_columns: [
        {
          label: "Card Brand",
          field: "card_brand",
        },
        {
          label: "Card Last 4 Digits",
          field: "card_number",
        },
        {
          label: "Exp Month",
          field: "expiry_date",
        },
        {
          label: "Exp Year",
          field: "expiry_date",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
      genders: Vue.Constants.genders
    };
  },
  computed: {
    ...mapGetters([
      "getLoading",
    ]),
  },
  methods: {
    ...mapActions([
      "savePatientCard",
      "removePatientCard",
      "setDefaultPatientForm",
      "setPatientForm",
      "updatePatient",
      "savePatient",
      "setLoading",
    ]),
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
  },
  mounted() {
    this.setLoading(true);
    setTimeout(() => {
      this.setLoading(false);
    }, 2000);
    // this.paginate(this.perPage, 0);
  },
};
</script>
<style>
.delta-dental-tab span {
  color: #9badbf;
  font-weight: normal;
}
.delta-dental-tab span.active-tab {
  color: #355677;
}
.huddle-tab {
  background-color: #eaf4fb;
  padding: 20px;
  border-radius: 10px;
}
.tabs .nav-tabs {
  border: 0;
}
.tabs .nav-tabs .nav-item .nav-link {
  border: 0;
  background-color: transparent;
  position: relative;
  font-weight: bold;
  color: #05070b;
  padding: 10px 5px 5px;
}
.tabs .nav-tabs .nav-item .nav-link.active:before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  width: 20px;
  height: 2px;
  background-color: #6cdcd4;
  margin: 0 auto;
}
.tabs .nav-tabs .nav-item .nav-link.active {
  color: #6cdcd4;
  border: 0;
  background-color: transparent;
}

#notes-view .form-control-plaintext,
#appointment-location-view .form-control-plaintext {
  border: 2px solid #e5f4f8;
  border-radius: 5px;
  border-width: 1px;
}
#add-delta-dental .b-form-datepicker.focus {
  box-shadow: none;
}
#add-delta-dental .b-form-datepicker > .btn {
  padding: 7px 10px;
}
</style>
