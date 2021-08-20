<template>
  <div v-if="!getLoading">
    <div class="main-content table-list">
      <div class="mb-3 page-title">
        <h3 class="font-weight-bold m-0">Locations</h3>
      </div>
      <LocationTable />
    </div>

    <b-modal id="add-location" size="lg" hide-header hide-footer>
      <div class="location-header">
        <h5>Location Information</h5>
      </div>
      <div class="location-tab">
        <b-tabs>
          <b-tab title="Basic Info" active>
            <h6 class="title"><span>Location Information</span></h6>
            <div class="form-row">
              <div class="col-md-12">
                <b-form-group class="mb-3">
                  <div class="form-row">
                    <div class="col-md-6">
                        <label>Practice:</label>
                        {{ getSelectedPractice.name }}
                    </div>
                    <div class="col-md-6">
                      <label
                        >Location name <span class="required">*</span></label
                      >
                      <b-form-input
                        type="text"
                        :state="validateState('location_name')"
                        v-model="$v.location_name.$model"
                        aria-describedby="location_name_feedback" 
                        />
                      <b-form-invalid-feedback id="location_name_feedback">This is a required field.</b-form-invalid-feedback>
                    </div>
                  </div>
                </b-form-group>
                <b-form-group>
                  <div class="form-row">
                    <div class="col-md-12">
                      <label>Address <span class="required">*</span></label>
                      <b-form-input 
                        type="text" 
                        class="mb-2" 
                        v-model="$v.address.$model"
                        :state="validateState('address')"
                        aria-describedby="address_feedback" 
                      />
                      <b-form-invalid-feedback id="address_feedback">This is a required field.</b-form-invalid-feedback>
                      <b-form-input type="text" required v-model="address_2" />
                    </div>
                  </div>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-3">
                <b-form-group>
                  <label>Country</label>
                  <b-form-input type="text" v-model="country"/>
                </b-form-group>
              </div>
              <div class="col-md-3">
                <b-form-group>
                  <label>City <span class="required">*</span></label>
                  <b-form-input 
                    type="text" 
                    v-model="$v.city.$model"
                    :state="validateState('city')"
                    aria-describedby="city_feedback" 
                  />
                  <b-form-invalid-feedback id="city_feedback">This is a required field.</b-form-invalid-feedback>
                </b-form-group>
              </div>
              <div class="col-md-3">
                <b-form-group>
                  <label>State <span class="required">*</span></label>
                  <b-dropdown
                    :text="state"
                    style="display:block"
                  >
                    <b-dropdown-item
                      v-for="v in [{value: 'UT', text: 'UT'}, {value: 'BT', text: 'BT'}]"
                      :value="v.value"
                      :key="v.value"
                      @click="state = v.value"
                      >{{ v.text }}</b-dropdown-item
                    >
                  </b-dropdown>
                </b-form-group>
              </div>
              <div class="col-md-3">
                <b-form-group>
                  <label>Zip Code <span class="required">*</span></label>
                  <b-form-input 
                    type="text" 
                    v-model="$v.zipcode.$model"
                    :state="validateState('zipcode')"
                    aria-describedby="zipcode_feedback" 
                  />
                  <b-form-invalid-feedback id="zipcode_feedback">This is a required field.</b-form-invalid-feedback>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <b-form-group>
                  <label>Phone number <span class="required">*</span></label>
                  <b-form-input 
                    type="text" 
                    required 
                    v-model="$v.phone_number.$model"
                    :state="validateState('phone_number')"
                    aria-describedby="phone_number_feedback"  
                  />
                  <b-form-invalid-feedback id="phone_number_feedback">This is a required field.</b-form-invalid-feedback>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group>
                  <label>Email <span class="required">*</span></label>
                  <b-form-input 
                    type="email" 
                    v-model="$v.email.$model"
                    :state="validateState('email')"
                    aria-describedby="email_feedback"
                  />
                  <b-form-invalid-feedback id="email_feedback">This should be valid email.</b-form-invalid-feedback>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <b-form-group>
                  <label>Company</label>
                  <b-form-input type="text" v-model="company" />
                </b-form-group>
              </div>              
              <div class="col-md-6">
                <b-form-group>
                  <label>Abbreviation</label>
                  <b-form-input type="text" v-model="abbreviation" />
                </b-form-group>
              </div>
            </div>            
            <div class="row">              
              <div class="col-md-6">
                <b-form-group>
                  <label class="trans-userId"
                    >eTrans User ID<i class="fa fa-info-circle"></i
                  ></label>
                  <b-form-input type="text" v-model="trans_user_id" />
                </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group>
                  <label>NEA facility ID</label>
                  <b-form-input type="text" v-model="facility_id"/>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <b-form-group>
                  <label>Website</label>
                  <b-form-input type="text" v-model="website" />
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-btn">
                  <b-button variant="primary" @click="submit">Save</b-button>
                  <b-button variant="outline-primary" @click="$bvModal.hide('add-location');">Cancel</b-button>
                </div>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </b-modal>
  </div>
  <Loader v-else />
</template>
<style scoped>
.title {
  position: relative;
  font-weight: bold;
}
.title::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  background-color: #ddd;
  top: 50%;
  height: 1px;
}
.title span {
  background-color: #fff;
  position: relative;
  z-index: 1;
  padding-right: 5px;
}
.image-upload img {
  margin-bottom: 10px;
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.location-tab .form-btn {
  margin: 20px -15px -15px;
  background-color: #e5f4f8;
  padding: 15px;
}
.location-tab .form-btn .btn + .btn {
  margin-left: 10px;
}
.trans-userId i {
  font-size: 16px;
  margin-left: 5px;
}
</style>
<script>
import { mapGetters, mapActions } from "vuex";
import Loader from "../../../components/loader/loader";
import LocationTable from "./table";
import PracticeSearchSelect from '../../../components/practice/PracticeSearchSelect';
import { required, email } from "vuelidate/lib/validators";

// const STORAGE_KEY = 'invoice';
export default {
  props: {
    office: {
      type: Object,
      required: false,
      default: null
    }
  },
  data() {
    return {
      office_id: this.office?this.office.id:null,
      practice: null,
      location_name: '',
      company: '',
      abbreviation: '',
      phone_number: '',
      email: '',
      website: '',
      facility_id: '',
      trans_user_id: '',
      address: '',
      address_2: '',
      city: '',
      state: 'UT',
      country: '',
      zipcode: ''
    };
  },
  components: { Loader, LocationTable, PracticeSearchSelect },
  computed: mapGetters(["getLoading", "getSelectedPractice"]),
  mounted() {
    this.setLoading(true);
    setTimeout(() => {
      this.setLoading(false);
    }, 2000);
  },
  methods: {
    ...mapActions(["setLoading", "createOfficeAndAddress", "createOfficeAddress", "listOffices"]),
    validateState(name) {
      const { $dirty, $error } = this.$v[name];
      return $dirty ? !$error : null;
    },
    submit(){
      this.$v.$touch();
      if (this.$v.$anyError) {
        return;
      }
      if(this.office_id == null){
          this.createOfficeAndAddress({
            practice: this.getSelectedPractice.id,
            location_name: this.location_name,
            phone_number: this.phone_number,
            company: this.company,
            abbreviation: this.abbreviation,
            email: this.email,
            website: this.website,
            facility_id: this.facility_id,
            trans_user_id: this.trans_user_id,
            address: this.address,
            address_2: this.address_2,
            city: this.city,
            state: this.state,
            country: this.country,
            zipcode: this.zipcode            
          }).then(data=>{
            this.office_id = data.office_id;
            this.listOffices();
            $bvModal.hide('add-location');
          }).catch(err=>{
              console.log(err);
              this.$bvToast.toast("API failed", {
                title: 'Failed to create new office',
                variant: 'danger',
                solid: true,
              });
              // for(const key in err.response.data || {}){
              //   this.$bvToast.toast(err.response.data[key], {
              //     title: 'Failed to create new office',
              //     variant: 'warning',
              //     solid: true,
              //   });
              // }
          })
      }
    },
  },
  validations: {
    location_name: {
      required
    },
    address: {
      required
    },
    city: {
      required
    },
    zipcode: {
      required
    },
    phone_number: {
      required
    },
    email: {
      email,
      required,
      
    }
  }
};
</script>