// import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import VueRouter from "vue-router";
import GullKit from "./plugins/gull.kit";
// import "babel-polyfill";
// import es6Promise from "es6-promise";
// es6Promise.polyfill();
import store from "./store";
import Breadcumb from "./components/breadcumb";
import firebase from "firebase/app";
import "firebase/auth";
import {firebaseSettings} from "@/data/config";
import i18n from "./lang/lang";
import DateRangePicker from 'vue2-daterange-picker'
//you need to import the CSS manually (in case you want to override it)
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
//import material-icon scss
import "font-awesome/css/font-awesome.min.css";
import 'vue-select/dist/vue-select.css';
import vSelect from 'vue-select'
import axios from "axios";
import "./assets/styles/css/main.css"
import Constants from "@/plugins/constants";



//defined as global component
Vue.component('VueFontawesome', require('vue-fontawesome-icon/VueFontawesome.vue').default);
Vue.component('v-select', vSelect)

Vue.component("breadcumb", Breadcumb);
import InstantSearch from 'vue-instantsearch';
// Vue.use(VueRouter);

Vue.use(InstantSearch);
Vue.use(GullKit);
Vue.use(Constants);

firebase.initializeApp(firebaseSettings);



Vue.config.productionTip = false;

// add axios as global
const instance = axios.create();

instance.defaults.baseURL= process.env.VUE_APP_API_URL || "http://localhost/"
instance.defaults.headers.common["Content-Type"] = "application/json";

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("access_token");
    // Do something before request is sent
    if(token) config['headers']['Authorization'] = "Bearer " + localStorage.getItem("access_token")
    return config;
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
  console.log('error interceptor...', error)
  if(error.response && error.response.status === 401){
      localStorage.removeItem("access_token");
      if(error.response.data.code &&
          error.response.data.code === "token_not_valid"){
            const refresh_token = localStorage.getItem("refresh_token")
            if(refresh_token){
                store.dispatch('setLoading', true);
                store.dispatch('loginByRefreshToken', refresh_token).then(data=>{
                  console.log('refresh token request success:', data);
                  store.dispatch('setLoading', false);
                  window.location.reload();
                }).catch(err=>{
                  console.log('refresh token request error:', err);
                  window.location.href = '/signin';
                });
            }else{
                window.location.href = '/signin';
            }
      }else{
          localStorage.removeItem("refresh_token");
          window.location.href = '/signin';
      }
  }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
//Vue.prototype.$axios = instance;
store.$axios = instance

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
