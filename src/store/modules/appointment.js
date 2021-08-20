const state = {
    appointments: [],
    appt_isLoading: false,
    appt_totalRecords: 0,
    appt_serverParams: {
        search:null,
        page:1,
        limit:20,
        ordering:null,
        expand: 'provider,patient,operatory'
    }
};

const getters = {
    appointments: state => state.appointments,
    appt_serverParams: state => state.appt_serverParams,
    appt_isLoading: state => state.appt_isLoading,
    appt_totalRecords: state => state.appt_totalRecords,
};

const actions = {
    createAppointment({ commit }, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/api/schedule-appointment/', data).then(resp=>{
                console.log('create appointment:', resp.data);
                resolve(resp.data);
            })
            .catch(err=>{
                reject(err);
            })
        });
    },
    listAppointments({commit, getters}, isAll=false){
        return new Promise((resolve, reject) => {
            let url = `/api/practice/${getters.getSelectedPractice.id}/appointments/`;
            console.log('all', isAll)
            if(isAll == true){
                url = '/api/appointment/';
            }
            this.$axios.get(url, {params: getters.appt_serverParams})
            .then(resp=>{
                console.log('fetch filtered appointments:', resp.data);
                commit("setAppointments", resp.data.results);
                commit("appt_totalRecords", resp.data.count);
                commit("appt_isLoading", false);
                resolve(true);
            })
            .catch(err=>{
                reject(err);
                commit("appt_isLoading", false);
            })
        });
    }
};

const mutations = {
    setAppointments(state, data) {
        state.appointments = data;
    },
    appt_isLoading(state, data) {
        state.appt_isLoading = data;
    },
    appt_totalRecords(state, data) {
        state.appt_totalRecords = data;
    },
    appt_serverParams(state, data) {
        state.appt_serverParams = Object.assign({}, state.appt_serverParams, data);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
