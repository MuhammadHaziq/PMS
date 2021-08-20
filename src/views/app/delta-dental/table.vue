<template>
  <div>
    <div class="main-content table-list">
      <div class="wrapper">
        <vue-good-table
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
          :rows="deltaDentalList"
        >
          <div slot="table-actions" class="mb-3">
            <b-button
              variant="primary"
              @click="
                () => {
                  setDefaultDeltaDentalForm();
                  $bvModal.show('add-delta-dental');
                }
              "
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
                    () => {
                      setRecord(props.row);
                      setDeltaDentalForm(props.row);
                      $bvModal.show('add-delta-dental');
                    }
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
                      if (result.value) removeRecord(props.row);
                    })
                  "
                ></i>
              </a>
            </span>
            <span v-else-if="props.column.field == 'payment_amount'">
              ${{ props.row.payment_amount }}</span
            >
            <span v-else-if="props.column.field == 'notes'">
              <a class="o-hidden d-inline-block">
                <b-button
                  size="sm"
                  class="btn-radius"
                  variant="primary"
                  @click="
                    () => {
                      setRecord(props.row);
                      $bvModal.show('notes-view');
                    }
                  "
                >
                  View
                </b-button>
              </a>
            </span>
            <span v-else-if="props.column.field == 'appointment_loc'">
              <a class="o-hidden d-inline-block">
                <b-button
                  size="sm"
                  class="btn-radius"
                  variant="primary"
                  @click="
                    () => {
                      setRecord(props.row);
                      $bvModal.show('appointment-location-view');
                    }
                  "
                >
                  View
                </b-button>
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
                      $bvModal.show('customer-card-add');
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
                      $bvModal.show('customer-card-view');
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
import { mapGetters, mapActions } from "vuex";
// const STORAGE_KEY = 'invoice';
export default {
  data() {
    return {
      columns: [
        {
          label: "Name",
          field: "name",
        },
        // {
        //   label: "Last Name",
        //   field: "last_name",
        // },
        // {
        //   label: "Appointment Date",
        //   field: "appointment_date",
        // },
        {
          label: "Charge Date",
          field: "charge_date",
        },
        {
          label: "Payment Amount",
          field: "payment_amount",
        },
        // {
        //   label: "Notes",
        //   field: "notes",
        // },
        {
          label: "Appointment Loc",
          field: "appointment_loc",
        },
        // {
        //   label: "Ins Policy #",
        //   field: "ins_policy",
        // },
        {
          label: "Status",
          field: "status",
        },
        {
          label: "Email",
          field: "email",
        },
        // {
        //   label: "Phone",
        //   field: "phone",
        // },
        {
          label: "Customer Card",
          field: "customer_card",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
    };
  },
  computed: mapGetters(["deltaDentalList", "getSelectedTab"]),
  methods: {
    ...mapActions([
      "addRecord",
      "setRecord",
      "removeRecord",
      "setDeltaDentalForm",
      "setDefaultDeltaDentalForm",
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
};
</script>