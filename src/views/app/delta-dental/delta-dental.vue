<template>
  <div class="main-content" v-if="!getLoading">
    <b-row>
      <b-col lg="12" xl="12" md="12">
        <div class="d-flex justify-content-between">
          <div class="d-flex align-items-center mb-4">
            <div class="mr-3 page-title">
              <h3 class="font-weight-bold m-0">Delta Dental</h3>
            </div>
          </div>
        </div>

        <div class="delta-dental-tab">
          <b-tabs content-class="mt-1">
            <b-tab
              title="Pending"
              :active="getSelectedTab === 'pending'"
              @click="setTab('pending')"
            >
              <div class="mb-20">
                <Table />
              </div>
            </b-tab>
            <b-tab
              title="Completed"
              :active="getSelectedTab === 'completed'"
              @click="setTab('completed')"
            >
              <div class="mb-20">
                <Table />
              </div>
            </b-tab>
            <b-tab
              title="Over-due"
              :active="getSelectedTab === 'overDue'"
              @click="setTab('overDue')"
            >
              <div class="mb-20">
                <Table />
              </div>
            </b-tab>
          </b-tabs>
        </div>

        <b-modal
          id="add-delta-dental"
          size="xl"
          hide-header
          hide-footer
          no-close-on-backdrop
        >
          <div>
            <b-col>
              <b-form>
                <div class="row">
                  <div class="col-md-6">
                    <b-form-group class="mb-3" label="First Name">
                      <b-form-input
                        type="text"
                        required
                        v-model="getDeltaDentalForm.first_name"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-6">
                    <b-form-group class="mb-3" label="Last Name">
                      <b-form-input
                        type="text"
                        required
                        v-model="getDeltaDentalForm.last_name"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <b-form-group class="mb-3" label="Appointment Date:">
                      <b-form-datepicker
                        :date-format-options="{
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                        }"
                        v-model="getDeltaDentalForm.appointment_date"
                        :min="new Date()"
                      ></b-form-datepicker>
                    </b-form-group>
                  </div>
                  <div class="col-md-6">
                    <b-form-group class="mb-3" label="Appoitnment Location">
                      <b-form-input
                        type="text"
                        required
                        v-model="getDeltaDentalForm.appointment_loc"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <b-form-group class="mb-3" label="Insurance Policy #">
                      <b-form-input
                        type="text"
                        required
                        v-model="getDeltaDentalForm.ins_policy"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-6">
                    <b-form-group class="mb-3" label="Status">
                      <b-dropdown
                        class="provider-dropdown mb-2 mr-5"
                        :text="
                          getDeltaDentalForm.status === ''
                            ? 'Please select status'
                            : getDeltaDentalForm.status
                        "
                      >
                        <b-dropdown-item
                          value=""
                          @click="getDeltaDentalForm.status = ''"
                          >Please select status</b-dropdown-item
                        >
                        <b-dropdown-item
                          value="pending"
                          @click="getDeltaDentalForm.status = 'Pending'"
                          >Pending</b-dropdown-item
                        >
                        <b-dropdown-item
                          value="completed"
                          @click="getDeltaDentalForm.status = 'Completed'"
                          >Completed</b-dropdown-item
                        >
                      </b-dropdown>
                    </b-form-group>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <b-form-group class="mb-3" label="Email Address">
                      <b-form-input
                        type="email"
                        required
                        v-model="getDeltaDentalForm.email"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-6">
                    <b-form-group class="mb-3" label="Phone Number">
                      <b-form-input
                        type="text"
                        required
                        v-model="getDeltaDentalForm.phone"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <b-form-group class="mb-3" label="Charge Date:">
                      <b-form-datepicker
                        :date-format-options="{
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                        }"
                        :min="new Date()"
                        v-model="getDeltaDentalForm.charge_date"
                      ></b-form-datepicker>
                    </b-form-group>
                  </div>
                  <div class="col-md-6">
                    <b-form-group class="mb-3" label="Payment Amount">
                      <b-form-input
                        type="number"
                        min="0"
                        required
                        v-model="getDeltaDentalForm.payment_amount"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <b-form-group class="mb-3" label="Notes">
                      <b-form-textarea
                        rows="5"
                        required
                        v-model="getDeltaDentalForm.notes"
                      ></b-form-textarea>
                    </b-form-group>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <b-button
                      size="sm"
                      class="btn-radius"
                      variant="primary"
                      @click="
                        getDeltaDentalForm && getDeltaDentalForm.id
                          ? updateRecord(getDeltaDentalForm)
                          : saveRecord(getDeltaDentalForm);
                        $bvModal.hide('add-delta-dental');
                      "
                    >
                      Save
                    </b-button>
                    <b-button
                      size="sm"
                      class="btn-radius ml-2"
                      variant="outline-primary"
                      @click="
                        setDefaultDeltaDentalForm();
                        $bvModal.hide('add-delta-dental');
                      "
                    >
                      Cancel
                    </b-button>
                  </div>
                </div>
              </b-form>
            </b-col>
          </div>
        </b-modal>

        <b-modal id="notes-view" size="xl" hide-footer>
          <div>
            <b-col>
              <b-form>
                <b-form-group class="col-md-12 mb-3" label="Notes">
                  <b-form-textarea
                    rows="10"
                    max-rows="10"
                    plaintext
                    :value="getSelectedRecord && getSelectedRecord.notes"
                    required
                    placeholder="Notes"
                  ></b-form-textarea>
                </b-form-group>
              </b-form>
            </b-col>
          </div>
        </b-modal>

        <b-modal id="appointment-location-view" size="xl" hide-footer>
          <div>
            <b-col>
              <b-form>
                <b-form-group
                  class="col-md-12 mb-3"
                  label="Appointment Location"
                >
                  <b-form-textarea
                    rows="10"
                    max-rows="10"
                    plaintext
                    :value="
                      getSelectedRecord && getSelectedRecord.appointment_loc
                    "
                    required
                    placeholder="Appointment Location"
                  ></b-form-textarea>
                </b-form-group>
              </b-form>
            </b-col>
          </div>
        </b-modal>

        <b-modal id="customer-card-add" size="xl" hide-header hide-footer>
          <div>
            <b-row>
              <b-col>
                <div class="row">
                  <div class="col-md-12">
                    <b-form-group class="mb-3">
                      <b-form-input
                        type="text"
                        v-model="customerCardForm.holder_name"
                        required
                        placeholder="Card Holder Name"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>
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
                  <div class="col-md-4 col-lg-4">
                    <b-form-group class="mb-3">
                      <b-form-input
                        type="text"
                        v-model="customerCardForm.expiry_date"
                        required
                        placeholder="MM/YY"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-4 col-lg-4">
                    <b-form-group class="mb-3">
                      <b-form-input
                        type="password"
                        v-model="customerCardForm.cvv"
                        required
                        placeholder="CVV"
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-4 col-lg-4">
                    <b-form-group class="mb-3">
                      <b-form-input
                        type="text"
                        v-model="customerCardForm.postal"
                        placeholder="Postal"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4 col-lg-4">
                    <b-form-group class="mb-3">
                      <b-form-input
                        type="text"
                        v-model="customerCardForm.country"
                        placeholder="Country"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-4 col-lg-4">
                    <b-form-group class="mb-3">
                      <b-form-input
                        type="text"
                        v-model="customerCardForm.first_name"
                        placeholder="First Name"
                        required
                      ></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="col-md-4 col-lg-4">
                    <b-form-group class="mb-3">
                      <b-form-input
                        type="text"
                        v-model="customerCardForm.last_name"
                        placeholder="Last Name"
                        required
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
                      saveCard(customerCardForm);
                      $bvModal.hide('customer-card-add');
                    }
                  "
                >
                  Submit
                </b-button>
                <b-button
                  size="sm"
                  class="btn-radius ml-2"
                  variant="primary"
                  @click="$bvModal.hide('customer-card-add')"
                >
                  Cancel
                </b-button>
              </b-col>
            </b-row>
          </div>
        </b-modal>

        <b-modal id="customer-card-view" size="lg" hide-header hide-footer>
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
                (getSelectedRecord && getSelectedRecord.customer_card) || []
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
                          if (result.value) removeCard(props.row);
                        })
                      "
                    ></i>
                  </a>
                </span>
              </template>
            </vue-good-table>
          </div>
        </b-modal>
      </b-col>
    </b-row>
  </div>
  <Loader v-else />

</template>
<script>
import Table from "./table";

import { mapActions, mapGetters } from "vuex";
import Loader from "../../../components/loader/loader";

export default {
  components: {
    Table,
    Loader
  },
  data() {
    return {
      customerCardForm: {
        card_number: "",
        expiry_date: "",
        cvv: "",
        postal: "",
        holder_name: "",
        country: "",
        first_name: "",
        last_name: "",
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
          label: "Holder Name",
          field: "holder_name",
        },
        {
          label: "Postal Code",
          field: "postal",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      "getItems",
      "getSelectedTab",
      "getSelectedRecord",
      "getDeltaDentalForm",
      "getLoading"
    ]),
  },
  created: function () {
    // this.items = this.getItems;
  },
  methods: {
    ...mapActions([
      "setTab",
      "saveCard",
      "removeCard",
      "setDefaultDeltaDentalForm",
      "updateRecord",
      "saveRecord",
      "setLoading",
    ]),
    save() {
      console.log("getDeltaDentalForm", this.getDeltaDentalForm);
    },
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
