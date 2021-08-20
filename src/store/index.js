import Vuex from "vuex";
import Vue from "vue";
import largeSidebar from "./modules/largeSidebar";
import compactSidebar from "./modules/compactSidebar";
import chat from "./modules/chat";
import config from "./modules/config";
import authData from "./modules/authData";
import invoice from "./modules/invoice";
import operatories from "./modules/operatories";
import deltaDental from "./modules/delta-dental";
import cart from "./modules/cart";
import verticalSidebar from "./modules/verticalSidebar";
import scrumboard from "./modules/scrumboard";
import appointment from "./modules/appointment";
import appointmentProgress from "./modules/appointment-progress";
import patient from "./modules/patient";
import loader from "./modules/loader";
import office from "./modules/office";
import provider from "./modules/provider";
import practice from "./modules/practice";
import user from "./modules/user";


// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    largeSidebar,
    compactSidebar,
    chat,
    config,
    authData,
    invoice,
    cart,
    verticalSidebar,
    scrumboard,
    appointment,
    appointmentProgress,
    patient,
    operatories,
    deltaDental,
    loader,
    office,
    provider,
    practice,
    user
  }
});
