<template>
  <div class="main-content appointment-calender mx-auto" v-if="!getLoading">
    <b-card>
      <div class="row">
        <div class="col-md-5">
          <div class="calender-info">
            <div class="calender-meeting-info">
              <h5>Diana Tereshchenko</h5>
              <h3>60 Minute Meeting</h3>
              <ul>
                <li><i class="fa fa-clock-o"></i><span>60 min</span></li>
                <li>
                  <i class="fa fa-video-camera"></i
                  ><span
                    >Web conferencing details provided upon confirmation.</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-7">
          <div class="calender-right">
            <h5>Select a Date & Time</h5>
            <div class="calender-wrap">
              <DatePicker
                mode="single"
                title-position="left"
                v-model="selectedDate"
                :locale="{ firstDayOfWeek: 2, masks: { weekdays: 'WWW' } }"
                :disabled-dates="{ weekdays: [1, 7] }"
                :min-date="new Date()"
                @dayclick="onDayClick"
              />
              <ul class="time-slots">
                <h6 v-if="selectedDate">
                  {{ moment(selectedDate).format("dddd, MMM YY") }}
                </h6>
                <li
                  v-for="timeSlot in timeSlots"
                  :key="timeSlot.time"
                  :class="selectedTimeSlot === timeSlot ? 'active' : ''"
                >
                  <b-button
                    variant="outline-primary ripple"
                    @click="selectedTimeSlot = timeSlot"
                    >{{ timeSlot.time }}</b-button
                  >
                  <b-button pill variant="primary ripple">Confirm</b-button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </b-card>
  </div>
  <Loader v-else />
</template>
<style>
.appointment-calender {
  max-width: 1140px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.appointment-calender .card-body {
  padding: 0;
}
.calender-info {
  border-right: 1px solid #ddd;
  height: 100%;
}
.appointment-calender .vc-container {
  border: 0;
  max-width: 378px;
  width: 100%;
  height: 378px;
}
.appointment-calender .vc-container .vc-w-full,
.appointment-calender .vc-container .vc-grid-container,
.appointment-calender .vc-container .vc-pane {
  height: 100%;
  margin: 0;
  width: 100%;
}
.appointment-calender .vc-container .vc-day-content:not(.is-disabled) {
  background-color: #f2f7fc;
  color: #00c5b4;
  height: 40px;
  width: 40px;
}
.appointment-calender .vc-container .vc-day-content.is-disabled {
  pointer-events: none;
  cursor: not-allowed;
}
.appointment-calender .vc-container .vc-highlights + .vc-day-content,
.appointment-calender .vc-container .vc-day-content:focus {
  background-color: #00c5b4;
  color: #fff;
}
.appointment-calender .vc-container .vc-day-content {
  height: 46px;
  width: 46px;
}
.calender-right {
  padding: 20px 0;
}
.calender-right h5 {
  font-weight: bold;
  font-size: 20px;
}
.calender-wrap {
  display: flex;
  justify-content: space-between;
}
.time-slots {
  padding: 0 20px 0 0;
  margin: 0;
  width: 35%;
  overflow: hidden;
}
.time-slots h6 {
  font-size: 16px;
  padding-bottom: 5px;
  margin-top: 15px;
}
.time-slots li {
  list-style: none;
  display: flex;
  margin-top: 15px;
  justify-content: space-between;
}
.time-slots li button {
  -webkit-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  width: 100%;
  flex: 0 0 100%;
  display: block;
}
.time-slots li.active button {
  width: 49%;
  flex: 0 0 49%;
}
.time-slots li.active button.btn-outline-primary,
.time-slots li.active button.btn-outline-primary:focus {
  background-color: #4d5055;
  border-color: #f2f7fc !important;
  color: #fff;
}
.time-slots li button + button {
  opacity: 0;
  visibility: hidden;
  position: relative;
  margin-left: 3%;
  -moz-transform: translateX(40px);
  -webkit-transform: translateX(40px);
  transform: translateX(40px);
}
.time-slots li.active button + button {
  opacity: 1;
  visibility: visible;
  transform: translateX(0px);
  margin: 0;
}
.calender-meeting-info {
  padding: 20px;
}
.calender-meeting-info ul {
  margin: 0;
  padding: 0;
}

.calender-meeting-info ul li {
  list-style: none;
  padding-left: 27px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #949699;
}

.calender-meeting-info ul li i {
  position: absolute;
  left: 0;
  font-size: 18px;
}
.calender-meeting-info ul {
  margin: 0;
  padding: 0;
}

.calender-meeting-info ul li {
  list-style: none;
  padding-left: 27px;
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #949699;
}

.calender-meeting-info ul li i {
  position: absolute;
  left: 36px;
  font-size: 18px;
}

.calender-meeting-info h5 {
  font-size: 18px;
  color: #949699;
  font-weight: bold;
}

.calender-meeting-info h3 {
  font-size: 28px;
  font-weight: 900;
  margin-bottom: 15px;
  color: #4d5055;
}
</style>

<script>
import { DatePicker } from "v-calendar";
import * as moment from "moment";
import Loader from "../../../components/loader/loader";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      selectedDate: new Date(),
      selectedTimeSlot: null,
      firstDayOfWeek: 2,
      moment: moment,
      timeSlots: this.getTimeSlots(
        moment(new Date()).set({ hours: 15, minutes: 0, seconds: 0 }),
        moment(new Date()).set({ hours: 18, minutes: 0, seconds: 0 }),
        60
      ),
    };
  },
  components: {
    DatePicker,
    Loader,
  },
  computed: {
    ...mapGetters(["getLoading"]),
  },
  methods: {
    myDayFormat(e) {
      console.log(`e`, e);
      return moment(e).format("YYYY");
    },
    getTimeSlots(start, end, diff) {
      const startTime = moment(start, "HH:mm");
      const endTime = moment(end, "HH:mm");

      if (endTime.isBefore(startTime)) {
        endTime.add(1, "day");
      }
      this.timeSlots = [];
      while (startTime <= endTime) {
        this.timeSlots.push({
          time: moment(startTime).format("hh:mm A"),
          selected: false,
        });
        startTime.add(diff, "minutes");
      }
      return this.timeSlots;
    },
    onDayClick(e) {
      this.selectedDate = e.date;
      this.getTimeSlots(
        moment(e.date).set({ hours: 15, minutes: 0, seconds: 0 }),
        moment(e.date).set({ hours: 18, minutes: 0, seconds: 0 }),
        60
      );
      console.log(`e`, moment(e.date).format("MM-DD-YYYY HH:mm:ss a"));
      console.log(`this.timeSlots`, this.timeSlots);
    },
  },
};
</script>