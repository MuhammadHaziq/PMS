const state = {
  // filteredOperatories: [],
  // selectedOffice: null,
};

const getters = {
  // getFilteredOperatories: state => state.filteredOperatories
};

const actions = {
  listOperatories({ commit, getters }, {
    search=null,
    page=1,
    limit=20,
    ordering=null,
    office=null,
    expand=null
  }) {
      return new Promise((resolve, reject) => {
          let url = `/api/practice/${getters.getSelectedPractice.id}/operatories/`;
          if(office != null){
            url = `/api/office/${office.id}/operatory/`;
          }
          this.$axios.get(url, {params: {search, page, limit, ordering, expand}})
          .then(resp=>{
              console.log('fetch filtered operatories:', resp.data);
              // commit('setFilteredOperatories', resp.data);
              // commit('setSelectedOffice', office);
              resolve(resp.data);
          })
          .catch(err=>{
              reject(err);
          })
      });
  },
  getOperatory(){},
  createOperatory({commit}, {
    office_id,
    name,
    notes,
    status
  }){
      return new Promise((resolve, reject) => {
          this.$axios.post(`/api/office/${office_id}/operatory/`, {name, notes, status})
          .then(resp=>{
              resolve(resp.data);
          })
          .catch(err=>{
              reject(err);
          })        
      });
  },
  updateOperatory(){},
  deleteOperatory(){}
};

const mutations = {
  // setFilteredOperatories(state, data) {
  //   state.filteredOperatories = data;
  // },
  // setSelectedOffice(state, office) {
  //   state.selectedOffice = office;
  // }
};

export default {
  state,
  getters,
  actions,
  mutations
};
