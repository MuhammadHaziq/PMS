const state = {
};

const getters = {
    getSelectedPractice: state => localStorage.getItem('selected_practice') ? JSON.parse(localStorage.getItem('selected_practice')) : null,
};

const actions = {
    listPractices({ commit }, {
        search = null,
        page = 1,
        limit = 20,
        ordering = null,
    }) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/api/practice/', { params: { search, page, limit, ordering } })
                .then(resp => {
                    console.log('fetch filtered practices:', resp.data);
                    resolve(resp.data);
                })
                .catch(err => {
                    reject(err);
                })
        });
    },
    getPractice({ commit }, practice) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/api/practice/${practice.id}/`)
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => {
                    reject(err);
                })
        });
    },
    createPractice({ commit }, { name }) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/api/practice/`, { name })
                .then(resp => {
                    resolve(resp.data);
                })
                .catch(err => {
                    reject(err);
                })
        });
    }
};

const mutations = {
    setSelectedPractice(state, data) {
        localStorage.setItem('selected_practice', JSON.stringify(data));
    },
    removeSelectedPractice(state) {
        localStorage.removeItem("selected_practice");
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
