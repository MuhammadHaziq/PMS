<template>
  <div class="text-center">
    <div class="pt-3 progress-header">
      <b-button
        variant="link"
        class="text-primary btn-back"
        v-if="getCompletedStep > 1"
        @click="setCompletedStep(getCompletedStep - 1)"
        ><i class="fa fa-angle-left mr-2"></i
      ></b-button>
      <b-button
        variant="link"
        class="text-danger btn-cancel"
        v-if="getCompletedStep > 1"
        @click="closeAppointment"
        ><i class="fa fa-times ml-2"></i
      ></b-button>
      <img
        src="@/assets/images/thdc-logo.png"
        alt="Total Health Dental Care"
        style="max-width: 320px; width: 100%; cursor: pointer"
      />
    </div>
    <div class="progress mt-4 mb-5">
      <div
        class="progress-bar progress-bar-striped active"
        role="progressbar"
        v-bind:aria-valuenow="getProgressValue"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="{ width: `${getProgressValue}%` }"
        :class="{ 'progress-bar-success': getProgressValue === 100 }"
      ></div>
    </div>
    <div class="step">
      <div class="container">
        <div class="row justify-content-center" v-if="getCompletedStep === 1">
          <div class="col-xl-7">
            <label class="custom-label"
              >To schedule an appointment, please enter your phone number</label
            >
            <b-form-group>
              <b-input placeholder="Phone Number" type="number" />
            </b-form-group>
          </div>
        </div>
        <div class="row justify-content-center" v-if="getCompletedStep === 2">
          <div class="col-xl-7">
            <label class="custom-label"
              >Please enter 4 digits code that we sent on your number.</label
            >
            <div class="row">
              <div class="col-md-3">
                <b-form-group>
                  <b-input type="text" class="text-center" />
                </b-form-group>
              </div>
              <div class="col-md-3">
                <b-form-group>
                  <b-input type="text" class="text-center" />
                </b-form-group>
              </div>
              <div class="col-md-3">
                <b-form-group>
                  <b-input type="text" class="text-center" />
                </b-form-group>
              </div>
              <div class="col-md-3">
                <b-form-group>
                  <b-input type="text" class="text-center" />
                </b-form-group>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-content-center" v-if="getCompletedStep === 3">
          <div class="col-xl-7">
            <label class="custom-label">What's your first name?</label>
            <b-form-group>
              <b-input placeholder="First Name" type="text" />
            </b-form-group>
          </div>
        </div>
        <div class="row justify-content-center" v-if="getCompletedStep === 4">
          <div class="col-xl-7">
            <label class="custom-label">And what's your last name?</label>
            <b-form-group>
              <b-input placeholder="Last Name" type="text" />
            </b-form-group>
          </div>
        </div>
        <div class="row justify-content-center" v-if="getCompletedStep === 5">
          <div class="col-xl-7">
            <label class="custom-label">And what's your date of birth?</label>
            <b-form-group>
              <b-input placeholder="dd-mm-yyyy" type="date" />
            </b-form-group>
          </div>
        </div>
        <div class="row justify-content-center" v-if="getCompletedStep === 6">
          <div class="col-xl-7">
            <label class="custom-label">What's your gender?</label>
            <b-form-group>
              <select
                name="gender"
                id="gender"
                class="custom-input custom-select"
              >
                <option value="" selected="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </b-form-group>
          </div>
        </div>
        <div class="row justify-content-center" v-if="getCompletedStep === 7">
          <div class="col-xl-7">
            <label class="custom-label"
              >Please enter the email address you would like to use</label
            >
            <b-form-group>
              <b-input placeholder="Email" type="email" />
            </b-form-group>
          </div>
        </div>
        <div class="row justify-content-center" v-if="getCompletedStep === 8">
          <div class="col-xl-7">
            <label class="custom-label">What's your address?</label>
            <b-form-group>
              <b-input placeholder="Address" type="text" />
            </b-form-group>
          </div>
        </div>
        <div class="row justify-content-center" v-if="getCompletedStep === 9">
          <div class="col-xl-7">
            <label class="custom-label"
              >Tell us the reason for the appointment</label
            >
            <b-form-group class="mb-5">
              <select
                name="gender"
                id="gender"
                class="custom-input custom-select"
                @change="
                  (e) => {
                    appointmentData.type = e.target.value;
                  }
                "
              >
                <option value="" selected="">Select Reason</option>
                <option value="Teeth Cleaning">Teeth Cleaning</option>
                <option value="Other">Other</option>
              </select>
            </b-form-group>
            <b-form-group>
              <b-textarea
                placeholder="Write additional note here (optional)"
                rows="5"
              />
            </b-form-group>
          </div>
        </div>
        <div class="row justify-content-center" v-if="getCompletedStep === 10">
          <div class="col-xl-7">
            <label class="custom-label"
              >Please select your preferred location?</label
            >
            <b-form-group class="mb-5">
              <select
                name="location"
                id="location"
                class="custom-input custom-select"
                style="height: 52px"
                @change="
                  (e) => {
                    appointmentData.location = e.target.value;
                  }
                "
              >
                <option value="" selected="">Select Location</option>
                <option value="THDC Office 1">THDC Office 1</option>
                <option value="THDC Office 2">THDC Office 2</option>
              </select>
            </b-form-group>
          </div>
        </div>
        <div class="row justify-content-center" v-if="getCompletedStep === 11">
          <div class="col-xl-7">
            <label class="custom-label"
              >Please select your welcome appointment. This is for all first
              time patients.</label
            >
            <b-form-group class="mb-5">
              <select
                name="aptLocation"
                id="location"
                class="custom-input custom-select"
                style="height: 52px"
              >
                <option value="">Select Appointment Location</option>
                <option value="7000000000142" selected="">THDC Office 1</option>
              </select>
            </b-form-group>
          </div>
        </div>
        <div
          class="row appointment-calender justify-content-center"
          v-if="getCompletedStep === 12"
        >
          <label class="custom-label">Choose a time for the appointment?</label>
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
                          >Web conferencing details provided upon
                          confirmation.</span
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
                      :locale="{
                        firstDayOfWeek: 2,
                        masks: { weekdays: 'WWW' },
                      }"
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
                        <b-button
                          pill
                          variant="primary ripple"
                          @click="
                            () => {
                              appointmentData.time = timeSlot.time;
                              getCompletedStep < 13 &&
                                setCompletedStep(getCompletedStep + 1);
                            }
                          "
                          >Confirm</b-button
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </b-card>
        </div>
        <div class="row justify-content-center" v-if="getCompletedStep === 13">
          <div class="col-xl-7">
            <label class="custom-label"
              >Please confirm before proceeding to schedule an
              appointment.</label
            >
            <table class="mb-5 table table-sm table-bordered">
              <tbody>
                <tr>
                  <th>Time:</th>
                  <td>{{appointmentData.time}}</td>
                </tr>
                <tr>
                  <th>Date:</th>
                  <td>{{moment(appointmentData.date).format("MMM D, YYYY")}}</td>
                </tr>
                <tr>
                  <th>Type:</th>
                  <td>{{appointmentData.type}}</td>
                </tr>
                <tr>
                  <th>Location:</th>
                  <td>{{appointmentData.location}}</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
        <div class="row justify-content-center" v-if="getCompletedStep !== 12">
          <div class="col-xl-7">
            <div class="btn-action">
              <b-button
                variant="primary"
                class="btn-block btn-radius"
                @click="
                  getCompletedStep < 13 &&
                    setCompletedStep(getCompletedStep + 1)
                "
                >{{
                  getCompletedStep === 12
                    ? "Proceed to confirmation"
                    : getCompletedStep === 13
                    ? "Confirm Appointment"
                    : "Next"
                }}<b-spinner variant="primary"></b-spinner
              ></b-button>
            </div>
            <p class="mt-3" v-if="getCompletedStep === 2">
              Not recieved code?
              <span class="text-primary c-pointer">Resend</span>
            </p>
            <div
              class="map mt-3"
              v-if="getCompletedStep === 10 || getCompletedStep === 11"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.8163302922917!2d72.87653721540444!3d21.239130685937898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f46288c33f5%3A0x6242c4a7d89a8416!2sKhodiyar%20Nagar%2C%20Mota%20Varachha%2C%20Surat%2C%20Gujarat%20394101!5e0!3m2!1sen!2sin!4v1622213138177!5m2!1sen!2sin"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
</style>

<script>
import { mapActions, mapGetters } from "vuex";
import { DatePicker } from "v-calendar";
import * as moment from "moment";

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
      appointmentData: {
        time: new Date(),
        date: this.selectedDate,
        type: "",
        location: "",
      },
    };
  },
  components: { DatePicker },
  computed: {
    ...mapGetters(["getLoading", "getProgressValue", "getCompletedStep"]),
  },
  methods: {
    ...mapActions(["setCompletedStep"]),
    closeAppointment() {
      const confirmation = confirm("Are you sure?");
      if (confirmation) this.setCompletedStep(1);
    },
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