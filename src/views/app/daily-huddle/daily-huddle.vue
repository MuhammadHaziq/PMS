<template>
  <!-- ============ Body content start ============= -->
  <div class="main-content" v-if="!getLoading">
    <b-row>
      <b-col lg="12" xl="12" md="12">
        <div class="d-flex justify-content-between">
          <div class="d-flex align-items-center mb-4">
            <div class="mr-3 page-title">
              <h3 class="font-weight-bold m-0">Daily Huddle</h3>
            </div>
          </div>
        </div>

        <div class="huddle-tab">
          <b-tabs content-class="mt-1">
            <b-tab title="Scheduled (12)" active>
              <div class="mb-20">
                <DailyHuddleTableView/>
              </div>
            </b-tab>
            <b-tab title="Insights">
              <div class="mb-20">
                <InsightsView />
              </div>
            </b-tab>
          </b-tabs>
        </div>
        <div class="mt-1" v-if="selectedView === 'Draggable'">
          <DynamicDraggableView />
        </div>
      </b-col>
    </b-row>
  </div>
  <Loader v-else />
</template>
<script>
import DailyHuddleTableView from "../daily-huddle/views/table/DailyHuddleTableView";
import DynamicDraggableView from "../daily-huddle/views/draggable/DynamicDraggableView";
import InsightsView from "../../../components/insights/insights";
import Loader from "../../../components/loader/loader";
import ProviderSearchSelect from "../../../components/provider/ProviderSearchSelect";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "DashboardV1",
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Dashboard v1",
  },
  components: {
    DailyHuddleTableView,
    DynamicDraggableView,
    InsightsView,
    Loader,
    ProviderSearchSelect
  },
  data() {
    return {
      selected_provider: null,
      selectedView: "Table",
      viewOptions: [
        {
          id: "table_view",
          title: "Table",
        },
        {
          id: "draggable_view",
          title: "Draggable",
        },
      ],
      // statusList: [
      //   { id: "NON_CONFIRMED", title: "Non-Confirmed" },
      //   { id: "SCHEDULED", title: "Scheduled" },
      //   { id: "IN_OFFICE", title: "In Office" },
      //   { id: "FINISHED", title: "Finished" },
      //   { id: "DEFERRED", title: "Deferred" },
      // ],
      tableColumns: [
        "Date/Time",
        "Provider",
        "Patient",
        "Status",
        "Operatory",
      ],
      tableRows: [],
    };
  },
  computed: {
    ...mapGetters(["getItems", "getLoading"]),
  },
  created: function () {
    // this.items = this.getItems;
  },
  methods: {
    ...mapActions(["setLoading"]),
    addCartPage() {},
    onChangeProvider(val){
      this.selected_provider = val;
    }
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
.daily-huddle .switch input:checked + .slider,
.daily-huddle .switch .slider {
  background-color: #fff !important;
}
.switch .slider:before {
  background-color: #6cdcd4 !important;
}
.daily-huddle span {
  color: #9badbf;
  font-weight: normal;
}
.provider-dropdown .dropdown-toggle {
  max-width: 200px;
  min-width: 200px;
  text-align: left;
}
.provider-dropdown .dropdown-menu {
  right: 0 !important;
}
.daily-huddle span.active-tab {
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
  padding: 10px 10px 5px;
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
.card-table .table th {
  padding: 0;
  text-align: center;
  background-color: transparent;
}
.card-table .table th span {
  padding: 12px;
  margin-bottom: 10px;
  display: block;
}
.card-table .table tbody tr td {
  text-align: center;
  vertical-align: middle;
  border: 0;
  color: #163c61;
  background-color: #fff;
  padding: 20px;
}
.card-table .table tbody tr td span {
  display: block;
}
.card-table .table tbody tr td span label {
  margin: 0;
  padding-left: 12px;
  margin-left: 10px;
  position: relative;
  color: #a9b8c5;
}
.card-table .table tbody tr td span label:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: #111827;
}
.status-dropdown button {
  border: 0;
  background-color: transparent !important;
  color: #00c5b4 !important;
}
.status-dropdown button:focus,
.status-dropdown button:hover {
  box-shadow: none;
}
.card-table .table tbody tr td:first-child span {
  border-radius: 10px 0 0 10px;
}
.card-table .table tbody tr td:last-child span {
  border-radius: 0 10px 10px 0;
}
</style>
