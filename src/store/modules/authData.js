export default {
  state: {
    loggedInUser:
      localStorage.getItem("access_token") != null
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
    loading: false,
    error: null
  },
  getters: {
    loggedInUser: state => state.loggedInUser,
    getLoggedInUserFullName: state => state.loggedInUser ?
      state.loggedInUser.full_name || 'Your Name' : '',
    getLoggedInUserEmail: state => state.loggedInUser ? state.loggedInUser.email : '',
    loading: state => state.loading,
    error: state => state.error
  },
  mutations: {
    setUser(state, data) {
      state.loggedInUser = data;
      state.loading = false;
      state.error = null;
    },
    setLogout(state) {
      state.loggedInUser = null;
      state.loading = false;
      state.error = null;
      // this.$router.go("/signIn");
    },
    setLoading(state, data) {
      state.loading = data;
      state.error = null;
    },
    setError(state, data) {
      state.error = data;
      state.loggedInUser = null;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
    login({ commit }, data) {
      commit("clearError");
      commit("setLoading", true);
      return new Promise((resolve, reject) => {
        this.$axios.post('/api/auth/login/', data)
          .then(resp => {
            if (resp.data.success) {
              const userInfo = {
                ...resp.data.authenticatedUser
              };
              localStorage.setItem('access_token', resp.data.access); // store the token in localstorage
              localStorage.setItem('refresh_token', resp.data.refresh);
              localStorage.setItem('userInfo', JSON.stringify(userInfo));
              commit("setUser", userInfo);
              console.log('user:', userInfo);
              resolve(resp.data);
            }
          })
          .catch(err => {
            localStorage.removeItem("access_token"); // if the request fails, remove any possible user token if possible
            commit("setError", { message: "Invalid login credentials" });
            console.log('user signin error:', err);
            reject(err);
          });
      })
    },
    loginByRefreshToken({ commit }, refresh_token) {
      commit("clearError");
      commit("setLoading", true);
      return new Promise((resolve, reject) => {
        this.$axios.post('/api/auth/token/refresh/', { refresh: refresh_token })
          .then(resp => {
            localStorage.setItem('access_token', resp.data.access); // store the token in localstorage
            localStorage.setItem('refresh_token', resp.data.refresh);
            resolve(resp.data);
          })
          .catch(err => {
            localStorage.removeItem("access_token"); // if the request fails, remove any possible user token if possible
            localStorage.removeItem("refresh_token");
            commit("setError", { message: "Invalid login credentials" });
            console.log('user signin error:', err);
            reject(err);
          });
      });
    },
    signUserUp({ commit }, data) {
      commit("setLoading", true);
      commit("clearError");
      return new Promise((resolve, reject) => {
        this.$axios({ url: '/api/auth/register/', data: data, method: 'POST' })
          .then(resp => {
            commit("setLoading", false);
            if (resp.data.success) {
              localStorage.removeItem("access_token");
              resolve(resp.data);
            }
          })
          .catch(err => {
            commit("setLoading", false);
            localStorage.removeItem("access_token"); // if the request fails, remove any possible user token if possible
            commit("setError", err);
            console.log('user signup error:', err);
            reject(err);
          });
      });
    },
    getProfileInfo({ commit }) {
      commit("setLoading", true);
      return new Promise((resolve, reject) => {
        this.$axios({ url: '/api/auth/profile/', method: 'GET' })
          .then(resp => {
            commit("setLoading", false);
            resolve(resp.data);
          })
          .catch(err => {
            commit("setLoading", false);
            reject(err);
          });
      });
    },
    signOut({ commit }) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("userInfo");
      commit("setLogout");
    },
    forgotPassword({ commit }, email) {
      commit("setLoading", true);
      return new Promise((resolve, reject) => {
        this.$axios.post('/api/auth/password-reset/', { email })
          .then(resp => {
            commit("setLoading", false);
            resolve(resp.data);
          })
          .catch(err => {
            commit("setLoading", false);
            reject(err);
          });
      });
    },
    forgotPasswordConfirm({ commit }, { token, password }) {
      commit("setLoading", true);
      return new Promise((resolve, reject) => {
        this.$axios.post('/api/auth/password-reset/confirm/', { token, password })
          .then(resp => {
            commit("setLoading", false);
            resolve(resp.data);
          })
          .catch(err => {
            commit("setLoading", false);
            reject(err);
          });
      })
    }
  }
};
