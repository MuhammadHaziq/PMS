<template>
    <v-select 
        label="full_name" 
        v-model="selected_patient"
        @search="onPatientSearch" 
        :filterable="false"
        :options="rows"
        placeholder="Select a Patient"
        class="custom-search-select w-100 style-chooser"
    >
            <template slot="no-options">
                type to search patients with name/nickname or email or phone...
            </template>
            <template slot="option" slot-scope="option">
                <div class="d-flex justify-content-md-center">
                    {{ option.full_name }}
                </div>
            </template>
            <template slot="selected-option" slot-scope="option">
                <div class="d-flex justify-content-md-center">
                    {{ option.full_name }}
                </div>
            </template>
    </v-select>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "PatientSearchSelect",
    data() {
        return {
            selected_patient: null,
            rows: []
        }
    },
    mounted() {
        this.searchPatients({}).then(data=>{
            this.rows = data.results;
        });
    },
    computed: {
        ...mapGetters(["getSelectedPractice"]),
    },
    methods: {
        ...mapActions(["searchPatients"]),
        onPatientSearch(search, loading){
            loading(true);
            this.searchPatients({search}).then(data=>{
                this.rows = data.results;
                loading(false);
            }).catch(err=>{
                loading(false);
                console.log('failed to search patients:', err);
                this.$bvToast.toast(err.message, {
                    title: `Failed to search patients`,
                    variant: 'danger',
                    solid: true,
                });
            });
        }
    },
    watch: {
        selected_patient(val){
            this.$emit('update', val);
        }
    }
}
</script>

<style>
  #appointment___BV_modal_body_ .style-chooser .vs__search::placeholder,
  #appointment___BV_modal_body_ .style-chooser .vs__dropdown-toggle {
    min-height: 50px;
    border-radius: 10px;
  }
</style>