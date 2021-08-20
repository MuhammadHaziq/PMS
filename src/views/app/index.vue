<template>
  <div>
    <!-- <keep-alive> -->
    <component :is="getThemeMode.layout"></component>
    <!-- </keep-alive> -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name:"AppView",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getThemeMode"])
  },
  methods: {}
};
</script>
