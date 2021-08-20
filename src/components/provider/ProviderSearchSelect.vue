<template>
    <v-select 
        label="email"
        v-model="selected_provider"
        @search="onProviderSearch" 
        :filterable="false"
        :options="rows"
        :disabled="disabled"
        placeholder="Select a Provider"
        class="w-100 style-chooser"
    >
            <template slot="no-options">
                type to search providers with name...
            </template>
            <template slot="option" slot-scope="option">
                <div class="d-flex justify-content-md-center">
                    {{ option.first_name || option.email }}
                </div>
            </template>
            <template slot="selected-option" slot-scope="option">
                <div class="d-flex justify-content-md-center">
                    {{ option.first_name || option.email }}
                </div>
            </template>
    </v-select>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "ProviderSearchSelect",
    props: {
        office: {
            type: Object,
            requried: false,
            default: null
        },
        operatory: {
            type: Object,
            requried: false,
            default: null
        },
        disabled: {
            type: Boolean,
            requried: false,
            default: false
        }
    },
    data() {
        return {
            selected_provider: null,
            rows: []
        }
    },
    mounted() {
        if(this.disabled == false){
            this.initialLoading();
        }
    },
    computed: {
        ...mapGetters([]),
    },
    methods: {
        ...mapActions(["listProviders"]),
        onProviderSearch(search, loading){
            if(this.office && this.operatory) {
                loading(true);
                this.listProviders({office: this.office, operatory: this.operatory, search}).then(data=>{
                    console.log('provider result:', data)
                    this.rows = data.results;
                    loading(false);
                }).catch(err=>{
                    loading(false);
                    console.log('failed to search providers:', err);
                    this.$bvToast.toast(err.message, {
                        title: `Failed to search providers`,
                        variant: 'danger',
                        solid: true,
                    });
                });
            }else{
                this.$bvToast.toast(`You must specify office & operatory before choosing provider`, {
                    title: 'Invalid Inputs',
                    variant: 'warning',
                    solid: true,
                });
            }
        },
        initialLoading(){
            if(this.office && this.operatory){
                this.listProviders({office: this.office, operatory: this.operatory}).then(data=>{
                    this.rows = data.results;
                });
            }else{
                this.listProviders({}).then(data=>{
                    this.rows = data.results;
                });
            }
        }
    },
    watch: {
        selected_provider(val){
            this.$emit('update', val);
        },
        disabled(val){
            if(val == true) return;
            this.initialLoading();
        },
        office(val){
            this.selected_provider = null;
            this.initialLoading();
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