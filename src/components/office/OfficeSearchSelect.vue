<template>
    <v-select 
        label="location_name" 
        v-model="selected_office"
        @search="onOfficeSearch" 
        :filterable="false"
        :options="rows"
        :disabled="disabled"
        placeholder="Select an Office"
        class="w-100 style-chooser"
    >
            <template slot="no-options">
                type to search offices with location name...
            </template>
            <template slot="option" slot-scope="option">
                <div class="d-flex justify-content-md-center">
                    {{ option.location_name }}
                </div>
            </template>
            <template slot="selected-option" slot-scope="option">
                <div class="d-flex justify-content-md-center">
                    {{ option.location_name }}
                </div>
            </template>
    </v-select>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "OfficeSearchSelect",
    props: ['value', 'disabled'],
    data() {
        return {
            selected_office: this.value ? this.value : null,
            rows: []
        }
    },
    mounted(){
        this.searchOffices({}).then(data=>{
            this.rows = data.results;
        });
    },    
    computed: {
        ...mapGetters(["getSelectedPractice"]),
    },
    methods: {
        ...mapActions(["searchOffices"]),
        onOfficeSearch(search, loading){
            loading(true);
            this.searchOffices({search}).then(data=>{
                this.rows = data.results;
                loading(false);
            }).catch(err=>{
                loading(false);
                console.log('failed to search offices:', err);
                this.$bvToast.toast(err.message, {
                    title: `Failed to search offices`,
                    variant: 'danger',
                    solid: true,
                });
            });
        }
    },
    watch: {
        selected_office(val){
            this.$emit('update', val);
        }
    }
}
</script>

<style>
  .appointment-body .style-chooser .vs__search::placeholder,
  .appointment-body .style-chooser .vs__dropdown-toggle {
    min-height: 50px;
    border-radius: 10px;
  }
</style>