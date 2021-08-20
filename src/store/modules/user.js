const state = {
  users: [],
};

const getters = {
  getUsers: (state) => state.users,
};

const actions = {
  fetchUsers({ commit }, { id }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get(`/api/office/${id}/users/`)
        .then((resp) => resolve(resp.data))
        .catch((err) => reject(err));
    });
  },

  createUser({ commit }, { email, user_type, office }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(`/api/office/${office}/invite/`, {
          email,
          user_type,
        })
        .then((resp) => resolve(resp.data))
        .catch((err) => reject(err));
    });
  },

  updateUser({ commit }, { office, user_type, user }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .put(`/api/office/${office}/users/${user}/`, {
          user_type,
        })
        .then((resp) => resolve(resp.data))
        .catch((err) => reject(err));
    });
  },

  deleteUser({ commit }, { office, user }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .delete(`/api/office/${office}/users/${user}/`)
        .then((resp) => resolve(resp.data))
        .catch((err) => reject(err));
    });
  },
};

const mutations = {
  setUsers(state, data) {
    state.users = data;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
