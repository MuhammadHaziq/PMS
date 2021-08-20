<template>
  <!-- ============ Body content start ============= -->
  <div class="main-content">
    <!-- <breadcumb :page="'Dashboard'" :folder="'Version 1'" /> -->
    <b-row>
      <b-col lg="12" xl="12" md="12">
        <!--  <b-card header="Daily Huddle" header-bg-variant="transparent">-->
        <div class="d-flex justify-content-between">
          <div class="d-flex align-items-center mb-4">
            <div class="mr-3 page-title">
              <h3 class="font-weight-bold m-0">Daily Huddle</h3>
            </div>
            <!-- <div class="daily-huddle">
              <span
                :class="`mr-3 ${selectedView === 'Table' ? 'active-tab' : ''}`"
                >Tab</span
              >
              <label class="switch m-0">
                <input
                  type="checkbox"
                  :checked="selectedView !== 'Table'"
                  @change="
                    selectedView =
                      selectedView === 'Table' ? 'Draggable' : 'Table'
                  "
                />
                <span class="slider"></span>
              </label>
              <span
                :class="`ml-2 ${selectedView !== 'Table' ? 'active-tab' : ''}`"
                >Card</span
              >
            </div> -->
          </div>
          <div>
            <b-dropdown
              class="provider-dropdown mb-2 mr-5"
              :text="selectedProvider ? selectedProvider : 'Select Provider'"
            >
              <b-dropdown-item @click="selectedProvider = ''"
                >Select Provider</b-dropdown-item
              >
              <b-dropdown-item
                v-for="provider in providers"
                :value="provider.name"
                :key="provider.id"
                @click="selectedProvider = provider.name"
                >{{ provider.name }}</b-dropdown-item
              >
            </b-dropdown>
          </div>
        </div>

        <div class="huddle-tab" v-if="selectedView === 'Table'">
          <b-tabs content-class="mt-1">
            <b-tab title="Scheduled (12)" active>
              <div class="mb-20">
                <DailyHuddleTableView
                  :columns="tableColumns"
                  :rows="tableRows"
                />
              </div>
            </b-tab>
            <b-tab title="Insights">
              <div class="mb-20">
                <InsightsView />
              </div>
            </b-tab>
            <!-- <b-tab title="Finished (34)">
              <div class="mb-20">
                <DynamicCustomTableView
                  :columns="tableColumns"
                  :rows="tableRows"
                  :statusList="statusList"
                />
              </div>
            </b-tab>
            <b-tab title="Deferred (21)">
              <div class="mb-20">
                <DynamicCustomTableView
                  :columns="tableColumns"
                  :rows="tableRows"
                  :statusList="statusList"
                />
              </div>
            </b-tab> -->
          </b-tabs>
        </div>
        <div class="mt-1" v-if="selectedView === 'Draggable'">
          <DynamicDraggableView />
        </div>
        <!--</b-card>-->
      </b-col>
    </b-row>
  </div>
</template>
<script>
import DailyHuddleTableView from "../dashboards/views/table/DailyHuddleTableView";
import DynamicDraggableView from "../dashboards/views/draggable/DynamicDraggableView";
import InsightsView from "../../../components/insights/insights";

import { mapGetters } from "vuex";

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
  },
  data() {
    return {
      providers: [
        {
          id: 1,
          name: "Medical Center 1",
        },
        {
          id: 2,
          name: "Medical Center 2",
        },
        {
          id: 3,
          name: "Medical Center 3",
        },
      ],
      selectedProvider: "",
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
      statusList: [
        { id: 1, title: "Scheduled" },
        { id: 2, title: "In Office" },
        { id: 3, title: "Finished" },
        { id: 4, title: "Deferred" },
      ],
      tableColumns: [
        "Date/Time",
        "Name/Cell Phone",
        "Social History",
        "Last Dental Treatment",
        "Pending Treatment",
        "Insurance Example",
      ],
      tableRows: [
        {
          id: 1,
          time: "07:00-07:30 AM",
          phone: "(815) - 302 - 864",
          socialHistory: "Medical Center 1",
          lastTreatment: "-",
          pendingTreatment: "-",
          insuranceExample: "Delta Dental ",
        },
        {
          id: 2,
          time: "07:00-07:30 AM",
          phone: "(815) - 302 - 864",
          socialHistory: "Medical Center 1",
          lastTreatment: "-",
          pendingTreatment: "-",
          insuranceExample: "Delta Dental ",
        },
        {
          id: 3,
          time: "07:00-07:30 AM",
          phone: "(815) - 302 - 864",
          socialHistory: "Medical Center 1",
          lastTreatment: "-",
          pendingTreatment: "-",
          insuranceExample: "Delta Dental ",
        },
        {
          id: 4,
          time: "07:00-07:30 AM",
          phone: "(815) - 302 - 864",
          socialHistory: "Medical Center 1",
          lastTreatment: "-",
          pendingTreatment: "-",
          insuranceExample: "Delta Dental ",
        },
        {
          id: 5,
          time: "07:00-07:30 AM",
          phone: "(815) - 302 - 864",
          socialHistory: "Medical Center 1",
          lastTreatment: "-",
          pendingTreatment: "-",
          insuranceExample: "Delta Dental ",
        },
        {
          id: 6,
          time: "07:00-07:30 AM",
          phone: "(815) - 302 - 864",
          socialHistory: "Medical Center 1",
          lastTreatment: "-",
          pendingTreatment: "-",
          insuranceExample: "Delta Dental ",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["getItems"]),
  },
  created: function () {
    // this.items = this.getItems;
  },
  methods: {
    addCartPage() {},
  },
  mounted() {
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
