<template>
    <div>
        <b-navbar>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-button size="sm" class="rounded my-2 my-sm-0" @click="onSignOut()" right>SignOut</b-button>
            </b-navbar-nav>
        </b-navbar>
        <b-container>
            <b-row align-v="center" class="mt-5">
                <b-col class="d-flex">
                    <PracticeSearchSelect v-on:update="onChangePractice"/>
                    <b-button size="sm" class="rounded ml-3 my-2 my-sm-0" @click="onEnter()" right>Enter</b-button>
                </b-col>
            </b-row>
            <b-row>
                
                <b-col class="col-6 mt-3">
                    <b-button v-b-toggle.collapse-1 >Create new practice</b-button>
                    <b-collapse id="collapse-1" class="mt-2">
                        <div>
                            <div class="form-group">
                                <b-form-input v-model="name" placeholder="Enter practice name"></b-form-input>
                                <div
                                    class="text-danger"
                                    v-if="!$v.name.required && show_error"
                                    >Practice name must be required.
                                </div>
                            </div>
                            <!-- <div class="form-group">
                                <b-form-input v-model="image" placeholder="Enter practice image (optional)"></b-form-input>
                            </div>
                            <div class="form-group">
                                <b-form-input v-model="website" placeholder="Enter practice website (optional)"></b-form-input>
                            </div> -->
                            <div class="form-group">
                                <b-button size="sm" class="rounded my-2 my-sm-0" @click="onCreate()" right>Create</b-button>
                            </div>
                        </div>
                    </b-collapse>

                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import PracticeSearchSelect from "../../../components/practice/PracticeSearchSelect.vue";
import { mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
    data(){
        return {
            name: "",
            image: '',
            website: '',
            show_error: false
        }
    },
    components: { PracticeSearchSelect },
    validations: {
        name: {required},
    },
    methods: {
        ...mapActions(['signOut', "createPractice"]),
        onChangePractice(val){
            localStorage.setItem("selected_practice", JSON.stringify(val));
        },
        onSignOut(){
            this.signOut();
            this.$router.push({ name: "signIn" });
        },
        onEnter(){
            this.$router.push({ name: "HomePageDashboard" });
        },
        onCreate(){
            this.$v.$touch()
            if (this.$v.$invalid){
                this.show_error=true;
            }else{
                this.createPractice({name:this.name}).then(data=>{
                    this.$bvToast.toast('Created an Practice successfully', {
                        title: `Success`,
                        variant: 'success',
                        solid: true,
                    });
                });
            }
        }
    }
}
</script>