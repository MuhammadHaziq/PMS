<template>
  <!-- ============ Body content start ============= -->
  <div class="main-content" v-if="!getLoading">
    <!-- <breadcumb :page="'Dashboard'" :folder="'Version 1'" /> -->
    <b-row>
      <b-col lg="12" xl="12" md="12">
        <!--  <b-card header="Daily Huddle" header-bg-variant="transparent">-->
        <div class="w-100">
          <div class="mb-4">
            <div class="mb-3 page-title">
              <h3 class="font-weight-bold m-0">Billings</h3>
            </div>
            <ul class="billing-dropdown mb-4">
              <li v-for="option in billingOptions" :key="option.id">
                <b-dropdown id="view-selector" :text="option.title">
                  <b-dropdown-item>{{ option.title }}</b-dropdown-item>
                </b-dropdown>
              </li>
              <li>
                <b-button variant="ripple" block class="btn-default"
                  >Search</b-button
                >
              </li>
            </ul>
            <div class="mb-20"><InvoiceView /></div>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
  <Loader v-else />
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import InvoiceView from "../apps/invoice";
import Loader from "../../../components/loader/loader";

export default {
  name: "Billings",
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Billings",
  },
  data() {
    return {
      billingOptions: [
        {
          id: 1,
          title: "Location",
        },
        {
          id: 2,
          title: "Time",
        },
        {
          id: 3,
          title: "Billing Entity",
        },
        {
          id: 4,
          title: "Treating Provider",
        },
        {
          id: 5,
          title: "Fee Amount",
        },
        {
          id: 6,
          title: "Insurance Carrier",
        },
        {
          id: 7,
          title: "Insurance Plan",
        },
        {
          id: 8,
          title: "Search Service",
        },
      ],
      tableColumns: ["Time", "Location", "Name", "DOB", "Contact", "Status"],
      tableRows: [
        {
          id: 1,
          time: "07:00-07:30 AM",
          location: "Medical Center 1",
          name: "Jack Liang",
          dob: "12-21-1992",
          contact: "(815) - 302 - 864",
          status: "Scheduled",
        },
        {
          id: 2,
          time: "07:00-07:30 AM",
          location: "Medical Center 1",
          name: "Jack Liang",
          dob: "12-21-1992",
          contact: "(815) - 302 - 864",
          status: "Scheduled",
        },
        {
          id: 3,
          time: "07:00-07:30 AM",
          location: "Medical Center 1",
          name: "Jack Liang",
          dob: "12-21-1992",
          contact: "(815) - 302 - 864",
          status: "Scheduled",
        },
        {
          id: 4,
          time: "07:00-07:30 AM",
          location: "Medical Center 1",
          name: "Jack Liang",
          dob: "12-21-1992",
          contact: "(815) - 302 - 864",
          status: "Scheduled",
        },
        {
          id: 5,
          time: "07:00-07:30 AM",
          location: "Medical Center 1",
          name: "Jack Liang",
          dob: "12-21-1992",
          contact: "(815) - 302 - 864",
          status: "Scheduled",
        },
      ],
    };
  },
  components: { InvoiceView, Loader },
  computed: {
    ...mapGetters(["getItems", "getLoading"]),
  },
  created: function () {
    // this.items = this.getItems;
  },
  methods: {
    ...mapActions(["setLoading"]),
    addCartPage() {},
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
<style scoped>
.billing-dropdown {
  padding: 0;
  margin: -12px;
  display: table;
  width: 100%;
}
.billing-dropdown > li {
  float: left;
  list-style: none;
  width: 14.28%;
  padding: 12px;
}
</style>