<template>
  <div class="main-content">
    <b-row>
      <b-col md="12">
        <b-card>
          <b-form>
            <div class="d-flex mb-5">
              <span class="m-auto"></span>
              <b-button @click="backInvoice" variant="outline-secondary mr-3">
                Cancel
              </b-button>
              <b-button @click="updateInvoiceData" variant="primary">
                Update
              </b-button>
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'button'">
                  <a @click="editInvoiceData(props.row)">
                    <i class="i-Eraser-2 text-25 text-success mr-2"></i>
                    {{ props.row.button }}</a
                  >
                  <a @click="removeInvoice(props.row.invoiceId)">
                    <i class="i-Close-Window text-25 text-danger"></i>
                    {{ props.row.button }}</a
                  >
                </span>
              </template>
            </div>

            <b-row class="justify-content-between">
              <b-col lg="8" md="6">
                <h4 class="font-weight-bold">Order Info</h4>
                <b-form-group class="col-sm-4 mb-3 pl-0" label="Order Number">
                  <b-form-input
                    placeholder="Enter Order Number"
                    v-model="getEditInvoice.invoiceId"
                  >
                  </b-form-input>
                </b-form-group>
                <h2>{{ items.name }}</h2>
              </b-col>
              <b-col md="6" lg="4" class="text-right">
                <label class="d-block text-12 text-muted">Order Status</label>

                <div class="col-md-6 offset-md-6 pr-0 mb-30">
                  <label class="radio radio-reverse radio-danger">
                    <input type="radio" name="orderStatus" value="Pending" />
                    <span>Pending</span>
                    <span class="checkmark"></span>
                  </label>
                  <label class="radio radio-reverse radio-warning">
                    <input type="radio" name="orderStatus" value="Processing" />
                    <span>Processing</span>
                    <span class="checkmark"></span>
                  </label>
                  <label class="radio radio-reverse radio-success">
                    <input
                      type="radio"
                      name="orderStatus"
                      value="Delivered"
                      v-model="newInvoice.status"
                    />
                    <span>Delivered</span>
                    <span class="checkmark"></span>
                  </label>
                </div>

                <b-form-group class="mb-3" label="Order Date">
                  <!-- <v-date-picker v-model="newInvoice.date" /> -->
                  <!-- v-model="newInvoice.date" -->
                  <b-form-input class="input" type="date"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <div class="mt-3 mb-30 border-top"></div>

            <b-row class="mb-5">
              <b-col md="6">
                <h5 class="font-weight-bold">Bill From</h5>

                <b-form-group class="col-md-10 mb-3 pl-0">
                  <b-form-input
                    placeholder="Bill From"
                    type="text"
                    v-model="getEditInvoice.billFrom"
                    required
                  >
                  </b-form-input>
                </b-form-group>
                <b-form-group class="col-md-10 mb-3 pl-0">
                  <b-form-textarea
                    placeholder="Bill Form Address"
                    v-model="getEditInvoice.billFromAdress"
                  >
                  </b-form-textarea>
                </b-form-group>
              </b-col>
              <b-col md="6" class="text-right">
                <h5 class="font-weight-bold">Bill To</h5>

                <b-form-group class="col-md-10 offset-md-2 mb-3 pr-0">
                  <b-form-input
                    placeholder="Bill to"
                    v-model="getEditInvoice.billTo"
                  >
                  </b-form-input>
                </b-form-group>
                <b-form-group class="col-md-10 offset-md-2 mb-3 pr-0">
                  <b-form-textarea
                    placeholder="Bill To Address"
                    v-model="getEditInvoice.billToAdress"
                  >
                  </b-form-textarea>
                </b-form-group>
              </b-col>
            </b-row>
            <!-- multiple-row -->
            <b-row>
              <b-col md="12" class="table-responsive">
                <b-table hover :items="items" :fields="fields">
                  <template slot="index" slot-scope="data">
                    <p class="font-weight-bold">{{ data.index + 1 }}</p>
                    <!-- {{data}}-->
                  </template>
                  <template slot="itemName">
                    <input
                      class="form-control"
                      type="text"
                      placeholder="Item Name"
                    />
                  </template>
                  <template slot="unitPrice" slot-scope="data">
                    <input
                      v-model="data.item.unitPrice"
                      @change="calculateLineTotal(data.item)"
                      class="form-control"
                      type="number"
                      placeholder="Unit Price"
                    />
                  </template>
                  <template slot="unit" slot-scope="data">
                    <input
                      v-model="data.item.unit"
                      @change="calculateLineTotal(data.item)"
                      class="form-control"
                      type="number"
                      placeholder="Unit"
                    />
                  </template>
                  <template slot="cost" slot-scope="data">
                    <input
                      v-model="data.item.cost"
                      class="form-control"
                      readonly
                    />
                  </template>
                  <template slot="action" slot-scope="data">
                    <b-button
                      @click="deleteRow(data.index, data.item)"
                      variant="outline-danger"
                      >Delete</b-button
                    >
                  </template>
                </b-table>
                <b-button
                  @click="addNewRow"
                  variant="primary"
                  class="float-right mb-30"
                >
                  Add Item
                </b-button>
              </b-col>

              <b-col md="12">
                <div class="invoice-summary invoice-summary-input float-right">
                  <p>
                    Sub total: <span>{{ subTotal }}</span>
                  </p>
                  <p class="d-flex align-items-center">
                    Vat(%):
                    <span>
                      <input
                        @change="invoiceTotal(invoice_tax)"
                        v-model="invoice_tax"
                        class="form-control small-input"
                        type="text"
                      />
                    </span>
                  </p>
                  <h5 class="font-weight-bold d-flex align-items-center">
                    Grand Total:
                    <span>
                      {{ invoice_total }}
                    </span>
                  </h5>
                </div>
              </b-col>
            </b-row>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  components: {},

  data() {
    return {
      orderNumber: 0,
      subTotal: 0,
      invoice_subtotal: 0,
      invoice_total: 0,
      invoice_tax: 0,
      newInvoice: {
        billFrom: "",
        billTo: "",
        status: "",
        billFromAddress: "",
        billToAdress: "",
        invoiceId: "",
        date: new Date(),
      },

      name: "",
      fields: ["index", "itemName", "unitPrice", "unit", "cost", "action"],
      items: [
        {
          itemName: "",
          unitPrice: "",
          unit: "",
          cost: 0,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["getEditInvoice"]),
  },
  methods: {
    // vuex
    ...mapActions(["addInvoice", "editInvoice", "updateInvoice"]),

    updateInvoiceData() {
      this.updateInvoice();
      this.$router.push("/app/apps/invoice");
    },
    saveInvoice() {
      this.addInvoice(this.newInvoice);

      this.$router.push("/app/apps/printInvoice");
    },

    backInvoice() {
      this.$router.push("/app/billings");
    },
    addNewRow() {
      this.items.push({
        itemName: "",
        unitPrice: "",
        unit: "",
        cost: 0,
      });
    },
    invoiceTotal() {
      var subtotal, total;
      subtotal = this.items.reduce(function (sum, item) {
        var cost = parseFloat(item.cost);
        if (!isNaN(cost)) {
          return sum + cost;
        }
      }, 0);

      this.subTotal = subtotal.toFixed(2);
      // tax
      total = subtotal * (this.invoice_tax / 100) + subtotal;
      total = parseFloat(total);

      console.log(total);
      if (!isNaN(total)) {
        this.invoice_total = total.toFixed(2);
      } else {
        this.invoice_total = "0.00";
      }
    },
    deleteRow(index, item) {
      console.log("Removing", item, index);
      this.items.splice(index, 1);
      // this.calculateTotal();
    },
    calculateLineTotal(item) {
      var total = parseInt(item.unitPrice) * parseInt(item.unit);
      if (!isNaN(total)) {
        item.cost = total.toFixed(2);
      }

      // this.calculateTotal();
      this.invoiceTotal();
    },

    //global save
    removeRow(id) {
      this.rows.splice(this.rows.indexOf(id), 1);
    },
  },
};
</script>