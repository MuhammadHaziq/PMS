<template>
  <!-- ============ Body content start ============= -->
  <div class="main-content">
    <breadcumb :page="'Dashboard'" :folder="'Version 1'" />
    <b-row>
      <!-- ICON BG -->
      <b-col lg="12" md="12">
        <b-card class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center" >
          <i class="i-Eraser-2"></i>
          <div class="container mt-3">
            <p class="text-primary text-24 line-height-1 mb-2">Dashboard Page Under Development!!!</p>
          </div>
        </b-card>
      </b-col>

      <b-col lg="12" xl="12" md="12">
        <b-card header="Daily Huddle" header-bg-variant="transparent">
          <div>
            <b-tabs content-class="mt-1">
              <b-tab title="Scheduled" active>
                  <b-row>
                    <b-col md="3">
                      <button
                        @click="listView"
                        class="btn btn-sm btn-rounded btn-outline-primary mb-3"
                      >
                        <i class="i-Split-Four-Square-Window text-15"></i>
                      </button>
                      <button
                        @click="gridView"
                        class="btn btn-sm btn-rounded btn-outline-primary mb-3 ml-2"
                      >
                        <i class="i-Align-Justify-All text-15"></i>
                      </button>
                    </b-col>
                    <b-col md="9" class="offset">
                      <b-form-input v-model="search" type="text" placeholder="search...."></b-form-input>
                      <!-- <vue-instantsearch> </vue-instantsearch> -->
                    </b-col>
                    <!-- <b-col md="3">
                      <b-form-select
                        v-model="featured"
                        :options="featuredOptions"
                      ></b-form-select>
                    </b-col> -->
                  </b-row>
                  <b-row>
                    <b-col md="3" class="mb-30">
                      <b-card>
                        <b-form-group class>
                          <div class="text-center">
                            <b-button block variant="primary mb-30" @click="redirectCheckout">
                              View Cart <b-badge variant="warning" class="float-right pr-2 pl-2 text-11">{{getAddToCarts.length}}</b-badge>
                            </b-button>
                          </div>
                          <label>
                            <h5 class="text-primary font-weight-600">Price</h5>
                          </label>
                          <b-form-radio name="some-radios" @change="ascendingOrderCartPage()"
                            >Low to High</b-form-radio
                          >
                          <b-form-radio name="some-radios" @change="descendingOrderCartPage()"
                            >High to Low</b-form-radio
                          >
                        </b-form-group>
                        <b-form-group>
                          <label for="range-1">
                            <h5 class="text-primary font-weight-600 mb-1 mt-3">Category</h5>
                          </label>
                          <!-- <b-form-radio name="some-radios" value="A">Electronics</b-form-radio>
                          <b-form-radio name="some-radios" value="B">Mobile</b-form-radio>
                          <b-form-radio name="some-radios" value="B">Sports</b-form-radio>
                          <b-form-radio name="some-radios" value="B">Books</b-form-radio> -->
                          <b-form-radio
                            name="radio"
                            :value="category"
                            v-for="(category, index) in getCategoryItem"
                            :key="index"
                            @change="addCategoryItemPage(category)"
                          >
                            {{ category }}
                          </b-form-radio>
                        </b-form-group>

                        <b-form-group>
                          <label for="range-1">
                            <h5 class="text-primary font-weight-600 mb-1 mt-3">Brand</h5>
                          </label>
                          <ul class="list-group">
                            <li 
                              v-for="(brand, index) in getBrandsItem"
                              :key="index"
                              class="list-group-item p-0 mb-2 border-0"
                            
                            >
                              <div class="test d-flex">
                                <label class="checkbox checkbox-primary">
                                  <input
                                    type="checkbox"
                                    :value="brand"
                                    ref="checkFilter"
                                    @change="addBrandToFilterPage(brand)"
                                  />

                                  <span class="checkmark"></span>
                                </label>
                                {{ brand }}({{ brandsCount[brand] }})
                              </div>
                            </li>
                          </ul>
                        </b-form-group>
                      </b-card>
                    </b-col>
                    <b-col md="9">
                      <!-- <ul v-for="(product, key) in getAddToCarts" :key="key">
                          <li><span>{{ product }}</span></li>
                        </ul> -->
                      <section class="product-cart">
                        <div
                          ref="rowView"
                          class="row"
                          :class="{ 'list-grid': isListView, 'list-horizontal': !isListView }"
                        >
                          <!-- loop LIST Shop -->

                          <div
                            :class="{ 'col-md-4': isListView, 'col-md-12': !isListView }"
                            class="list-item"
                            :key="index"
                            v-for="(item, index) in paginatedItems"
                          >
                            <div
                              class="card o-hidden mb-4 d-flex"
                              :class="{ 'flex-column': isListView, 'flex-row': !isListView }"
                            >
                              <div class="list-thumb d-flex">
                                <img alt :src="item.img" />
                              </div>
                              <div
                                class="flex-grow-1"
                                :class="{ 'd-bock': isListView, 'pl-2 d-flex': !isListView }"
                              >
                                <div
                                  class="card-body align-self-center d-flex flex-column justify-content-between align-items-lg-center"
                                  :class="{ 'flex-lg-row': !isListView }"
                                >
                                  <a class="w-40 w-sm-100" href>
                                    <div class="item-title">{{ item.title }}</div>
                                  </a>
                                  <p class="text-muted text-small w-15 w-sm-100 mb-2">
                                    {{ item.brand }}
                                  </p>

                                  <!-- star  -->
                                  <star-rating 
                                      v-model="item.rating"
                                      :star-size="15" 
                                      :show-rating="false"
                                      @rating-selected ="setRating"
                                      class="mb-3"
                                  ></star-rating>


                                  <div class="m-0 text-muted text-small w-15 w-sm-100">
                                    <h6>$ {{ item.productPrice }}</h6>
                                  </div>
                                  <p
                                    class="m-0 text-muted text-small w-15 w-sm-100 d-none d-lg-block item-badges"
                                  >
                                    <span :class="item.badgeColor" class="badge">{{
                                      item.discount
                                    }}</span>
                                  </p>

                                  <div class="d-flex justify-content-between">
                                    <b-button
                                      size="sm"
                                      @click="addCartPage(item)"
                                      variant="primary"
                                      class="mr-2"
                                      >Add Cart</b-button
                                    >
                                    <b-button
                                      size="sm"
                                      class="ul-product"
                                      @click="viewProduct"
                                      variant="outline-primary"
                                      >View Cart</b-button
                                    >
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <!-- </transition-group>
                          -->
                        </div>
                      </section>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="12" class="mt-4">
                      <b-pagination
                        @change="onPageChanged"
                        :total-rows="totalRows"
                        :per-page="perPage"
                        v-model="currentPage"
                        class="my-0 gull-pagination align-items-center"
                        align="center"
                        first-text
                        last-text
                      >
                        <p class="list-arrow m-0" slot="prev-text">
                          <i class="i-Arrow-Left text-40"></i>
                        </p>
                        <p class="list-arrow m-0" slot="next-text">
                          <i class="i-Arrow-Right text-40"></i>
                        </p>
                      </b-pagination>
                    </b-col>
                  </b-row>
              </b-tab>
              <b-tab title="In Office">Full Name
                <b-row>
                  <b-col lg="12" xl="12">
                    <div class="ul-contact-detail__profile">
                 
                      <div class="ul-contact-detail__inner-profile">
                        <h4 class="heading">Full Name</h4>
                        <span class="tetx-muted">Timity Clarkson</span>
                      </div>
                    </div>
                    <div class="custom-separator"></div>
                  </b-col>
                  <b-col lg="12" xl="12">
                    <div class="ul-contact-dwtail__profile-swcription">
                      <p class="mt-3">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries
                      </p>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries
                      </p>
                      <p>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries
                      </p>
                    </div>
                  </b-col>
                  <b-col lg="12" xl="12">
                    <h4 class="card-title mb-3">Skills</h4>
                    <div class="custom-separator"></div>

                    <span class=""> Wordpress</span>
                    <b-progress
                      :value="10"
                      show-value
                      class="mb-3"
                    ></b-progress>

                    <span class=""> HTML 5</span>
                    <b-progress
                      variant="success"
                      :value="25"
                      show-value
                      class="mb-3"
                    ></b-progress>

                    <span>React.js</span>
                    <b-progress
                      variant="info"
                      :value="50"
                      show-value
                      class="mb-3"
                    ></b-progress>

                    <span>Photoshop</span>
                    <b-progress
                      variant="warning"
                      :value="75"
                      show-value
                      class="mb-3"
                    ></b-progress>
                  </b-col>
                </b-row>
              </b-tab>
              <b-tab title="Finished">
                <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                  <b-form-group
                    id="input-group-1"
                    label="Email address:"
                    label-for="input-1"
                    description="We'll never share your email with anyone else."
                  >
                    <b-form-input
                      id="input-1"
                      v-model="form.email"
                      type="email"
                      required
                      placeholder="Enter email"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    id="input-group-2"
                    label="Your Name:"
                    label-for="input-2"
                  >
                    <b-form-input
                      id="input-2"
                      v-model="form.name"
                      required
                      placeholder="Enter name"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    id="input-group-3"
                    label="Food:"
                    label-for="input-3"
                  >
                    <b-form-select
                      id="input-3"
                      v-model="form.food"
                      :options="foods"
                      required
                    ></b-form-select>
                  </b-form-group>

                  <b-form-group id="input-group-4">
                    <b-form-checkbox-group
                      v-model="form.checked"
                      id="checkboxes-4"
                    >
                      <b-form-checkbox value="me">Check me out</b-form-checkbox>
                      <b-form-checkbox value="that"
                        >Check that out</b-form-checkbox
                      >
                    </b-form-checkbox-group>
                  </b-form-group>

                  <b-button type="submit" variant="primary">Send</b-button>
                  <b-button type="reset" variant="danger">Reset</b-button>
                </b-form>
              </b-tab>
              <b-tab title="Deferred">
                <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                  <b-form-group
                    id="input-group-1"
                    label="Email address:"
                    label-for="input-1"
                    description="We'll never share your email with anyone else."
                  >
                    <b-form-input
                      id="input-1"
                      v-model="form.email"
                      type="email"
                      required
                      placeholder="Enter email"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    id="input-group-2"
                    label="Your Name:"
                    label-for="input-2"
                  >
                    <b-form-input
                      id="input-2"
                      v-model="form.name"
                      required
                      placeholder="Enter name"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    id="input-group-3"
                    label="Food:"
                    label-for="input-3"
                  >
                    <b-form-select
                      id="input-3"
                      v-model="form.food"
                      :options="foods"
                      required
                    ></b-form-select>
                  </b-form-group>

                  <b-form-group id="input-group-4">
                    <b-form-checkbox-group
                      v-model="form.checked"
                      id="checkboxes-4"
                    >
                      <b-form-checkbox value="me">Check me out</b-form-checkbox>
                      <b-form-checkbox value="that"
                        >Check that out</b-form-checkbox
                      >
                    </b-form-checkbox-group>
                  </b-form-group>

                  <b-button type="submit" variant="primary">Send</b-button>
                  <b-button type="reset" variant="danger">Reset</b-button>
                </b-form>
              </b-tab>
            </b-tabs>
          </div>
        </b-card>
      </b-col>

      <!-- <b-col lg="3" md="6" sm="12">
        <b-cardBasic Tab
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Add-User"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">New Leads</p>
            <p class="text-primary text-24 line-height-1 mb-2">205</p>
          </div>
        </b-cardBasic>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Financial"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">Sales</p>
            <p class="text-primary text-24 line-height-1 mb-2">$4021</p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Checkout-Basket"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">Orders</p>
            <p class="text-primary text-24 line-height-1 mb-2">80</p>
          </div>
        </b-card>
      </b-col>
      <b-col lg="3" md="6" sm="12">
        <b-card
          class="card-icon-bg card-icon-bg-primary o-hidden mb-30 text-center"
        >
          <i class="i-Money-2"></i>
          <div class="content">
            <p class="text-muted mt-2 mb-0">Expense</p>
            <p class="text-primary text-24 line-height-1 mb-2">$1200</p>
          </div>
        </b-card>
      </b-col> -->
    </b-row>

    <!-- <b-row>
      <b-col lg="8" md="12" sm="12">
        <b-card class=" mb-30">
          <h4 class="card-title m-0">This Year Sales</h4>
          <div class="chart-wrapper" style="height: 300px ; width:100% ">
            <v-chart
              id="echartbar"
              :options="echartBar"
              :autoresize="true"
            ></v-chart>
          </div>
        </b-card>
      </b-col>
      <b-col col lg="4" md="12" sm="12">
        <b-card class=" mb-30">
          <h4 class="card-title m-0">Sales by Countries</h4>
          <div class="chart-wrapper" style="height: 300px ; width:100%">
            <v-chart :options="echartPie" :autoresize="true"></v-chart>
          </div>
        </b-card>
      </b-col>
    </b-row> -->

    <div class="row">
      <!-- <div class="col-lg-6 col-xl-6 col-md-12">
        <div class="row">
          <div class="col-lg-6 col-md-6">
            <div class="card card-chart-bottom o-hidden mb-30">
              <div class="card-body pb-0 ">
                <div class="text-muted">Last Month Sales</div>
                <p class="  text-primary text-24 m-0">$40250</p>
              </div>
              <div class="chart-wrapper" style="height: 260px">
                <v-chart :options="echart1" :autoresize="true"></v-chart>
              </div>
            </div>
          </div>

          <div class="col-lg-6 col-md-6">
            <div class="card card-chart-bottom o-hidden mb-30">
              <div class="card-body pb-0">
                <div class="text-muted">Last Week Sales</div>
                <p class=" text-warning text-24 m-0">$10250</p>
              </div>
              <div class="chart-wrapper" style="height: 260px">
                <v-chart :options="echart2" :autoresize="true"></v-chart>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <b-card class="card-profile-1 mb-30 text-center">
              <div class="avatar box-shadow-2 mb-3">
                <img src="@/assets/images/faces/16.jpg" alt />
              </div>
              <h5 class="m-0">Jassica Hike</h5>
              <p class="mt-0 text-muted">Top Seller</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae cumque. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum.
              </p>
              <button class="btn btn-primary btn-rounded">
                Contact Jassica
              </button>
              <div class="card-socials-simple mt-4">
                <a href>
                  <i class="i-Linkedin-2"></i>
                </a>
                <a href>
                  <i class="i-Facebook-2"></i>
                </a>
                <a href>
                  <i class="i-Twitter"></i>
                </a>
              </div>
            </b-card>
          </div>
          <div class="col-md-6">
            <b-card class="card-profile-1 mb-30 text-center">
              <div class="avatar box-shadow-2 mb-3">
                <img src="@/assets/images/faces/13.jpg" alt />
              </div>
              <h5 class="m-0">jhon doe</h5>
              <p class="mt-0 text-muted">Top Buyer</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae cumque. It was popularised in the 1960s with the
                release of Letraset sheets containing Lorem Ipsum .
              </p>
              <button class="btn btn-primary btn-rounded">
                Contact Jassica
              </button>
              <div class="card-socials-simple mt-4">
                <a href>
                  <i class="i-Linkedin-2"></i>
                </a>
                <a href>
                  <i class="i-Facebook-2"></i>
                </a>
                <a href>
                  <i class="i-Twitter"></i>
                </a>
              </div>
            </b-card>
          </div>
        </div>
      </div> -->

      <!-- <b-col lg="6" xl="6" md="12">
        <div class="card mb-30">
          <div class="card-body">
            <div class="card-title">Top Selling Products</div>
            <div class="d-flex flex-column flex-sm-row align-items-center mb-3">
              <img
                class="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3"
                src="@/assets/images/products/headphone-4.jpg"
                alt=""
              />
              <div class="flex-grow-1 text-center text-sm-left">
                <h5 class=""><a href="">Wireless Headphone E23</a></h5>
                <p class="m-0 text-small text-muted">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
                <p class="text-small text-danger m-0">
                  $450 <del class="text-muted">$500</del>
                </p>
              </div>
              <div>
                <button
                  class="btn btn-outline-primary btn-rounded btn-sm m-3 m-sm-0"
                >
                  View details
                </button>
              </div>
            </div>
            <div class="d-flex flex-column flex-sm-row align-items-center mb-3">
              <img
                class="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3"
                src="@/assets/images/products/headphone-2.jpg"
                alt=""
              />
              <div class="flex-grow-1 text-center text-sm-left">
                <h5 class=""><a href="">Wireless Headphone Y902</a></h5>
                <p class="m-0 text-small text-muted">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
                <p class="text-small text-danger m-0">
                  $550 <del class="text-muted">$600</del>
                </p>
              </div>
              <div>
                <button
                  class="btn btn-outline-primary btn-sm btn-rounded m-3 m-sm-0"
                >
                  View details
                </button>
              </div>
            </div>
            <div class="d-flex flex-column flex-sm-row align-items-center mb-3">
              <img
                class="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3"
                src="@/assets/images/products/headphone-3.jpg"
                alt=""
              />
              <div class="flex-grow-1 text-center text-sm-left">
                <h5 class=""><a href="">Wireless Headphone E09</a></h5>
                <p class="m-0 text-small text-muted">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
                <p class="text-small text-danger m-0">
                  $250 <del class="text-muted">$300</del>
                </p>
              </div>
              <div>
                <button
                  class="btn btn-outline-primary btn-sm btn-rounded m-3 m-sm-0"
                >
                  View details
                </button>
              </div>
            </div>
            <div class="d-flex flex-column flex-sm-row align-items-center mb-3">
              <img
                class="avatar-lg mb-3 mb-sm-0 rounded mr-sm-3"
                src="@/assets/images/products/headphone-4.jpg"
                alt=""
              />
              <div class="flex-grow-1 text-center text-sm-left">
                <h5 class=""><a href="">Wireless Headphone X89</a></h5>
                <p class="m-0 text-small text-muted">
                  Lorem ipsum dolor sit amet consectetur.
                </p>
                <p class="text-small text-danger m-0">
                  $450 <del class="text-muted">$500</del>
                </p>
              </div>
              <div>
                <button
                  class="btn btn-outline-primary btn-sm btn-rounded m-3 m-sm-0"
                >
                  View details
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="card mb-30">
          <div class="card-body p-0">
            <div class="card-title  d-flex align-items-center mb-2 pb-0 p-3">
              <span>User activity</span>
              <span class="flex-grow-1"></span>
              <span class="badge badge-pill badge-warning">Updated daily</span>
            </div>
            <div class="d-flex border-bottom justify-content-between  p-3 ">
              <div class="flex-grow-1">
                <span class="text-small text-muted">Pages / Visit</span>
                <h5 class="m-0">2065</h5>
              </div>
              <div class="flex-grow-1">
                <span class="text-small text-muted">New user</span>
                <h5 class="m-0">465</h5>
              </div>
              <div class="flex-grow-1">
                <span class="text-small text-muted">Last week</span>
                <h5 class="m-0">23456</h5>
              </div>
            </div>
            <div class="d-flex border-bottom justify-content-between p-3">
              <div class="flex-grow-1">
                <span class="text-small text-muted">Pages / Visit</span>
                <h5 class="m-0">1829</h5>
              </div>
              <div class="flex-grow-1">
                <span class="text-small text-muted">New user</span>
                <h5 class="m-0">735</h5>
              </div>
              <div class="flex-grow-1">
                <span class="text-small text-muted">Last week</span>
                <h5 class="m-0">92565</h5>
              </div>
            </div>
            <div class="d-flex justify-content-between p-3 mb-1">
              <div class="flex-grow-1">
                <span class="text-small text-muted">Pages / Visit</span>
                <h5 class="m-0">3165</h5>
              </div>
              <div class="flex-grow-1">
                <span class="text-small text-muted">New user</span>
                <h5 class="m-0">165</h5>
              </div>
              <div class="flex-grow-1">
                <span class="text-small text-muted">Last week</span>
                <h5 class="m-0">32165</h5>
              </div>
            </div>
          </div>
        </div>
      </b-col> -->

      <div class="col-md-12">
        <div class="card mb-30">
          <div class="card-body p-0 ">
            <h5 class="card-title border-bottom p-3 mb-2">Recent Orders</h5>

            <vue-good-table
              :columns="columns"
              :line-numbers="false"
              styleClass="order-table vgt-table"
              :rows="rows"
            >
            </vue-good-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { echartBar, echartPie } from "@/data/echarts";

import { echart1, echart2, echart3 } from "@/data/dashboard1";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "DashboardV1",
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Dashboard v1"
  },
  data() {
    return {
      rating: 4,
      search:"",
      isProduct:true,
      filterBrand: "",
      priceValue: 500,
      selectedFilter: "",
      selectPriceRange: "",
      priceRange: 1,
      value: 1,
      items: "",
      paginatedItems: "",
      currentPage: 1,
      perPage: 9,
      // totalRows: '',
      isFirst: false,
      // button
      isListView: true,
      // isGridVIew:false,
      selected: [], // Must be an array reference!
      // options: [
      //   { text: 'Orange', value: 'orange' },
      //   { text: 'Apple', value: 'apple' },
      //   { text: 'Pineapple', value: 'pineapple' },
      //   { text: 'Grape', value: 'grape' }
      // ],
      featured: null,
      featuredOptions: [
        { value: null, text: "Featured" },
        { value: "a", text: "Highest Price" },
        { value: "b", text: "Lowest Price" }
      ],
      // brandsCount: this.$store.getters.brandsCount,
      // brands: this.$store.state.brands
      echartBar,
      echartPie,
      echart1,
      echart2,
      echart3,
      columns: [
        {
          label: "Order Id",
          field: "id",
          thClass: "text-left pl-3",
          tdClass: "text-left pl-3"
        },
        {
          label: "Buyer Name",
          field: "name",
          thClass: "text-left",
          tdClass: "text-left"
        },
        {
          label: "Product",
          field: "img",
          html: true,
          thClass: "text-left",
          tdClass: "text-left"
        },
        {
          label: "Status",
          field: "span",
          html: true,
          thClass: "text-left",
          tdClass: "text-left"
        },

        {
          label: "Shipping Cost",
          field: "score",

          // html:true,
          type: "percentage",
          thClass: "text-left",
          tdClass: "text-left"
        },
        {
          label: "Date",
          field: "createdAt",
          type: "date",
          dateInputFormat: "yyyy-mm-dd",
          dateOutputFormat: "mmm Do yy",
          thClass: "text-left",
          tdClass: "text-left"
        },
        {
          label: "Action",
          field: "action",
          html: true,
          thClass: "text-left",
          tdClass: "text-left"
        }
      ],
      rows: [
        {
          id: 1,
          name: "John",
          img:
            '<img src="' +
            require("@/assets/images/products/iphone-1.jpg") +
            '" class="rounded-circle avatar-sm" alt=""> <img src="' +
            require("@/assets/images/products/iphone-2.jpg") +
            '" class="rounded-circle avatar-sm" alt="">',
          span:
            '<span class="badge badge-pill badge-outline-primary p-2 ">Delivered</span>',
          createdAt: "2019-10-31 ",
          score: 0.03343,
          action:
            '<button class=" btn btn-outline-primary text-black btn-rounded">View</button>'
        },
        {
          id: 2,
          name: "Jane",
          img:
            '<img src="' +
            require("@/assets/images/products/headphone-1.jpg") +
            '" class="rounded-circle avatar-sm" alt=""> <img src="' +
            require("@/assets/images/products/headphone-2.jpg") +
            '" class="rounded-circle avatar-sm" alt="">',
          span:
            '<span class="badge badge-pill badge-outline-danger p-2">Shipped</span>',
          createdAt: "2011-10-31",
          score: 0.03343,
          action:
            '<button class=" btn btn-outline-primary text-black btn-rounded">View</button>'
        },
        {
          id: 3,
          name: "Susan",
          img:
            '<img src="' +
            require("@/assets/images/products/headphone-3.jpg") +
            '" class="rounded-circle avatar-sm" alt=""> <img src="' +
            require("@/assets/images/products/headphone-4.jpg") +
            '" class="rounded-circle avatar-sm" alt="">',
          span:
            '<span class="badge badge-pill badge-outline-success p-2 ">Delivered</span>',
          createdAt: "2011-10-30",
          score: 0.03343,
          action:
            '<button class=" btn btn-outline-primary text-black btn-rounded">View</button>'
        },
        {
          id: 4,
          name: "Chris",
          img:
            '<img src="' +
            require("@/assets/images/products/speaker-1.jpg") +
            '" class="rounded-circle avatar-sm" alt=""> <img src="' +
            require("@/assets/images/products/speaker-2.jpg") +
            '" class="rounded-circle avatar-sm" alt="">',
          span:
            '<span class="badge badge-pill badge-outline-primary p-2">Pending</span>',
          createdAt: "2011-10-11",
          score: 0.03343,
          action:
            '<button class=" btn btn-outline-primary text-black btn-rounded">View</button>'
        },
        {
          id: 5,
          name: "Dan",
          img:
            '<img src="' +
            require("@/assets/images/products/watch-1.jpg") +
            '" class="rounded-circle avatar-sm" alt=""> <img src="' +
            require("@/assets/images/products/watch-2.jpg") +
            '" class="rounded-circle avatar-sm" alt="">',
          span:
            '<span class="badge badge-pill badge-outline-info p-2">Processing</span>',
          createdAt: "2011-10-21",
          score: 0.03343,
          action:
            '<button class=" btn btn-outline-primary text-black btn-rounded">View</button>'
        },
        {
          id: 6,
          name: "John",
          img:
            '<img src="' +
            require("@/assets/images/products/speaker-1.jpg") +
            '" class="rounded-circle avatar-sm" alt=""> <img src="' +
            require("@/assets/images/products/speaker-2.jpg") +
            '" class="rounded-circle avatar-sm" alt="">',
          span:
            '<span class="badge badge-pill badge-outline-success p-2 ">Delivered</span>',
          createdAt: "2011-10-31",
          score: 0.03343,
          action:
            '<button class=" btn btn-outline-primary text-black btn-rounded">View</button>'
        },
        {
          id: 7,
          name: "John",
          img:
            '<img src="' +
            require("@/assets/images/products/headphone-3.jpg") +
            '" class="rounded-circle avatar-sm" alt=""> <img src="' +
            require("@/assets/images/products/headphone-4.jpg") +
            '" class="rounded-circle avatar-sm" alt="">',
          span:
            '<span class="badge badge-pill badge-outline-info p-2 ">Pending</span>',
          createdAt: "2019-10-31 ",
          score: 0.03343,
          action:
            '<button class=" btn btn-outline-primary text-black btn-rounded">View</button>'
        },
        {
          id: 8,
          name: "Jane",
          img:
            '<img src="' +
            require("@/assets/images/products/iphone-1.jpg") +
            '" class="rounded-circle avatar-sm" alt=""> <img src="' +
            require("@/assets/images/products/iphone-1.jpg") +
            '" class="rounded-circle avatar-sm" alt="">',
          span:
            '<span class="badge badge-pill badge-outline-danger p-2">Shipped</span>',
          createdAt: "2011-10-31",
          score: 0.03343,
          action:
            '<button class=" btn btn-outline-primary text-black btn-rounded">View</button>'
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      "getItems",
      "brandsCount",
      "getBrandsItem",
      "getFilterProducts",
      "getCategoryItem",
      "getAddToCarts"
    ]),
    totalRows() {
      return this.getFilterProducts.length;
    },
    filterItems() {
      return this.getFilterProducts;
    },
    // searchProducts(){
    //   return this.getFilterProducts.filter(item => item.title.toLowerCase().match(this.search.toLowerCase()))
    // }
    filterProducts()
        {
            // return this.getItems.filter((filterSearch) => {
            //     return filterSearch.toLowerCase().match(this.search.toLowerCase());
            // }); 
            
            return this.getFilterProducts.filter(item => item.title.toLowerCase().match(this.search.toLowerCase()))
        }
  },
  created: function() {
    this.items = this.getItems;
  },
  methods: {
    ...mapActions([
      "addCart",
      "addBrandToFilter",
      "addCategoryItem",
      "ascendingOrderCart",
      "descendingOrderCart"
    ]),
    setRating: function(rating){
      this.rating= rating;
      console.log(this.rating= rating);
      
    },
    addCartPage(item){
      this.addCart(item)
      this.$bvToast.toast(`${ item.qty } item added to the cart successfully`, {
          title: 'Click View Cart',
          variant: 'primary',
          solid: true,
          autoHideDelay: 700
        })
      // this.$swal({
        
      //   toast: true,
      //   position: "top-end",
      //   showConfirmButton: false,
      //   timer: 1000,
      //   type: "success",
      //   title: `${ item.qty } item added to the cart successfully`
      // });

      
      // this.$router.push("/app/apps/checkout");
    },
    viewProduct(){
      // this.$router.push("product-detail")
      // console.log(this.getFilterProducts.filter(item => item.title.toLowerCase().match(this.search.toLowerCase())));
      // console.log(this.search);
      
      
    },
    addBrandToFilterPage(checkedArray) {
      checkedArray = this.$refs.checkFilter;
      checkedArray = checkedArray
        .filter(element => element.checked)
        .map(element => element.value);
      console.log(checkedArray);
      this.addBrandToFilter(checkedArray);
      this.paginatePerPage();
    },
    paginatePerPage() {
      this.paginate(this.perPage, 0);
    },
    addCategoryItemPage(data) {
      this.addCategoryItem(data);
      this.paginatePerPage();
    },
    ascendingOrderCartPage() {
      this.ascendingOrderCart();
      this.paginatePerPage();
    },
    descendingOrderCartPage() {
      this.descendingOrderCart();
      this.paginatePerPage();
    },
  
    redirectCheckout(){
      this.$router.push("/app/apps/checkout")
    },
    onRadioButtonChange(data) {
      if (data == "asc") {
        console.log("Working", this.ascendingOrderCart());
      }
    },

    viewCart() {
      this.$router.push("./product-detail");
    },
    // button
    listView() {
      this.isListView = true;
    },
    gridView() {
      this.isListView = false;
    },

    // end-button
    paginate(pageSize, pageNumber) {
      let itemsToParse = this.filterProducts;
      this.paginatedItems = itemsToParse.slice(
        pageNumber * pageSize,
        (pageNumber + 1) * pageSize
      );
    },
    onPageChanged(page) {
      this.paginate(this.perPage, page - 1);
    }
  },
  mounted() {
    this.paginate(this.perPage, 0);
  }
};
</script>
<style>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
