<template>
    <div>
      <b-col>
        <b-form>
          <div class="row">
            <div class="col-md-4">
              <b-form-group class="mb-3" label="First Name">
                <b-form-input
                  type="text"
                  v-model="first_name"
                ></b-form-input>
                <div
                    variant="danger"
                    class="text-danger"
                    v-if="!$v.first_name.required && show_error"
                    >First name must be required.
                </div>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group class="mb-3" label="Middle Name">
                <b-form-input
                  type="text"
                  v-model="middle_name"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group class="mb-3" label="Last Name">
                <b-form-input
                  type="text"
                  v-model="last_name"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <b-form-group class="mb-3" label="Email Address">
                <b-form-input
                  type="email"
                  v-model="email_address"
                ></b-form-input>
              </b-form-group>
              <div
                  variant="danger"
                  class="text-danger"
                  v-if="!$v.email_address.required && show_error"
                  >Email address must be required.
              </div>              
            </div>
            <div class="col-md-4">
              <b-form-group class="mb-3" label="Date of Birth">
                <b-form-datepicker
                  :date-format-options="{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  }"
                  :max="new Date()"
                  v-model="date_of_birth"
                ></b-form-datepicker>              
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group class="mb-3" label="Gender">
                <b-dropdown
                  class="gender-dropdown"
                  :text="genders[gender]"
                >
                  <b-dropdown-item
                    v-for="value, key in genders"
                    :value="value"
                    :key="key"
                    @click="gender = key"
                    >{{ value }}</b-dropdown-item
                  >
                </b-dropdown>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <b-form-group class="mb-3" label="Nick Name">
                <b-form-input
                  type="text"
                  v-model="nick_name"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group class="mb-3" label="Phone">
                <b-form-input
                  type="text"
                  v-model="phone"
                ></b-form-input>
              </b-form-group>
              <div
                  variant="danger"
                  class="text-danger"
                  v-if="!$v.phone.required && show_error"
                  >Phone must be required.
              </div>              
            </div>
            <div class="col-md-4">
              <b-form-group class="mb-3" label="Cell">
                <b-form-input
                  type="text"
                  v-model="cell"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <b-form-group class="mb-3" label="Foreign Id">
                <b-form-input
                  type="text"
                  v-model="foreign_id"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group class="mb-3" label="Guardian">
                <b-form-input
                  type="text"
                  v-model="guardian"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group class="mb-3" label="SSN">
                <b-form-input
                  type="text"
                  v-model="ssn"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-4">
              <b-form-group class="mb-3" label="Home Office">
                <b-form-input
                  type="text"
                  v-model="home_office"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group class="mb-3" label="Other Notes">
                <b-form-input
                  type="text"
                  v-model="other_notes"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group class="mb-3" label="Insurance Policy#">
                <b-form-input
                  type="text"
                  v-model="insurance_policy"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <b-button
                size="sm"
                class="btn-radius"
                variant="primary"
                @click="submitPatientForm"
                :disabled="isLoading"
              >
                <b-spinner small></b-spinner>
                Save
              </b-button>
              <b-button
                size="sm"
                class="btn-radius ml-2"
                variant="outline-primary"
                @click="$bvModal.hide('add-patient-modal');"
              >
                Cancel
              </b-button>
            </div>
          </div>
        </b-form>
      </b-col>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
import Vue from "vue";

export default {
  data(){
      return {
        first_name: '',
        middle_name: '',
        last_name: '',
        email_address: '',
        date_of_birth: '',
        gender: 'UNSPECIFIED',
        nick_name: '',
        phone: '',
        cell: '',
        foreign_id: '',
        guardian: '',
        ssn: '',
        home_office: '',
        other_notes: '',
        insurance_policy: '',
        show_error: false,
        genders: Vue.Constants.genders,
        isLoading: false
      } 
  },
  validations: {
    first_name: {required},
    email_address: {required},
    phone: {required}
  },
  methods: {
    ...mapActions(["createPatient", "listPatients"]),
    submitPatientForm(){
      this.$v.$touch()
      if (this.$v.$invalid){
          this.show_error = true;
          this.$bvToast.toast("Form Validation Failed", {
                title: `Failed`,
                variant: 'danger',
                solid: true,
          });
      }else{
        this.show_error = false;
        this.isLoading = true;
        this.createPatient({
                first_name: this.first_name,
                middle_name: this.middle_name,
                last_name: this.last_name,
                email_address: this.email_address,
                date_of_birth: this.date_of_birth,
                gender: this.gender,
                nick_name: this.nick_name,
                phone: this.phone,
                cell: this.cell,
                foreign_id: this.foreign_id,
                guardian: this.guardian,
                ssn: this.ssn,
                home_office: this.home_office,
                other_notes: this.other_notes,
                insurance_policy: this.insurance_policy
        }).then(data=>{
          console.log('Successfully created patient')
          this.$bvModal.hide('add-patient-modal');
          this.listPatients();
          this.$bvToast.toast('Created a Patient successfully', {
              title: `Success`,
              variant: 'success',
              solid: true,
          });
          this.isLoading = false;
        }).catch(err=>{
          this.isLoading = false;
          var detail = err.response.data.detail;
          if(detail == undefined){
            if(Array.isArray(err.response.data) && err.response.data.length > 0 && 
            err.response.data[0].category && err.response.data[0].category == "INVALID_REQUEST_ERROR"){
              detail = err.response.data[0].detail;
            }
          }
          if(detail){
            this.$bvToast.toast(detail || err.message, {
                title: `Failed`,
                variant: 'danger',
                solid: true,
            });
          }else{
              for(const key in err.response.data || {}){
                  this.$bvToast.toast(`${key}: ${err.response.data[key]}`, {
                      title: `Failed`,
                      variant: 'danger',
                      solid: true,
                  });
              }
          }
        });
      }
    }
  }
}

</script>