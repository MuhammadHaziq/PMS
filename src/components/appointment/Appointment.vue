<template>
  <div>
    <div class="appointment-head">
      <h2>New Appointment</h2>
      <div class="head-right d-flex flex-column">
        <PatientSearchSelect v-on:update="setPatient" />
        <div
          class="text-danger"
          v-if="!$v.selected_patient.required && show_error"
        >
          Patient must be required.
        </div>
      </div>
    </div>
    <div class="appointment-body">
      <b-tabs>
        <b-tab title="Appoitment" active>
          <div class="mb-20">
            <div class="row">
              <div class="col-md-9">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <b-form-datepicker
                        :date-format-options="{
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        }"
                        id="appointment-date-selector"
                        v-model="appointment_date"
                        class="datepicker-input"
                      ></b-form-datepicker>
                      <div
                        class="text-danger"
                        v-if="!$v.appointment_date.required && show_error"
                      >
                        Date must be required.
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <b-form-timepicker
                        id="timepicker-placeholder"
                        v-model="appointment_time"
                        placeholder="Choose a time"
                        local="en"
                      ></b-form-timepicker>
                      <div
                        class="text-danger"
                        v-if="!$v.appointment_time.required && show_error"
                      >
                        Time must be required.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <div class="input-icon"><i class="fa fa-arrows-h"></i></div>
                  <b-form-input
                    type="number"
                    required
                    placeholder="Duration"
                    v-model="appointment_duration"
                  ></b-form-input>
                  <div
                    class="text-danger"
                    v-if="!$v.appointment_duration.required && show_error"
                  >
                    Duration must be required.
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <OfficeSearchSelect v-on:update="setOffice" />
                  <div
                    class="text-danger"
                    v-if="!$v.selected_office.required && show_error"
                  >
                    Office must be required.
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <OperatorySearchSelect
                    v-on:update="setOperatory"
                    :office="selected_office"
                    :disabled="!selected_office"
                  />
                  <div
                    show
                    variant="danger"
                    class="text-danger"
                    v-if="!$v.selected_operatory.required && show_error"
                  >
                    Operatory must be required.
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <ProviderSearchSelect
                    v-on:update="setProvider"
                    :office="selected_office"
                    :operatory="selected_operatory"
                    :disabled="!(selected_office && selected_operatory)"
                  />
                  <div
                    show
                    variant="danger"
                    class="text-danger"
                    v-if="!$v.selected_provider.required && show_error"
                  >
                    Provider must be required.
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <b-dropdown :text="appointment_selected_status.text">
                    <b-dropdown-item @click="selectedProvider = ''"
                      >Select Provider</b-dropdown-item
                    >
                    <b-dropdown-item
                      v-for="app_status in appointment_statues"
                      :value="app_status.value"
                      :key="app_status.value"
                      @click="appointment_selected_status = app_status"
                      >{{ app_status.text }}</b-dropdown-item
                    >
                  </b-dropdown>
                </div>
              </div>
            </div>
            <div class="row appointment-form-btn">
              <div class="col-md-12 text-right">
                <div class="appointment-btn">
                  <b-button
                    class="btn-radius"
                    variant="outline-primary ripple ml-2"
                    @click="$bvModal.hide('appointment-modal')"
                    >Cancel</b-button
                  >
                  <b-button
                    @click="submitAppointment"
                    class="btn-radius"
                    variant="primary ripple m-1"
                    >Save</b-button
                  >
                </div>
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab title="Patient Notes">
          <div class="mb-20">
            <div>
              <b-form-group class="col-md-12 mb-3">
                <b-form-textarea
                  rows="5"
                  max-rows="5"
                  required
                  placeholder="Patient Notes"
                ></b-form-textarea>
              </b-form-group>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PatientSearchSelect from "../../components/patient/PatientSearchSelect";
import OfficeSearchSelect from "../../components/office/OfficeSearchSelect";
import OperatorySearchSelect from "../../components/operatory/OperatorySearchSelect";
import ProviderSearchSelect from "../../components/provider/ProviderSearchSelect";
import { required } from "vuelidate/lib/validators";

export default {
  name: "Appointment",
  props: {
    appointment_id: {
      type: Number,
      required: false,
    },
  },
  mounted() {
    console.log("add appointment dialog", this.appointment_id);
  },
  data() {
    return {
      // Appointment Properties
      selected_patient: null,
      appointment_date: "",
      appointment_time: "",
      appointment_duration: "",
      selected_office: null,
      selected_operatory: null,
      selected_provider: null,
      appointment_selected_status: {
        value: "NON_CONFIRMED",
        text: "Non-Confirmed",
      },
      appointment_statues: [
        { value: "NON_CONFIRMED", text: "Non-Confirmed" },
        { value: "SCHEDULED", text: "Scheduled" },
        { value: "IN_OFFICE", text: "In Office" },
        { value: "FINISHED", text: "Finished" },
        { value: "DEFERRED", text: "Deferred" },
      ],
      show_error: false,
    };
  },
  validations: {
    appointment_date: { required },
    appointment_time: { required },
    appointment_duration: { required },
    selected_patient: {
      required,
      type: Object,
    },
    selected_office: {
      required,
      type: Object,
    },
    selected_operatory: {
      required,
      type: Object,
    },
    selected_provider: {
      required,
      type: Object,
    },
  },
  components: {
    PatientSearchSelect,
    OfficeSearchSelect,
    OperatorySearchSelect,
    ProviderSearchSelect,
  },
  computed: {
    ...mapGetters(["getAppointmentData"]),
  },
  methods: {
    ...mapActions(["createAppointment", "listAppointments"]),
    submitAppointment(ev) {
      this.$v.$touch();
      // if (this.$v.$invalid){
      //     this.show_error = true;
      //     this.$bvToast.toast("Form Validation Failed", {
      //           title: `Failed`,
      //           variant: 'danger',
      //           solid: true,
      //     });
      // }else{
      this.show_error = false;
      this.createAppointment({
        patient: this.selected_patient.id,
        date: this.appointment_date,
        time: this.appointment_time,
        duration: this.appointment_duration,
        operatory: this.selected_operatory.id,
        provider: this.selected_provider.id,
        status: this.appointment_selected_status.value,
      })
        .then((data) => {
          console.log("Successfully created patients");
          this.$bvModal.hide("appointment-modal");
          this.listAppointments();
          this.$bvToast.toast("Created an Appointment successfully", {
            title: `Success`,
            variant: "success",
            solid: true,
          });
        })
        .catch((err) => {
          const detail = err.response.data.detail;
          this.$bvToast.toast(detail || err.message, {
            title: `Failed`,
            variant: "danger",
            solid: true,
          });
        });
      // }
    },
    setPatient(val) {
      this.selected_patient = val;
      this.$v.selected_patient.$touch();
    },
    setOffice(val) {
      console.log("selected office:", val);
      this.setOperatory(null);
      this.setProvider(null);
      this.selected_office = val;
      this.$v.selected_office.$touch();
    },
    setOperatory(val) {
      this.selected_operatory = val;
      this.$v.selected_operatory.$touch();
    },
    setProvider(val) {
      this.selected_provider = val;
      this.$v.selected_provider.$touch();
    },
  },
};
</script>
