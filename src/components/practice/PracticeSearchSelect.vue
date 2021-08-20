<template>
    <v-select 
        label="name" 
        v-model="selected_practice"
        @search="onPracticeSearch"
        v-on:search:focus="loadItems"
        :filterable="false"
        :options="rows"
        placeholder="Select a Practice"
        class="w-100 style-chooser"
    >
            <template slot="no-options">
                type to search practices with name...
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
    name: "PracticeSearchSelect",
    data() {
        return {
            selected_practice: null,
            rows: []
        }
    },
    mounted(){
        this.loadItems();
    },
    computed: {
        ...mapGetters([]),
    },
    methods: {
        ...mapActions(["listPractices"]),
        onPracticeSearch(search, loading){
            loading(true);
            console.log('search', search)
            this.listPractices({search}).then(data=>{
                loading(false);
                this.rows = data.results;
            }).catch(err=>{
                loading(false);
                console.log('failed to search practices:', err);
                const message = (err.response.data && err.response.data.message)? err.response.data.message: err.message;
                this.$bvToast.toast(message, {
                    title: `Failed to search practices`,
                    variant: 'danger',
                    solid: true,
                });
            });
        },
        loadItems(){
            this.listPractices({}).then(data=>{
                this.rows = data.results;
            });
        }
    },
    watch: {
        selected_practice(val){
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