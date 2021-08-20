<template>
  <div class="main-content" v-if="!getLoading">
    <breadcumb :page="'User List'" :folder="'App'" />

    <b-row>
      <b-col md="12">
        <b-card no-body>
          <b-card-header class="gradient-purple-indigo o-hidden pb-80">
            <div class="pt-4">
              <b-row>
                <h4 class="col-md-4 text-white">Users</h4>
                <b-form-input
                  type="text"
                  class="form-control-rounded col-md-4 ml-3 mr-3"
                  placeholder="Search Users...."
                ></b-form-input>
              </b-row>
            </div>
          </b-card-header>
          <b-card-body>
            <div class="ul-contact-list-body">
              <div class="ul-contact-main-content d-flex">
                <div
                  class="ul-contact-left-side"
                  :class="{ 'contact-list-mobile': isCLoseMenu }"
                >
                  <b-card class="ul-contact-vh">
                    <div class="contact-close-mobile-icon float-right mb-2">
                      <i
                        @click="isCLoseMenu = !isCLoseMenu"
                        class="i-Close-Window text-15 font-weight-600"
                      ></i>
                    </div>
                    <div class="ul-contact-list">
                      <b-button
                        variant="outline-secondary"
                        class="mb-30"
                        block
                        @click="onAddUserModal"
                        v-b-modal.user-modal
                        >ADD USER</b-button
                      >
                      <b-modal
                        id="user-modal"
                        centered
                        :title="isUpdateBtn ? 'Update User' : 'Add User'"
                        hide-footer
                        ref="my-modal"
                      >
                        <b-form @submit="onSubmit" @reset="onReset">
                          <!-- <b-form-group id="input-group-1" label-for="input-1">
                            <b-form-input
                              id="input-1"
                              v-model="userForm.name"
                              type="text"
                              required
                              placeholder="Enter your name...."
                            ></b-form-input>
                          </b-form-group> -->

                          <b-form-group id="input-group-1" label-for="input-1">
                            <b-form-input
                              id="input-1"
                              v-model="userForm.email"
                              type="email"
                              required
                              placeholder="Enter email"
                              :disabled="isUpdateBtn"
                            ></b-form-input>
                          </b-form-group>

                          <b-form-group id="input-group-2" label-for="input-2">
                            <office-search-select
                              @update="setOffice"
                              :value="selectedOffice"
                              :disabled="isUpdateBtn"
                            />
                          </b-form-group>

                          <b-form-group id="input-group-2" label-for="input-2">
                            <b-form-select
                              v-model="userForm.permissionLevel"
                              :options="permissionLevels"
                            ></b-form-select>
                          </b-form-group>

                          <b-form-group>
                            <b-button
                              v-if="isSaveBtn"
                              type="submit"
                              variant="success"
                              >Submit</b-button
                            >
                            <b-button
                              v-else-if="isUpdateBtn"
                              type="submit"
                              variant="success"
                              >Update</b-button
                            >
                          </b-form-group>
                        </b-form>
                      </b-modal>
                      <!-- <b-list-group flush>
                        <b-list-group-item
                          button
                          class="
                            d-flex
                            justify-content-between
                            align-items-center
                          "
                          >Cras justo odio</b-list-group-item
                        >

                        <b-list-group-item
                          button
                          class="
                            d-flex
                            justify-content-between
                            align-items-center
                          "
                          >Dapibus ac facilisis in</b-list-group-item
                        >

                        <b-list-group-item
                          button
                          class="
                            d-flex
                            justify-content-between
                            align-items-center
                          "
                          >Morbi leo risus</b-list-group-item
                        >
                      </b-list-group> -->
                    </div>
                  </b-card>
                </div>

                <div class="ul-contact-content">
                  <b-card>
                    <div class="navbar-header clearfix">
                      <i
                        @click="openMenu"
                        class="
                          nav-icon
                          i-Align-Justify-All
                          text-25
                          ul-contact-mobile-icon
                          float-left
                        "
                      ></i>
                    </div>

                    <div class="row mb-2">
                      <div class="col-4 ml-auto">
                        <office-search-select
                          @update="fetch"
                          :value="selectedOffice"
                        />
                      </div>
                    </div>

                    <vue-good-table
                      :line-numbers="false"
                      :columns="columns"
                      :pagination-options="{
                        enabled: true,
                        mode: 'records',
                      }"
                      styleClass="tableOne vgt-table"
                      :rows="rows"
                    >
                      <template slot="table-row" slot-scope="props">
                        <!-- <span v-if="props.column.field == 'img'">
                          <img
                            class="rounded"
                            :src="props.row.img"
                            style="width: 50px; height: 50px"
                            alt="corrupted img"
                          />
                        </span> -->

                        <span v-if="props.column.field == 'email'">
                          {{ props.row.user.email }}
                        </span>

                        <span v-else-if="props.column.field == 'action'">
                          <b-dropdown
                            id="dropdown-left"
                            variant="link"
                            text="Left align"
                            toggle-class="text-decoration-none"
                            size="sm"
                            dropleft
                            no-caret
                          >
                            <template
                              v-slot:button-content
                              class="_r_btn border-0"
                            >
                              <span class="_dot _r_block-dot bg-dark"></span>
                              <span class="_dot _r_block-dot bg-dark"></span>
                              <span class="_dot _r_block-dot bg-dark"></span>
                            </template>
                            <b-dropdown-item
                              v-b-modal.user-modal
                              @click="onEditUser(props.row)"
                            >
                              <i
                                class="
                                  nav-icon
                                  i-Pen-2
                                  text-success
                                  font-weight-bold
                                  mr-2
                                "
                              ></i>
                              Edit
                            </b-dropdown-item>

                            <b-dropdown-item @click="onDelete(props.row)">
                              <i
                                class="
                                  nav-icon
                                  i-Close-Window
                                  text-danger
                                  font-weight-bold
                                  mr-2
                                "
                              ></i>
                              Delete
                            </b-dropdown-item>
                          </b-dropdown>
                        </span>
                      </template>
                    </vue-good-table>
                  </b-card>

                  <!-- edit-modal  -->
                  <!-- <div class="edit-modal">
                    <b-modal
                      id="contact-list-table-modal-2"
                      centered
                      title="BootstrapVue"
                      hide-footer
                    >
                      <b-form @submit.stop.prevent="onUpdateUserList">
                        <b-form-group id="input-group-1" label-for="input-1">
                          <b-form-input
                            id="input-1"
                            v-model="editUserListForm.name"
                            type="text"
                            required
                            placeholder="Enter your name...."
                          ></b-form-input>
                        </b-form-group>
                        <b-form-group id="input-group-1" label-for="input-1">
                          <b-form-input
                            id="input-1"
                            v-model="editUserListForm.email"
                            type="email"
                            required
                            placeholder="Enter email"
                          ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-2" label-for="input-2">
                          <b-form-input
                            id="input-2"
                            type="text"
                            v-model="editUserListForm.permissionLevel"
                            required
                            placeholder="Permission Level..."
                          ></b-form-input>
                        </b-form-group>
                        <b-form-group>
                          <b-button
                            type="submit"
                            variant="success"
                            @click="onUpdateUserList"
                            >Update</b-button
                          >
                        </b-form-group>
                      </b-form>
                    </b-modal>
                  </div> -->
                </div>
              </div>
            </div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
  <Loader v-else />
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Loader from "../../../components/loader/loader";
import OfficeSearchSelect from "../../../components/office/OfficeSearchSelect.vue";

export default {
  components: {
    Loader,
    OfficeSearchSelect,
  },

  data() {
    return {
      isCLoseMenu: true,
      isSaveBtn: true,
      isUpdateBtn: false,
      selectedOffice: "",
      userForm: {
        id: "",
        email: "",
        permissionLevel: "",
        office: "",
        user: "",
      },
      columns: [
        {
          label: "Email",
          field: "email",
        },
        {
          label: "Permission Level",
          field: "user_type",
        },
        {
          field: "action",
          label: "Action",
        },
      ],
      rows: [],
      permissionLevels: [
        "SCHEDULER",
        "PROVIDER",
        "BUSINESS_OWNER",
        "OFFICE_MANAGER",
      ],
    };
  },

  computed: {
    ...mapGetters(["getLoading"]),
  },

  mounted() {
    this.setLoading(true);
    setTimeout(() => {
      this.setLoading(false);
    }, 2000);
  },

  methods: {
    ...mapActions([
      "setLoading",
      "createUser",
      "updateUser",
      "fetchUsers",
      "deleteUser",
    ]),

    /**
     * Get Users
     */
    fetch(office) {
      if (!office.id) {
        return console.log("No office found");
      }

      this.fetchUsers({
        id: office.id,
      })
        .then((data) => {
          if (!data.count) {
            this.$bvToast.toast("No users found.", {
              title: `Get Users List`,
              variant: "info",
              solid: true,
            });
          }

          this.rows = data.results;
        })
        .catch((err) => {
          console.log("failed to fetch users:", err);
        });
    },

    onSubmit(evt) {
      evt.preventDefault();

      // validate form
      if (!this.userForm.office && !this.isUpdateBtn) {
        return this.$bvToast.toast("Please select office.", {
          title: `Form Errors!`,
          variant: "danger",
          solid: true,
        });
      }

      if (!this.userForm.permissionLevel) {
        return this.$bvToast.toast("Please select permission.", {
          title: `Form Errors!`,
          variant: "danger",
          solid: true,
        });
      }

      if (this.isUpdateBtn) return this.update();

      this.create();
    },

    /**
     * Create/Invite User
     */
    create() {
      this.createUser({
        email: this.userForm.email,
        user_type: this.userForm.permissionLevel,
        office: this.userForm.office,
      })
        .then((data) => {
          this.$bvToast.toast(data.data, {
            title: `Invitation Sent!`,
            variant: "success",
            solid: true,
          });

          this.$bvModal.hide("user-modal");
          this.onReset();
        })
        .catch((err) => {
          // console.log("failed to search offices:", err);
          this.$bvToast.toast(err.message, {
            title: `Error - Create User!`,
            variant: "danger",
            solid: true,
          });
        });
    },

    /**
     * Update User's Permisson
     */
    update() {
      this.updateUser({
        user_type: this.userForm.permissionLevel,
        office: this.userForm.office,
        user: this.userForm.user,
      })
        .then((data) => {
          this.$bvToast.toast(data.data, {
            title: `Permission Updated!`,
            variant: "success",
            solid: true,
          });

          // update existing row
          this.rows = this.rows.map((r) => {
            if (r.id === data.id) return data;
            else return r;
          });

          this.$bvModal.hide("user-modal");
          this.onReset();
        })
        .catch((err) => {
          console.log("failed to search offices:", err);
          this.$bvToast.toast(err.message, {
            title: `Error - Update User's Permission`,
            variant: "danger",
            solid: true,
          });
        });
    },

    /**
     * Delete Use
     */
    onDelete(data) {
      console.log(data);

      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          this.deleteUser({
            office: data.office.id,
            user: data.id,
          })
            .then((data) => {
              // console.log(this.rows, data);
              // remove user from list
              this.fetch(this.selectedOffice);
              this.$swal("Deleted!", "User has been deleted.", "success");
            })
            .catch((err) => {
              this.$bvToast.toast(err.message, {
                title: `Error - Delete User`,
                variant: "danger",
                solid: true,
              });
            });
        }
      });
    },

    openMenu() {
      this.isCLoseMenu = !this.isCLoseMenu;
    },

    onAddUserModal() {
      this.isUpdateBtn = false;
      this.isSaveBtn = true;
      this.userForm = {};
      this.selectedOffice = {};
    },

    onEditUser(data) {
      this.isUpdateBtn = true;
      this.isSaveBtn = false;
      this.selectedOffice = data.office;
      this.userForm = {
        email: data.user.email,
        permissionLevel: data.user_type,
        office: data.office.id,
        user: data.id,
      };
    },

    onReset() {
      this.userForm = {
        id: "",
        email: "",
        permissionLevel: "",
        office: "",
        user: "",
      };
    },

    setOffice(office) {
      this.userForm.office = office.id;
    },
  },
};
</script>

<style scoped>
.gradient-purple-indigo {
  /* background-color: #a855f7; */
  background-image: -o-linear-gradient(-154deg, #a855f7 0%, #33214b 100%);
  background: linear-gradient(104deg, #00ced7 0%, #33214b 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='$from', endColorstr='$to',GradientType=1 );
}
</style>