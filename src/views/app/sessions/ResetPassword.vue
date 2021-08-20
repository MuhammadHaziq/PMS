<template>
  <div
    class="auth-layout-wrap"
    :style="{ backgroundImage: 'url(' + bgImage + ')' }"
  >
    <div class="auth-content">
      <div class="card o-hidden">
        <div class="row">
          <div class="col-md-12">
            <div class="p-4">
              <div class="auth-logo text-center mb-30">
                <img :src="logo" alt="" />
              </div>
              <h1 class="mb-3 text-18">Reset Password</h1>
              <!-- <b-form-group label="verify_code">
                <b-form-input
                  class="form-control form-control-rounded"
                  label="Verification Code"
                  type="verify_code"
                  v-model.trim="$v.verify_code.$model"
                >
                </b-form-input>

                <b-alert
                  show
                  variant="danger"
                  class="error col mt-1"
                  v-if="!$v.verify_code.minLength"
                  >Minimum
                  {{ $v.verify_code.$params.minLength.min }} charaters.</b-alert
                >
              </b-form-group> -->
              <b-form  @submit.prevent="submit">
                <b-form-group label="Password">
                  <b-form-input
                    class="form-control form-control-rounded"
                    label="Name"
                    type="password"
                    v-model.trim="$v.password.$model"
                  >
                  </b-form-input>

                  <b-alert
                    show
                    variant="danger"
                    class="error col mt-1"
                    v-if="!$v.password.minLength"
                    >Minimum
                    {{ $v.password.$params.minLength.min }} charaters.</b-alert
                  >
                </b-form-group>
                <b-form-group label="Repeat Password">
                  <b-form-input
                    class="form-control form-control-rounded"
                    label="Name"
                    type="password"
                    v-model.trim="$v.repeatPassword.$model"
                  >
                  </b-form-input>

                  <b-alert
                    show
                    variant="danger"
                    class="error col mt-1"
                    v-if="!$v.repeatPassword.sameAsPassword"
                    >Passwords must be identical.</b-alert>
                </b-form-group>

                <button class="btn btn-primary btn-block btn-rounded mt-3"
                variant="primary"
                :disabled="submitStatus === 'PENDING' || $v.$invalid">
                  Change Password
                </button>
              </b-form>

              <div class="mt-3 text-center">
                <router-link to="signIn" tag="a" class="text-muted ">
                  <u>Back to Sign In</u>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required, sameAs, minLength } from "vuelidate/lib/validators";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ResetPassword",
  metaInfo: {
    title: "Reset Password"
  },
  data() {
    return {
      password: "",
      repeatPassword: "",
      bgImage: require("@/assets/images/photo-wide-4.jpg"),
      logo: require("@/assets/images/new-logo.png"),
      formImage: require("@/assets/images/photo-long-3.jpg"),
      submitStatus: null
    }
  },
  validations: {
    // verify_code: {
    //   required,
    //   minLength: minLength(4)
    // },
    password: {
      required,
      minLength: minLength(3)
    },
    repeatPassword: {
      sameAsPassword: sameAs("password")
    }
  },
  methods: {
    ...mapActions(["forgotPasswordConfirm"]),
    makeToast(variant = null, msg) {
      this.$bvToast.toast(msg, {
        title: ` ${variant || "default"}`,
        variant: variant,
        solid: true
      });
    },
    submit(){
      if (this.$v.$invalid || this.$route.query.token == undefined) {
        this.submitStatus = "ERROR";
      } else {
        this.forgotPasswordConfirm({token: this.$route.query.token, password: this.password}).then(
          data=>{
              this.makeToast("success", "Password successfully changed...");
              this.submitStatus = "OK";
              this.$router.push({ name: "signIn" })
          }
        ).catch(
          err=>{ this.makeToast("danger", err.message);}
        );
      }
    }
  }
};
</script>
