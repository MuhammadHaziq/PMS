<template>
  <div class="main-content" v-if="!getLoading">
    <!-- <breadcumb :page="'Dashboard'" :folder="'Version 1'" /> -->
    <b-row>
      <b-col lg="12" md="12">
        <!--  <b-card header="Daily Huddle" header-bg-variant="transparent">-->
        <div class="mb-3 page-title d-flex justify-content-between">
          <h3 class="font-weight-bold m-0">Location Hours</h3>
          <b-button
            class="btn-radius"
            variant="primary ripple ml-2"
            @click="$bvModal.show('location-hours')"
            >Edit Hours</b-button
          >
        </div>

        <div class="d-flex justify-content-between mb-3">
          <div class="d-flex">
            <label class="radio radio-success">
              <input
                type="radio"
                name="radio"
                :checked="selectedTimeInterval === 10"
                @change="changeInterval(10)"
              />
              <span>Display schedule in 10 minutes increments</span>
              <span class="checkmark"></span>
            </label>
            <label class="radio radio-success ml-3">
              <input
                type="radio"
                name="radio"
                :checked="selectedTimeInterval === 15"
                @change="changeInterval(15)"
              />
              <span>Display schedule in 15 minutes increments</span>
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="d-flex">
            <label>Default appointment length (min)</label>
            <b-form-input type="number" class="w-auto ml-2"> </b-form-input>
          </div>
        </div>

        <div class="schedule-vue-sample">
          <div class="control-section">
            <div class="schedule-container">
              <ejs-schedule
                id="Schedule2"
                ref="ScheduleObj2"
                :height="calenderHieght"
                :selectedDate="dateSelected"
                :timeScale="timeScale"
                :eventSettings="eventSettings"
                :eventRendered="onEventRendered"
                :currentView="currentView"
                :actionBegin="onActionBegin"
                :actionComplete="onActionComplete"
                :popupOpen="onPopupOpen"
              >
                <e-header-rows>
                  <!-- <e-header-row option="Month" :template="monthHeaderTemplate"></e-header-row> -->
                  <e-header-row option="Week"></e-header-row>
                  <e-header-row option="Date"></e-header-row>
                </e-header-rows>
                <e-views>
                  <e-view option="Week"></e-view>
                  <!-- <e-view option="Day"></e-view>
                  <e-view option="Month"></e-view> -->
                </e-views>
              </ejs-schedule>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>

    <b-modal id="location-hours" size="lg" hide-header hide-footer>
      <div class="location-header">
        <h5>Location Hours</h5>
        <div class="header-btn">
          <b-button variant="primary">Add Hours</b-button>
          <b-button variant="outline-primary">Cancel</b-button>
        </div>
      </div>
      <div class="row no-gutters">
        <div class="col-md-6">
          <div class="location-hours-table">
            <LocationHoursTable />
          </div>
        </div>
        <div class="col-md-6">
          <div class="location-hours-info">
            <h5>Edit Location Hour Information</h5>
            <b-form-group class="mb-3">
              <div class="row">
                <div class="col-md-5">
                  <label>Start</label>
                  <b-form-timepicker
                    id="timepicker-placeholder"
                    class="icon-none default-timepicker"
                    placeholder="Choose a time"
                    local="en"
                  ></b-form-timepicker>
                </div>
              </div>
            </b-form-group>
            <b-form-group class="mb-3">
              <div class="row">
                <div class="col-md-5">
                  <label>End</label>
                  <b-form-timepicker
                    id="timepicker-placeholder"
                    class="icon-none default-timepicker"
                    placeholder="Choose a time"
                    local="en"
                  ></b-form-timepicker>
                </div>
              </div>
            </b-form-group>
            <b-form-group>
              <label>Days of the week</label>
              <label
                class="checkbox checkbox-outline-primary"
                v-for="day in daysOfWeek"
                :key="day"
              >
                <input type="checkbox" checked />
                <span>{{ day }}</span>
                <span class="checkmark"></span>
              </label>
            </b-form-group>
            <b-form-group class="form-btn">
              <div class="row">
                <div class="col-md-8">
                  <b-button variant="primary">Save</b-button>
                  <b-button variant="outline-primary">Cancel</b-button>
                </div>
                <div class="col-md-4 text-right">
                  <b-button variant="danger">Delete</b-button>
                </div>
              </div>
            </b-form-group>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
  <Loader v-else />
</template>
<style>
#location-hours .modal-dialog {
  max-width: 80%;
}
.location-hours-info {
  min-height: 550px;
  display: flex;
  flex-direction: column;
  padding: 15px;
}
.location-hours-info h5 {
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
}
.location-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e5f4f8;
  padding: 10px;
}
.location-header h5 {
  margin: 0;
}
#location-hours .form-btn {
  margin-top: auto;
  background-color: #e5f4f8;
  padding: 10px;
}
#location-hours .form-btn .btn,
.header-btn .btn {
  padding: 5px 10px;
  font-size: 12px;
}
.header-btn .btn + .btn,
#location-hours .form-btn .btn + .btn {
  margin-left: 10px;
}
.location-hours-table {
  background-color: rgba(229, 244, 248, 0.45);
  height: 100%;
}
.location-hours-info .form-btn {
  margin: auto -15px -15px;
}
</style>

<script>
import Vue from "vue";
import { extend } from "@syncfusion/ej2-base";
import {
  SchedulePlugin,
  Day,
  TimelineViews,
  TimelineMonth,
  Month,
  Week,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-vue-schedule";
import { ColorPickerPlugin } from "@syncfusion/ej2-vue-inputs";
import LocationHoursTable from "./table";
import { mapActions, mapGetters } from "vuex";
import Loader from "../../../components/loader/loader";

Vue.use(SchedulePlugin);
Vue.use(ColorPickerPlugin);

export default {
  components: { LocationHoursTable, Loader },
  mounted() {
    this.setLoading(true);
    setTimeout(() => {
      this.setLoading(false);
    }, 2000);
    var target = document.getElementById("element");
    if (target) {
      target.nextElementSibling.insertBefore(
        target,
        target.nextElementSibling.children[1]
      );
    }
  },
  data() {
    return {
      eventSettings: {
        dataSource: extend([], [], null, true),
      },
      selectedTimeInterval: 10,
      timeScale: { enable: true, interval: 10, slotCount: 1 },
      dateSelected: new Date(),
      currentView: "Week",
      calenderHieght: window.innerHeight - 220,
      daysOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    };
  },
  computed: { ...mapGetters(["getLoading"]) },
  methods: {
    ...mapActions(["setLoading"]),
    makeToast(variant = null, msg) {
      this.$bvToast.toast(msg, {
        title: ` ${variant || "default"}`,
        variant: variant,
        solid: true,
      });
    },
    onEventRendered: function (args) {
      let categoryColor = args.data.CategoryColor;
      if (!args.element || !categoryColor) {
        return;
      }
      args.element.style.backgroundColor = categoryColor;
    },
    onActionBegin: function (args) {
      if (args.requestType === "toolbarItemRendering") {
        let fullScreenIconItem = {
          align: "Right",
          prefixIcon: "i-Full-Screen",
          cssClass: "full-screen-view-icon",
        };
        args.items.push(fullScreenIconItem);
      }
    },
    onActionComplete: function (args) {
      let scheduleElement = document.getElementById("Schedule2");
      if (args.requestType === "toolBarItemRendered") {
        let fullScreenIconItem = scheduleElement.querySelector(
          ".full-screen-view-icon"
        );
        fullScreenIconItem.onclick = () => {
          this.$fullscreen.toggle(this.$el.querySelector("#Schedule2"), {
            wrap: false,
            callback: this.fullscreenChange,
          });
        };
      }
    },
    fullscreenChange(fullscreen) {
      this.fullscreen = fullscreen;
    },
    onPopupOpen: (args) => {
      args.cancel = true;
    },
    changeInterval(value) {
      this.selectedTimeInterval = value;
      let scheduleObj = this.$refs.ScheduleObj2;
      scheduleObj.ej2Instances.timeScale.interval = parseInt(
        this.selectedTimeInterval,
        10
      );
      scheduleObj.dataBind();
    },
  },
  provide: {
    schedule: [
      Day,
      TimelineViews,
      TimelineMonth,
      Month,
      Week,
      Resize,
      DragAndDrop,
    ],
  },
};
</script>