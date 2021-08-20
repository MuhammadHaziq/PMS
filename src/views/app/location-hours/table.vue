<template>
  <div class="h-100">
    <div class="main-content table-list">
      <div class="wrapper">
        <vue-good-table
          :columns="columns"
          styleClass="tableOne vgt-table"
          :selectOptions="{
            enabled: false,
            selectionInfoClass: 'table-alert__box',
          }"
          :rows="rows"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'daysOfWeek'"
              ><label v-for="(day, index) in props.row.daysOfWeek" :key="index"
                >{{
                  `${index > 0 ? ", " : ""}${moment().day(day).format("dddd")}`
                }}{{ showIndex(index, props.row.daysOfWeek.length) }}</label
              >
            </span>
          </template>
        </vue-good-table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import * as moment from "moment";
// const STORAGE_KEY = 'invoice';
export default {
  data() {
    return {
      moment,
      columns: [
        {
          label: "Start",
          field: "start",
        },
        {
          label: "End",
          field: "end",
        },
        {
          label: "Days of the week",
          field: "daysOfWeek",
        },
      ],
      rows: [
        {
          id: 1,
          start: moment().set({ hours: 8, minutes: 0 }).format("h:mm A"),
          end: moment().set({ hours: 9, minutes: 50 }).format("h:mm A"),
          daysOfWeek: [0, 1, 2, 3, 4],
        },
        {
          id: 2,
          start: moment().set({ hours: 10, minutes: 0 }).format("h:mm A"),
          end: moment().set({ hours: 12, minutes: 0 }).format("h:mm A"),
          daysOfWeek: [2, 3, 4, 5, 6],
        },
        {
          id: 3,
          start: moment().set({ hours: 13, minutes: 0 }).format("h:mm A"),
          end: moment().set({ hours: 13, minutes: 50 }).format("h:mm A"),
          daysOfWeek: [1, 2, 3, 4, 6, 7],
        },
        {
          id: 4,
          start: moment().set({ hours: 14, minutes: 0 }).format("h:mm A"),
          end: moment().set({ hours: 17, minutes: 0 }).format("h:mm A"),
          daysOfWeek: [4, 6, 7],
        },
      ],
    };
  },
  computed: mapGetters([]),
  methods: {
    ...mapActions([]),
  },
};
</script>