<template>
  <div class="main-content">
    <b-row>
      <b-col lg="12" md="12">
        <b-card title="Office Support Red Line Graphs" class="mb-30">
          <div class="chart-wrapper" style="height: 500px">
            <v-chart :options="stackedArea" :autoresize="true"></v-chart>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { stackedArea } from "@/data/echarts";

export default {
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Insights",
  },
  data: () => ({
    stackedArea,
  }),
  methods: {},
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>

