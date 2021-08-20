<template>
  <!-- ============ Body content start ============= -->
  <div class="main-content" v-if="!getLoading">
    <!-- <breadcumb :page="'Dashboard'" :folder="'Version 1'" /> -->
    <b-row>
      <b-col lg="12" xl="12" md="12">
        <!--  <b-card header="Daily Huddle" header-bg-variant="transparent">-->
        <div class="d-flex justify-content-between">
          <div class="d-flex align-items-center mb-4">
            <div class="mr-3 page-title">
              <h3 class="font-weight-bold m-0">Report</h3>
            </div>
          </div>
        </div>

        <div class="report-tab">
          <b-tabs content-class="mt-1">
            <b-tab title="Production" active>
              <div class="mb-20">
                <div>
                  <h6 class="mb-3 report-label">Daily</h6>
                  <b-row class="report-card-row">
                    <b-col
                      lg="4"
                      xl="3"
                      md="4"
                      v-for="num in [1, 2, 3, 4, 5, 6]"
                      :key="num"
                    >
                      <div class="report-card">
                        <i class="fa fa-check"></i>
                        <span>Lorem Ipsum Docet</span>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </div>
              <div class="mb-20">
                <div>
                  <h6 class="mb-3 report-label">Weekly</h6>
                  <b-row class="report-card-row">
                    <b-col
                      lg="4"
                      xl="3"
                      md="4"
                      v-for="num in [1, 2, 3, 4, 5, 6]"
                      :key="num"
                    >
                      <div class="report-card">
                        <i class="fa fa-check"></i>
                        <span>Lorem Ipsum Docet</span>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </div>
              <div class="mb-20">
                <div>
                  <h6 class="mb-3 report-label">Monthly</h6>
                  <b-row class="report-card-row">
                    <b-col
                      lg="4"
                      xl="3"
                      md="4"
                      v-for="num in [1, 2, 3, 4, 5, 6]"
                      :key="num"
                    >
                      <div class="report-card">
                        <i class="fa fa-check"></i>
                        <span>Lorem Ipsum Docet</span>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </div>
              <div class="mb-20">
                <div>
                  <h6 class="mb-3 report-label">Yearly</h6>
                  <b-row class="report-card-row">
                    <b-col
                      lg="4"
                      xl="3"
                      md="4"
                      v-for="num in [1, 2, 3, 4, 5, 6]"
                      :key="num"
                    >
                      <div class="report-card">
                        <i class="fa fa-check"></i>
                        <span>Lorem Ipsum Docet</span>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </div>
              <div class="mb-20">
                <div>
                  <h6 class="mb-3 report-label">Custom</h6>
                  <b-row class="report-card-row">
                    <b-col
                      lg="4"
                      xl="3"
                      md="4"
                      v-for="num in [1, 2, 3, 4, 5, 6]"
                      :key="num"
                    >
                      <div class="report-card">
                        <i class="fa fa-check"></i>
                        <span>Lorem Ipsum Docet</span>
                      </div>
                    </b-col>
                  </b-row>
                </div>
              </div>
            </b-tab>
            <b-tab title="Collection">
              <div class="mb-20"></div>
            </b-tab>
            <b-tab title="Patient">
              <div class="mb-20"></div>
            </b-tab>
            <b-tab title="Accounting">
              <div class="mb-20"></div>
            </b-tab>
            <b-tab title="Other">
              <div class="mb-20"></div>
            </b-tab>
            <b-tab title="Custom">
              <div class="mb-20"></div>
            </b-tab>
          </b-tabs>
        </div>
      </b-col>
    </b-row>
  </div>
  <Loader v-else />
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Loader from "../../../components/loader/loader";

export default {
  name: "Report",
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Report",
  },
  components: { Loader },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getItems", "getLoading"]),
  },
  created: function () {
    // this.items = this.getItems;
  },
  methods: {
    ...mapActions(["setLoading"]),
    addCartPage() {},
  },
  mounted() {
    this.setLoading(true);
    setTimeout(() => {
      this.setLoading(false);
    }, 2000);
    // this.paginate(this.perPage, 0);
  },
};
</script>
<style>
.report-label {
  color: #8da1b5;
}
.report-tab span.active-tab {
  color: #355677;
}
.report-tab {
  background-color: #eaf4fb;
  padding: 20px;
  border-radius: 10px;
}
.tabs .nav-tabs {
  border: 0;
}
.tabs .nav-tabs .nav-item .nav-link {
  border: 0;
  background-color: transparent;
  position: relative;
  font-weight: bold;
  color: #8da1b5 !important;
  padding: 0;
  margin: 10px;
}
.tabs .nav-tabs .nav-item .nav-link:before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px !important;
  background-color: #6cdcd4;
  transition: all 0.5s ease-in-out;
}
.tabs .nav-tabs .nav-item .nav-link.active:before,
.tabs .nav-tabs .nav-item .nav-link:hover:before {
  width: 100%;
}
.tabs .nav-tabs .nav-item .nav-link.active,
.tabs .nav-tabs .nav-item .nav-link:hover {
  color: #6cdcd4 !important;
  border: 0;
  background-color: transparent;
}
.row.report-card-row {
  margin-left: -25px;
  margin-right: -25px;
}
.report-card {
  background-color: #fff;
  padding: 30px 50px;
  border-radius: 10px;
  box-shadow: 0 4px 20px 1px rgb(0 0 0 / 6%), 0 1px 4px rgb(0 0 0 / 8%);
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
  margin-left: 10px;
  margin-right: 10px;
  font-weight: 600;
  min-height: 100px;
  display: flex;
  align-items: center;
}
.report-card i {
  position: absolute;
  left: 0;
  top: 0;
  color: #fff;
  padding: 6px 12px 10px 8px;
  border-radius: 0 0 100%;
  transition: all 0.5s ease-in-out;
  width: 33px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px;
  -moz-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.report-card:before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 30px;
  height: 30px;
  border-radius: 0 0 100%;
  background-color: #00c5b4;
  animation-name: reverse;
  animation-duration: 0.6s;
}
.report-card:hover:before {
  animation-name: myanimation;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  border-radius: 0;
}
@-webkit-keyframes myanimation {
  0% {
    width: 30px;
    height: 30px;
    border-radius: 0 0 100%;
  }
  50% {
    width: 50%;
    height: 100%;
    border-radius: 0 0 100%;
  }
  100% {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
}

@keyframes myanimation {
  0% {
    width: 30px;
    height: 30px;
    border-radius: 0 0 100%;
  }
  50% {
    width: 50%;
    height: 100%;
    border-radius: 0 0 100%;
  }
  100% {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
}
@-webkit-keyframes reverse {
  0% {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
  50% {
    width: 50%;
    height: 100%;
    border-radius: 0 0 100%;
  }
  100% {
    width: 30px;
    height: 30px;
    border-radius: 0 0 100%;
  }
}

@keyframes reverse {
  0% {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
  50% {
    width: 50%;
    height: 100%;
    border-radius: 0 0 100%;
  }
  100% {
    width: 30px;
    height: 30px;
    border-radius: 0 0 100%;
  }
}
.report-card:hover i {
  border-radius: 0;
  text-align: center;
  left: 50%;
  font-size: 20px;
  top: 50%;
  margin: 0;
}
</style>
