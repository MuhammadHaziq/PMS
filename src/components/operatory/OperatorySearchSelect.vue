<template>
    <v-select 
        label="name"
        v-model="selected_operatory"
        @search="onOperatorySearch" 
        :filterable="false"
        :options="rows"
        class="w-100 style-chooser"
        placeholder="Select an Operatory"
        :disabled="disabled"
    >
            <template slot="no-options">
                type to search operatories with name...
            </template>
            <template slot="option" slot-scope="option">
                <div class="d-flex justify-content-md-center">
                    {{ option.name }}
                </div>
            </template>
            <template slot="selected-option" slot-scope="option">
                <div class="d-flex justify-content-md-center">
                    {{ option.name }}
                </div>
            </template>
    </v-select>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "OperatorySearchSelect",
    props: {
        office: {
            type: Object,
            requried: false,
        },
        disabled: {
            type: Boolean,
            requried: false,
            default: false
        }
    },
    mounted() {
        this.loadItems(this.office);
    },
    data() {
        return {
            selected_operatory: null,
            rows: []
        }
    },
    methods: {
        ...mapActions(["listOperatories"]),
        onOperatorySearch(search, loading){
            console.log('oper office', this.office)
            if(this.office && this.office.id) {
                loading(true);
                this.listOperatories({office: this.office, query: search}).then(data=>{
                    loading(false);
                    this.rows = data.results;
                }).catch(err=>{
                    loading(false);
                    console.log('failed to search operatories:', err);
                    this.$bvToast.toast(err.message, {
                        title: `Failed to search operatories`,
                        variant: 'danger',
                        solid: true,
                    });
                });
            }else{
                this.$bvToast.toast(`You must specify office before choosing operatory`, {
                    title: 'Invalid Inputs',
                    variant: 'warning',
                    solid: true,
                });
            }
        },
        loadItems(office=null){
            this.listOperatories({office}).then(data=>{
                this.rows = data.results;
            });
        }
    },
    watch: {
        selected_operatory(val){
            this.$emit('update', val);
        },
        disabled(val){
            if(val == false){
                this.loadItems(this.office);
            }else{
                this.rows = [];
            }
        },
        office(val){
            this.selected_operatory = null;
            this.loadItems(val);
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