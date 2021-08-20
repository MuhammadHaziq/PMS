const state = {
    offices: [],
    office_isLoading: false,
    office_totalRecords: 0,
    office_serverParams: {
        search:null,
        page:1,
        limit:20,
        ordering:null,
    }
};

const getters = {
    offices: state => state.offices,
    office_serverParams: state => state.office_serverParams,
    office_isLoading: state => state.office_isLoading,
    office_totalRecords: state => state.office_totalRecords,
};

const actions = {
    listOffices({ commit, getters }, isAll=false ){
        return new Promise((resolve, reject) => {
            let url = `/api/practice/${getters.getSelectedPractice.id}/offices/`;
            if(isAll == true){
                url = '/api/office/';
            }
            this.$axios.get(url, {params: getters.office_serverParams})
            .then(resp=>{
                console.log('fetch filtered offices:', resp.data);
                commit("setOffices", resp.data.results);
                commit("office_totalRecords", resp.data.count);
                commit("office_isLoading", false);
                resolve(true);
            })
            .catch(err=>{
                reject(err);
                commit("office_isLoading", false);
            })
        });
    },    
    searchOffices({ commit, getters }, 
        {
            search=null,
            page=1,
            limit=20,
            ordering=null,
            isAll=false,
        }
    ){
        return new Promise((resolve, reject) => {
            let url = `/api/practice/${getters.getSelectedPractice.id}/offices/`;
            if(isAll){
                url = '/api/office/';
            }
            this.$axios.get(url, {params: {search, page, limit, ordering}})
            .then(resp=>{
                console.log('fetch filtered offices:', resp.data);
                resolve(resp.data);
            })
            .catch(err=>{
                reject(err);
            })
        });
    },
    getOffice(){},
    createOffice({ commit }, {
        location_name,
        phone_number,
        practice,
        email,
        company = null,
        abbreviation = null,
        website = null,
        facility_id = null,
        trans_user_id = null
    }) {
        return new Promise((resolve, reject)=>{
            this.$axios.post('/api/office/', {
                location_name,
                phone_number,
                practice,
                company,
                abbreviation,
                email,
                website,
                facility_id,
                trans_user_id
            }).then(resp => {
                console.log('create office:', resp.data);
                resolve(resp.data);
            }).catch(err=>{
                reject(err);
            });
        });
    },
    createOfficeAndAddress({ commit }, data
    // {
    //     location_name,
    //     phone_number,
    //     practice,
    //     email,
    //     address,
    //     city,
    //     state,
    //     zipcode,
    //     company = null,
    //     abbreviation = null,
    //     website = null,
    //     facility_id = null,
    //     trans_user_id = null,
    //     address_2=null,
    //     country=null,
    // }
    ) {
        return new Promise((resolve, reject)=>{
            this.$axios.post('/api/office/with-address/',
            data
            // {
            //     location_name,
            //     phone_number,
            //     practice,
            //     company,
            //     abbreviation,
            //     email,
            //     website,
            //     facility_id,
            //     trans_user_id,
            //     address,
            //     address_2,
            //     city,
            //     state,
            //     country,
            //     zipcode 
            // }
            ).then(resp => {
                console.log('create office:', resp.data);
                resolve(resp.data);
            }).catch(err=>{
                reject(err);
            });
        });
    },    
    updateOffice(){},
    deleteOffice(){},
    createOfficeAddress({commit}, {
        office_id,
        address,
        address_2=null,
        city,
        state,
        country=null,
        zipcode
    }){
        return new Promise((resolve, reject)=>{
            this.$axios.post(`/api/office/${office_id}/addresses/`, {
                address,
                address_2,
                city,
                state,
                country,
                zipcode
            }).then(resp => {
                console.log('create office address:', resp.data);
                resolve(resp.data);
            }).catch(err=>{
                reject(err);
            });
        });
    }
};

const mutations = {
    setOffices(state, data) {
        state.offices = data;
    },
    office_isLoading(state, data) {
        state.office_isLoading = data;
    },
    office_totalRecords(state, data) {
        state.office_totalRecords = data;
    },
    office_serverParams(state, data) {
        state.office_serverParams = Object.assign({}, state.office_serverParams, data);
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
