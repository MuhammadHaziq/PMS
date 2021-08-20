
const state = {
    patients: [],
    patient_isLoading: false,
    patient_totalRecords: 0,
    patient_serverParams: {
        search:null,
        page:1,
        limit:20,
        ordering:null,
        expand: 'provider,patient,operatory'
    }
};

const getters = {
    patients: state => state.patients,
    patient_serverParams: state => state.patient_serverParams,
    patient_isLoading: state => state.patient_isLoading,
    patient_totalRecords: state => state.patient_totalRecords,
};

const actions = {
    setActiveTabInPatientForm({ commit }, data) {
        commit("SET_ACTIVE_TAB", data);
    },
    getPatient(){},
    listPatients({commit, getters}, isAll=false){
        return new Promise((resolve, reject)=>{
            let url = `/api/practice/${getters.getSelectedPractice.id}/patients/`;
            if(isAll){
                url = '/api/patient/';
            }
            this.$axios.get(url, {params: getters.patient_serverParams})
            .then(resp=>{
                console.log('fetch filtered patients:', resp.data);
                commit("setPatients", resp.data.results);
                commit("patient_totalRecords", resp.data.count);
                commit("patient_isLoading", false);
                resolve(true);
            })
            .catch(err=>{
                reject(err);
                commit("patient_isLoading", false);
            })
        });
    },
    searchPatients({commit, getters}, {
        search,
        page=1,
        limit=20,
        ordering=null,
        isAll=false,
    }){
        return new Promise((resolve, reject)=>{
            let url = `/api/practice/${getters.getSelectedPractice.id}/patients/`;
            if(isAll){
                url = '/api/patient/';
            }
            this.$axios.get(url, {params: {search, page, limit, ordering}})
            .then(resp=>{
                console.log('searched patients:', resp.data);
                resolve(resp.data);
            })
            .catch(err=>{
                reject(err);
            })
        });
    },
    createPatient({ commit, getters }, data) {
        return new Promise((resolve, reject)=>{
            data['practice'] = getters.getSelectedPractice.id;
            this.$axios.post(`/api/patient/`, data=data).then(resp => {
                console.log('create patient:', resp.data);
                resolve(resp.data);
            }).catch(err=>{
                reject(err);
            });
        });
    },
    createPatientAddress({ commit }, {
        patient,
        address,
        address_2,
        city,
        state,
        country,
        zipcode
    }){
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/patient/${patient.id}/addresses/`, {
                address,
                address_2,
                city,
                state,
                country,
                zipcode
            })
            .then(resp=>{
                console.log('fetch filtered patients:', resp.data);
                commit('setFilteredPatients', resp.data);
                resolve(resp.data);
            })
            .catch(err=>{
                reject(err);
            });
        });
    },
    deletePatient({ commit }, {
        patient
    }){
        return new Promise(
            (resolve, reject) => {
                this.$axios.delete(`/api/patient/${patient.id}/`).then(resp => {
                    resolve(resp.data);
                }).catch(err => {
                    reject(err);
                });
            }
        )
    },
}

const mutations = {
    SET_ACTIVE_TAB(state, data) {
        state.activeTab = data
    },

    setPatients(state, data) {
        state.patients = data;
    },
    patient_isLoading(state, data) {
        state.patient_isLoading = data;
    },
    patient_totalRecords(state, data) {
        state.patient_totalRecords = data;
    },
    patient_serverParams(state, data) {
        state.patient_serverParams = Object.assign({}, state.patient_serverParams, data);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
