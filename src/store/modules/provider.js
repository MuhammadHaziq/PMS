const state = {
};
  
  const getters = {
    getFilteredProviders: state => state.filteredProviders
  };
  
  const actions = {
    listProviders({ commit, getters }, {
      office=null,
      operatory=null,
      search=null
    }) {
        if(office && operatory){
          return new Promise((resolve, reject) => {
              this.$axios.get(`/api/office/${office.id}/operatory/${operatory.id}/provider/search/`, {params: {query: search}})
              .then(resp=>{
                  console.log('fetch filtered providers:', resp.data);
                  resolve(resp.data);
              })
              .catch(err=>{
                  reject(err);
              })
          });
        }else{
          return new Promise((resolve, reject) => {
              this.$axios.get(`/api/practice/${getters.getSelectedPractice.id}/providers/`, {params: {query: search}})
              .then(resp=>{
                  console.log('fetch filtered providers:', resp.data);
                  resolve(resp.data);
              })
              .catch(err=>{
                  reject(err);
              })
          });
        }
    }
  };
  
  const mutations = {
  };
  
  export default {
    state,
    getters,
    actions,
    mutations
  };
  