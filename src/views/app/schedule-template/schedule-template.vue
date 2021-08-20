<template>
  <div class="main-content" v-if="!getLoading">
    <!-- <breadcumb :page="'Dashboard'" :folder="'Version 1'" /> -->
    <b-row>
      <b-col lg="9" md="8">
        <!--  <b-card header="Daily Huddle" header-bg-variant="transparent">-->
        <div class="mb-3 page-title">
          <h3 class="font-weight-bold m-0">Schedule Template</h3>
        </div>

        <div class="schedule-vue-sample">
          <div class="control-section">
            <div class="schedule-container">
              <ejs-schedule
                v-if="show"
                id="Schedule1"
                ref="ScheduleObj1"
                :height="calenderHieght"
                :selectedDate="dateSelected"
                :eventSettings="eventSettings"
                :eventRendered="onEventRendered"
                :currentView="currentView"
                :actionBegin="onActionBegin"
                :actionComplete="onActionComplete"
                :popupOpen="onPopupOpen"
                :cellClick="onCellClick"
                :eventClick="onEventClick"
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
      <b-col lg="3" md="4">

        <div class="mb-3 page-title">
          <h3 class="font-weight-bold m-0">Operatories</h3>
        </div>
     
        <div class="appointment-list">
          <div class="office-selection mb-3">
            <OfficeSearchSelect v-on:update="onOfficeUpdate"/>
          </div>             
          <div
            :class="`appointment-card c-pointer ${
              operatory.id === selectedOperatory.id ? 'selected' : ''
            }`"
            v-for="operatory in operatories"
            :key="operatory.id"
            @click="openOperatory(operatory)"
          >
            <div class="appointment-title">{{ operatory.name }}</div>
            <ul class="days">
              <li
                :class="
                  !availability['MON'].includes(operatory.name)
                    ? 'disabled'
                    : ''
                "
              >
                M
              </li>
              <li
                :class="
                  !availability['TUE'].includes(operatory.name)
                    ? 'disabled'
                    : ''
                "
              >
                T
              </li>
              <li
                :class="
                  !availability['WED'].includes(operatory.name)
                    ? 'disabled'
                    : ''
                "
              >
                W
              </li>
              <li
                :class="
                  !availability['THU'].includes(operatory.name)
                    ? 'disabled'
                    : ''
                "
              >
                T
              </li>
              <li
                :class="
                  !availability['FRI'].includes(operatory.name)
                    ? 'disabled'
                    : ''
                "
              >
                F
              </li>
              <li
                :class="
                  !availability['SAT'].includes(operatory.name)
                    ? 'disabled'
                    : ''
                "
              >
                S
              </li>
              <li
                :class="
                  !availability['SUN'].includes(operatory.name)
                    ? 'disabled'
                    : ''
                "
              >
                S
              </li>
            </ul>
          </div>
        </div>
      </b-col>

      <b-modal
        id="operatory"
        size="xl"
        hide-footer
        :title="selectedOperatory && selectedOperatory.name"
      >
        <div class="schedule-template-form">
          <b-row class="mb-5 pb-5">
            <b-col lg="6" md="6">
              <b-form>
                <b-form-group class="col-md-12 mb-3" label="Title">
                  <b-form-input
                    type="text"
                    required
                    :value="selectedOperatory.title"
                    placeholder="Teeth Cleaning"
                  ></b-form-input>
                </b-form-group>
                <b-form-group class="col-md-6 mb-3">
                  <label class="form-label">Day Of Week <span>*</span></label>
                  <b-dropdown block id="dayOfWeek" text="Monday" class="mb-2">
                    <b-dropdown-item>Monday</b-dropdown-item>
                    <b-dropdown-item>Tuesday</b-dropdown-item>
                  </b-dropdown>
                </b-form-group>
                <b-form-group class="col-md-6 mb-3">
                  <label class="form-label">Available <span>*</span></label>
                  <div class="available-timepicker">
                    <b-form-timepicker
                      id="timepicker-buttons-start"
                      now-button
                      class="default-timepicker"
                      reset-button
                      v-model="selectedOperatory.startTime"
                      locale="en"
                    ></b-form-timepicker>
                    <span>-</span>
                    <b-form-timepicker
                      id="timepicker-buttons-end"
                      now-button
                      reset-button
                      class="default-timepicker"
                      locale="en"
                      v-model="selectedOperatory.endTime"
                    ></b-form-timepicker>
                  </div>
                </b-form-group>
                <b-form-group class="col-md-12 mb-3">
                  <label class="form-label"
                    >Provider that can be booked <span>*</span></label
                  >
                  <b-form-tags
                    input-id="tags-basic"
                    v-model="bookedProvider"
                    placeholder=""
                  ></b-form-tags>
                </b-form-group>
              </b-form>
            </b-col>
            <b-col lg="6" md="6">
              <b-form-group class="col-md-4 mb-3">
                <label class="form-label">Color <span>*</span></label>
                <ejs-colorpicker
                  id="element"
                  type="text"
                  class="e-input"
                  :value="selectedOperatory.color"
                >
                </ejs-colorpicker>
              </b-form-group>
              <b-form-group class="mb-3 online-appoitment-booked">
                <label class="form-label"
                  >What type of appointments can be booked online?
                  <span>*</span></label
                >
                <div class="d-flex align-items-center">
                  <label class="checkbox checkbox-outline-primary">
                    <input type="checkbox" checked />
                    <span>Recare</span>
                    <span class="checkmark"></span>
                  </label>
                  <i class="fa fa-info-circle"></i>
                </div>
                <div class="d-flex align-items-center">
                  <label class="checkbox checkbox-outline-primary">
                    <input type="checkbox" checked />
                    <span>New Patients</span>
                    <span class="checkmark"></span>
                  </label>
                  <i class="fa fa-info-circle"></i>
                </div>
                <div class="d-flex align-items-center">
                  <label class="checkbox checkbox-outline-primary">
                    <input type="checkbox" checked />
                    <span>Existing Patients</span>
                    <span class="checkmark"></span>
                  </label>
                  <i class="fa fa-info-circle"></i>
                </div>
                <div class="d-flex align-items-center">
                  <label class="checkbox checkbox-outline-primary">
                    <input type="checkbox" />
                    <span>None (do not allow online booking)</span>
                    <span class="checkmark"></span>
                  </label>
                </div>
              </b-form-group>
              <b-form-group class="mb-3">
                <label class="form-label"
                  >What appointment reasons can patients choose from?
                  <span>*</span></label
                >
                <div class="d-flex align-items-center">
                  <label class="checkbox checkbox-outline-primary">
                    <input type="checkbox" />
                    <span>Other</span>
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="d-flex align-items-center">
                  <label class="checkbox checkbox-outline-primary">
                    <input type="checkbox" checked />
                    <span>Teeth Cleaning</span>
                    <span class="checkmark"></span>
                  </label>
                </div>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="6" md="6">
              <b-button class="btn-radius" variant="primary ripple ml-2"
                >Save</b-button
              >
              <b-button class="btn-radius" variant="outline-primary ripple m-1"
                >Cancel</b-button
              >
            </b-col>
            <b-col lg="6" md="6" class="text-right">
              <b-button class="btn-radius" variant="danger ripple ml-2"
                >Delete</b-button
              >
            </b-col>
          </b-row>
        </div>
      </b-modal>
    </b-row>
  </div>
  <Loader v-else />
</template>
<style>
#operatory .modal-dialog {
  max-width: 70%;
}

.appointment-list {
  height: -moz-calc(100vh - 265px);
  height: -webkit-calc(100vh - 265px);
  height: calc(100vh - 265px);
  overflow-y: auto;
}

.appointment-list .office-selection {
  width: 90%;
}

.appointment-card {
  width: 90%;
  background-color: #fff;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 5%);
}
.appointment-card.selected {
  background-color: #00c5b4;
}
.appointment-card:last-child {
  margin-bottom: 0;
}
.appointment-title {
  color: #12395f;
  font-weight: bold;
  font-size: 17px;
}
.days {
  margin: 0;
  padding: 0;
  display: inline-block;
}
.days li {
  float: left;
  color: #33b5e6;
  list-style: none;
  margin-right: 3px;
  font-size: 15px;
  line-height: 1;
  margin-top: 5px;
}
.days li.disabled {
  color: #d5f0f9;
}
.selected .days li {
  color: #0c90c1;
}
.selected .days li.disabled {
  color: #fff;
}

.schedule-template-form .form-label {
  display: block;
}
.schedule-template-form .form-label span {
  color: red;
}
.schedule-template-form .form-control {
  background-color: #fff;
}
.schedule-template-form .form-control:focus,
.schedule-template-form .form-control.focus {
  border-color: #6cdcd4;
  box-shadow: none;
}
.schedule-template-form .dropdown-toggle {
  text-align: left;
}
.schedule-template-form .dropdown-menu {
  width: 100%;
  right: 0;
}
.schedule-template-form .online-appoitment-booked i {
  margin-left: 10px;
  margin-top: -10px;
  font-size: 16px;
}
.e-colorpicker-wrapper,
.e-split-btn-wrapper,
.e-split-colorpicker,
.e-split-colorpicker .e-selected-color,
.e-split-colorpicker .e-selected-color .e-split-preview {
  width: 100% !important;
}
.e-split-colorpicker:hover,
.e-split-colorpicker:focus {
  border: 0 !important;
  box-shadow: none !important;
  background-color: transparent !important;
}
.b-form-tags-list .badge {
  background-color: transparent;
  color: #4b5563;
  border: 1px solid #4b5563;
}
.b-form-tags-list li {
  padding: 4px;
}
.b-form-tags-input,
.b-form-tags-list .badge .text-truncate,
.b-form-tags-list .badge .b-form-tag-remove {
  font-size: 14px;
}
.b-form-tags-list li .b-form-tags-button:hover {
  background: #6cdcd4;
  border-color: #6cdcd4;
}
.b-form-tags.focus {
  border-color: #6cdcd4 !important;
  box-shadow: none !important;
}
.available-timepicker {
  display: flex;
}
.available-timepicker > span {
  padding: 0 5px;
  font-size: 20px;
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
import { mapActions, mapGetters } from "vuex";
import Loader from "../../../components/loader/loader";
import * as moment from "moment";
import OfficeSearchSelect from '../../../components/office/OfficeSearchSelect.vue';

Vue.use(SchedulePlugin);
Vue.use(ColorPickerPlugin);
const resourceData = [
  {
    Id: 1,
    Subject: "Detail 1",
    StartTime: new Date(new Date().setHours(11)),
    EndTime: new Date(new Date().setHours(12)),
    IsAllDay: false,
    CategoryColor: "#bbdc00",
  },
  {
    Id: 2,
    Subject: "Detail 2",
    StartTime: new Date(new Date().setHours(14)),
    EndTime: new Date(new Date().setHours(16)),
    IsAllDay: false,
    CategoryColor: "#9e5fff",
  },
];

export default {
  mounted() {
    this.setLoading(true);
    setTimeout(() => {
      this.setLoading(false);
    }, 2000);
    this.setResourceData();
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
      bookedProvider: ["One, Hygiene - Hygien"],
      availability: {
        MON: ["OP-1", "OP-2", "OP-3", "OP-5", "Other Office"],
        TUE: ["OP-1", "OP-3", "OP-4", "OP-5"],
        WED: ["OP-3", "OP-4", "OP-5"],
        THU: ["OP-1", "OP-2", "OP-3", "OP-4", "Other Office"],
        FRI: ["OP-1", "OP-2", "OP-3", "OP-5", "Other Office"],
        SAT: ["Other Office"],
        SUN: ["Other Office"],
      },
      selectedOperatory: {
        id: 1,
        name: "OP-1",
        title: "",
        startTime: moment().format("HH:MM:SS"),
        endTime: moment().format("HH:MM:SS"),
        color: "#008000",
      },
      operatories: [
        {
          id: 1,
          name: "OP-1",
        },
        {
          id: 2,
          name: "OP-2",
        },
        {
          id: 3,
          name: "OP-3",
        },
        {
          id: 4,
          name: "OP-4",
        },
        {
          id: 5,
          name: "OP-5",
        },
        {
          id: 6,
          name: "Other Office",
        },
      ],
      eventSettings: {
        dataSource: extend([], resourceData, null, true),
      },
      show: false,
      dateSelected: new Date(),
      currentView: "Week",
      calenderHieght: window.innerHeight - 200,
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
    openOperatory(data) {
      this.selectedOperatory = data;
    },
    setResourceData() {
      this.eventSettings.dataSource = resourceData;
      setTimeout(() => {
        this.show = true;
      }, 200);
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
      let scheduleElement = document.getElementById("Schedule1");
      if (args.requestType === "toolBarItemRendered") {
        let fullScreenIconItem = scheduleElement.querySelector(
          ".full-screen-view-icon"
        );
        fullScreenIconItem.onclick = () => {
          this.$fullscreen.toggle(this.$el.querySelector("#Schedule1"), {
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
    onEventClick(e) {
      const { event } = e;
      const data = {
        title: event.Subject,
        startTime: moment(event.StartTime).format("HH:MM:SS"),
        endTime: moment(event.EndTime).format("HH:MM:SS"),
        color: event.CategoryColor,
      };
      this.selectedOperatory = {
        ...this.selectedOperatory,
        ...data,
      };
      this.$bvModal.show("operatory");
    },
    onCellClick(event) {
      const data = {
        title: "",
        startTime: moment(event.startTime).format("HH:MM:SS"),
        endTime: moment(event.endTime).format("HH:MM:SS"),
        color: "#008000",
      };
      this.selectedOperatory = {
        ...this.selectedOperatory,
        ...data,
      };
      this.$bvModal.show("operatory");
    },
    onOfficeUpdate(val){

    }
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
  components: { Loader, OfficeSearchSelect },
};
</script>