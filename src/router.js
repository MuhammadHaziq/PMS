import Vue from "vue";
import store from "./store";
// import {isMobile} from "mobile-device-detect";
import Router from "vue-router";
import authenticate, { authenticateInPractice } from "./auth/authenticate";
import unAuthenticate from "./auth/unAuthenticate";

Vue.use(Router);

import AppView from './views/app/index.vue'
import VerticalSidebar from './containers/layouts/verticalSidebar'
import Landing from './containers/layouts/landing/landing.vue'
import Contact from './containers/layouts/contact/contact.vue'
import DailyHuddle from './views/app/daily-huddle/daily-huddle.vue'
import BookAppointment from './views/app/book-appointment/book-appointment.vue'
import Report from './views/app/report/report.vue';
import Billiings from './views/app/billings/billings.vue';
import Schedule from './views/app/schedule/schedule.vue';
import ScheduleTemplate from './views/app/schedule-template/schedule-template.vue';
import Users from './views/app/users/users.vue'
import Locations from './views/app/locations/locations.vue'
import LocationHours from './views/app/location-hours/location-hours.vue'
import Operatories from './views/app/operatories/operatories.vue'
import DeltaDental from './views/app/delta-dental/delta-dental.vue'
import Patients from './views/app/patients/patients.vue'
import VideoCall from './views/app/video-call/video-call.vue'
import VideoRoom from './views/app/video-call/room.vue'
import signIn from './views/app/sessions/signIn'
import signUp from './views/app/sessions/signUp.vue'
import forgot from './views/app/sessions/forgot.vue'
import ResetPassword from './views/app/sessions/ResetPassword.vue'
import SelectPractice from './views/app/practices/SelectPractice.vue'

// Extra components
import UIKits from './views/app/ui-kits'
import Alert from './views/app/ui-kits/alerts'
import Popover from "./views/app/ui-kits/popover"
import AppProducts from "./views/app/apps/products"
// ./views/app/sessions/fotgot.vue

// Create a Custom route

function route(name, path, component, meta = {}, children = []) {
  return { name, path, component, meta, children }
}

// create new router
const routes = [
  {
    path: "/",
    beforeEnter: unAuthenticate,
    component: Landing,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/book-appointment",
    name: "Book Appointment",
    component: BookAppointment,
  },
  {
    path: "/signIn",
    name: "signIn",
    beforeEnter: unAuthenticate,
    component: signIn,
  },
  {
    path: "/signUp",
    name: "signUp",
    beforeEnter: unAuthenticate,
    component: signUp,
  },
  {
    path: "/forgot",
    name: "forgot",
    beforeEnter: unAuthenticate,
    component: forgot,
  },
  {
    path: "/reset-password",
    name: "reset-password",
    beforeEnter: unAuthenticate,
    component: ResetPassword,
  },
  {
    path: "/video-call/room",
    component: VideoRoom,
    name: "video-call-room",
    beforeEnter: unAuthenticate,
  },
  {
    path: "/select-practice",
    component: SelectPractice,
    name: "select-practice",
    beforeEnter: authenticate,
  },
  {
    path: "/app",
    name: "HomePageDashboard",
    component: AppView,
    beforeEnter: authenticateInPractice,
    redirect: "./app/daily-huddle",
    children: [
      {
        path: "/app/daily-huddle",
        component: DailyHuddle,
      },
      {
        path: "/app/report",
        component: Report,
      },
      {
        path: "/app/billings",
        component: Billiings,
      },
      {
        path: "/app/schedule",
        component: Schedule,
      },
      {
        path: "/app/schedule-template",
        component: ScheduleTemplate,
      },
      {
        path: "/app/users",
        component: Users,
      },
      {
        path: "/app/locations",
        component: Locations,
      },
      {
        path: "/app/location-hours",
        component: LocationHours,
      },
      {
        path: "/app/operatories",
        component: Operatories,
      },
      {
        path: "/app/delta-dental",
        component: DeltaDental,
      },
      {
        path: "/app/patients",
        component: Patients,
      },
      {
        path: "/app/video-call",
        component: VideoCall,
      },
      {
        path: "/app/overview",
        component: () => import("./views/app/chart/echart")
      },
      {
        path: "/app/settings",
        component: () => import("./views/app/pages/profile")
      },

      //ui-kits
      {
        path: "/app/ui-kits",
        component: UIKits,
        // component: () => import("./views/app/ui-kits"),
        redirect: "/app/ui-kits/alerts",
        children: [
          route('alerts', 'alerts', Alert),
          {
            path: "accordion",
            name: "accordion",
            component: () => import("./views/app/ui-kits/accordion")
          },
          {
            path: "badges",
            name: "badges",
            component: () => import("./views/app/ui-kits/badges")
          },
          {
            path: "buttons",
            name: "buttons",
            component: () => import("./views/app/ui-kits/buttons")
          },
          {
            path: "bootstrap-tab",
            name: "bootstrap-tab",
            component: () => import("./views/app/ui-kits/bootstrap-tab")
          },
          {
            path: "cards",
            name: "cards",
            component: () => import("./views/app/ui-kits/cards")
          },
          {
            path: "list",
            name: "list",
            component: () => import("./views/app/ui-kits/list")
          },
          route('popover', 'popover', Popover),

          // {
          //   path: "popover",
          //   name: "popover",
          //   component: () => import("./views/app/ui-kits/popover")
          // },
          {
            path: "progressbar",
            name: "progressbar",
            component: () => import("./views/app/ui-kits/progressbar")
          },
          {
            path: "collapsible",
            name: "collapsible",
            component: () => import("./views/app/ui-kits/collapsible")
          },
          {
            path: "modals",
            name: "modals",
            component: () => import("./views/app/ui-kits/modals")
          },
          {
            path: "typography",
            name: "typography",
            component: () => import("./views/app/ui-kits/typography")
          },
          {
            path: "carousel",
            name: "carousel",
            component: () => import("./views/app/ui-kits/carousel")
          },
          {
            path: "pagination",
            name: "pagination",
            component: () => import("./views/app/ui-kits/pagination")
          }
          // {
          //   path: "slider",
          //   component: () => import("./views/app/ui-kits/sliders")
          // }
        ]
      },

      //uiExtraKits
      {
        path: "/app/extraKits",
        component: () => import("./views/app/extraKits"),
        redirect: "/app/extraKits/dropdown",
        children: [
          {
            path: "dropdown",
            component: () => import("./views/app/extraKits/dropdown")
          },
          {
            path: "loaders",
            component: () => import("./views/app/extraKits/loaders")
          },
          {
            path: "sweetAlerts",
            component: () => import("./views/app/extraKits/sweetAlerts")
          },
          {
            path: "toasts",
            component: () => import("./views/app/extraKits/toasts")
          },
          {
            path: "tour",
            component: () => import("./views/app/extraKits/tour")
          },
          {
            path: "calendar",
            component: () => import("./views/app/extraKits/calendar")
          },
          {
            path: "rating",
            component: () => import("./views/app/extraKits/rating")
          },
          {
            path: "spinButton",
            component: () => import("./views/app/extraKits/spinButton")
          },
          {
            path: "datePicker",
            component: () => import("./views/app/extraKits/datePicker")
          },
          {
            path: "timePicker",
            component: () => import("./views/app/extraKits/timePicker")
          },
          {
            path: "imageCropper",
            component: () => import("./views/app/extraKits/imageCropper")
          },
          {
            path: "vuedraggable",
            component: () => import("./views/app/extraKits/vuedraggable")
          },
          {
            path: "avatar",
            component: () => import("./views/app/extraKits/avatar")
          },
          {
            path: "sidebar",
            component: () => import("./views/app/extraKits/sidebar")
          },
          {
            path: "spinners",
            component: () => import("./views/app/extraKits/spinners")
          },
          {
            path: "vueTree",
            component: () => import("./views/app/extraKits/vueTree")
          }
        ]
      },
      //  apps
      {
        path: "/app/apps",
        component: () => import("./views/app/apps"),
        redirect: "/app/apps/chat",
        children: [
          {
            path: "scrumboard",
            name: "scrumboard",
            component: () => import("./views/app/apps/scrumboard"),

          },
          {
            path: "add-scrumboard",
            name: "add-scrumboard",
            component: () => import("./views/app/apps/scrumboardAddBoard")
          },
          {
            path: "edit-scrumboard",
            name: "edit-scrumboard",
            component: () => import("./views/app/apps/scrumboard/editScrumBoard")
          },
          // {
          //   path: "scrumboard-one",
          //   component: () => import("./views/app/apps/scrumboard/scrumboard-content-one")
          // },
          {
            path: "contact-list-table",
            name: "contact-list-table",
            component: () => import("./views/app/apps/contactListTable")
          },
          {
            path: "todo-list",
            name: "todo-list",
            component: () => import("./views/app/apps/todo-list")
          },
          {
            path: "invoice",
            name: "invoice",
            component: () => import("./views/app/apps/invoice")
          },
          {
            path: "createInvoice",
            name: "createInvoice",
            component: () => import("./views/app/apps/createInvoice")
          },
          {
            path: "edit-invoice",
            name: "edit-invoice",
            component: () => import("./views/app/apps/editInvoice")
          },
          route('products', 'products', AppProducts),
          {
            path: "product-detail",
            name: "product-detail",
            component: () => import("./views/app/apps/productDetails")
          },
          {
            path: "checkout",
            name: "checkout",
            component: () => import("./views/app/apps/cart")
          },
          {
            path: "checkout-address",
            name: "checkout-address",
            component: () => import("./views/app/apps/checkoutAddress")
          },
          {
            path: "printInvoice",
            name: "printInvoice",
            component: () => import("./views/app/apps/printInvoice")
          },
          {
            path: "taskManager",
            name: "taskManager",
            component: () => import("./views/app/apps/taskManager")
          },
          {
            path: "calendar",
            name: "calendar",
            component: () => import("./views/app/apps/calendar")
          },
          {
            path: "table",
            name: "table",
            component: () => import("./views/app/apps/table")
          },
          {
            path: "vue-table",
            component: () => import("./views/app/apps/vue-tables")
          },
          {
            path: "inbox",
            name: "inbox",
            component: () => import("./views/app/apps/inbox")
          },
          {
            path: "chat",
            component: () => import("./views/app/apps/chat")
          },
          {
            path: "contact-details",
            component: () => import("./views/app/apps/contact-details")
          },
          {
            path: "contact-grid",
            component: () => import("./views/app/apps/contact-grid")
          },
          {
            path: "contact-list",
            component: () => import("./views/app/apps/contact-list")
          },
          {
            path: "payment-checkout",
            component: () => import("./views/app/apps/paymentCheckout")
          }
        ]
      },

      // form
      {
        path: "/app/forms",
        component: () => import("./views/app/form"),
        redirect: "/app/form/basicForms",
        children: [
          {
            path: "basicForms",
            component: () => import("./views/app/form/basicForms")
          },
          {
            path: "basicActionBar",
            component: () => import("./views/app/form/basicActionBar")
          },
          {
            path: "formLayouts",
            component: () => import("./views/app/form/formLayouts")
          },
          {
            path: "formWizard",
            component: () => import("./views/app/form/formWizard")
          },
          {
            path: "tagInput",
            component: () => import("./views/app/form/tagInput")
          },
          {
            path: "mask",
            component: () => import("./views/app/form/masks")
          },
          {
            path: "formComponent",
            component: () => import("./views/app/form/formComponent")
          },
          {
            path: "datepicker",
            component: () => import("./views/app/form/datepicker")
          },
          {
            path: "V2Datepicker",
            component: () => import("./views/app/form/V2Datepicker")
          },
        ]
      },
      // datatables
      {
        path: "/app/datatables",
        component: () => import("./views/app/datatables"),
        redirect: "/app/datatables/list",
        children: [
          {
            path: "paging",
            name: "paging",
            component: () => import("./views/app/datatables/paging")
          },
          {
            path: "filter",
            name: "filter",
            component: () => import("./views/app/datatables/filter")
          },
          {
            path: "lists",
            name: "lists",
            component: () => import("./views/app/datatables/list")
          },
          {
            path: "vue-good-table",
            name: "vue-good-table",
            component: () => import("./views/app/apps/vue-good-table")
          }
        ]
      },

      // widget
      {
        path: "/app/widgets",
        component: () => import("./views/app/widgets"),
        redirect: "/app/widgets/widgetCard",
        children: [
          {
            path: "widgetCard",
            component: () => import("./views/app/widgets/widgetCard")
          },
          {
            path: "widgetStatistics",
            component: () => import("./views/app/widgets/widgetStatistics")
          },
          {
            path: "weatherApp",
            component: () => import("./views/app/widgets/weatherApp")
          },
          {
            path: "widgetApp",
            component: () => import("./views/app/widgets/widgetApp")
          },
          {
            path: "widgetList",
            component: () => import("./views/app/widgets/widgetList")
          }
        ]
      },
      // pages
      {
        path: "/app/pages",
        component: () => import("./views/app/pages"),
        redirect: "/app/pages/profile",
        children: [
          {
            path: "profile",
            component: () => import("./views/app/pages/profile")
          },
          {
            path: "error",
            component: () => import("./views/app/pages/notFound")
          },
          {
            path: "icons",
            component: () => import("./views/app/pages/icons")
          },
          {
            path: "search-result",
            component: () => import("./views/app/pages/search-result")
          },
          {
            path: "pricing-table",
            component: () => import("./views/app/pages/pricingTable")
          },
          {
            path: "faq",
            component: () => import("./views/app/pages/faq")
          },

        ]
      },

      // chart_componnent//////////----------------------////////////////////////

      {
        path: "/app/charts",
        component: () => import("./views/app/chart"),
        redirect: "/app/charts/eChart",
        children: [
          {
            path: "eChart",
            component: () => import("./views/app/chart/echart")
          },
          {
            // problem
            path: "apexAreaChart",
            component: () => import("./views/app/chart/apexChart")
          },
          {
            path: "apexBarChart",
            component: () => import("./views/app/chart/apexBarChart")
          },
          // {
          //   path: "apexBasicChart",
          //   component: () => import("./views/app/chart/apexBasicChart")
          // },
          {
            path: "apexLineChart",
            component: () => import("./views/app/chart/apexLineChart")
          },
          {
            path: "apexMixChart",
            component: () => import("./views/app/chart/apexMixChart")
          },
          {
            path: "apexColumnChart",
            component: () => import("./views/app/chart/apexColumnChart")
          },
          {
            path: "apexPieDonutsChart",
            component: () => import("./views/app/chart/apexPieDonutsChart")
          },
          {
            path: "apexRadarChart",
            component: () => import("./views/app/chart/apexRadarChart")
          },
          {
            path: "apexRadialBarChart",
            component: () => import("./views/app/chart/apexRadialBarChart")
          },
          {
            path: "apexScatterChart",
            component: () => import("./views/app/chart/apexScatterChart")
          },
          {
            path: "apexSparklineChart",
            component: () => import("./views/app/chart/apexSparklineChart")
          }
        ]
      }
    ]
  },
  route("vertical-sidebar", 'vertical-sidebar', VerticalSidebar),
  {
    path: "*",
    component: () => import("./views/app/pages/notFound")
  }
];

const router = new Router({
  mode: "history",
  linkActiveClass: "open",
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

router.afterEach(() => {
  // Remove initial loading
  // Complete the animation of the route progress bar.
  // if (isMobile) {
  const preLoading = document.getElementById("page-loader");
  if (preLoading) {
    preLoading.classList.add('hide')
  }
  if (window.innerWidth <= 1200) {
    store.dispatch("changeSidebarProperties");
    if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
      store.dispatch("changeSecondarySidebarProperties");
    }

    if (store.getters.getCompactSideBarToggleProperties.isSideNavOpen) {
      store.dispatch("changeCompactSidebarProperties");
    }
  } else {
    if (store.getters.getSideBarToggleProperties.isSecondarySideNavOpen) {
      store.dispatch("changeSecondarySidebarProperties");
    }
  }
});

export default router;
