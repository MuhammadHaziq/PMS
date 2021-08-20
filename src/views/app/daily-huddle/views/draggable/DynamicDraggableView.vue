<template>
  <b-row class="daily-huddle-card">
    <!-- column-one -->
    <b-col md="3" class="mb-30">
      <b-card class="bg-blue">
        <div class="d-flex justify-content-between mb-3">
          <p class="card-title m-0">Scheduled(34)</p>
        </div>
        <b-row>
          <b-col md="12">
            <draggable
              v-bind="dragOptions"
              @start="drag = true"
              @end="drag = false"
            >
              <transition-group
                type="transition"
                :name="!drag ? 'flip-list' : null"
              >
                <b-card
                  class="mb-30 cursor-pointer"
                  v-for="element in list1"
                  :key="element.id"
                >
                  <div class="d-flex justify-content-between">
                    <h6 class="text-muted mb-1">{{ element.title }}</h6>
                  </div>
                  <div class="d-flex justify-content-between">
                    <h6 class="text-muted mb-2">{{ element.time }}</h6>
                  </div>
                  <div
                    class="ul-board--description d-flex justify-content-between mt-3"
                  >
                    <div class="ul-board--lDesc d-flex align-items-center">
                      <span class="text-muted">{{element.date}}</span>
                    </div>
                  </div>
                </b-card>
              </transition-group>
            </draggable>
          </b-col>
        </b-row>
      </b-card>
    </b-col>

    <!-- column-two -->
    <b-col md="3" class="mb-30">
      <b-card class="bg-blue">
        <div class="d-flex justify-content-between mb-3">
          <p class="card-title m-0">In Office(67)</p>
        </div>
        <b-row>
          <b-col md="12">
            <draggable
              v-bind="dragOptions"
              @start="drag = true"
              @end="drag = false"
            >
              <transition-group
                type="transition"
                :name="!drag ? 'flip-list' : null"
              >
                <b-card
                  class="mb-30 cursor-pointer"
                  v-for="element in list2"
                  :key="element.id"
                >
                  <div class="d-flex justify-content-between">
                    <h6 class="text-muted mb-1">{{ element.title }}</h6>
                  </div>
                  <div class="d-flex justify-content-between">
                    <h6 class="text-muted mb-2">{{ element.time }}</h6>
                  </div>
                  <div
                    class="ul-board--description d-flex justify-content-between mt-3"
                  >
                    <div class="ul-board--lDesc d-flex align-items-center">
                      <span class="text-muted">{{element.date}}</span>
                    </div>
                  </div>
                </b-card>
              </transition-group>
            </draggable>
          </b-col>
        </b-row>
      </b-card>
    </b-col>

    <!-- column-three -->
    <b-col md="3" class="mb-30">
      <b-card class="bg-blue">
        <div class="d-flex justify-content-between mb-3">
          <p class="card-title m-0">Finished(4)</p>
        </div>
        <b-row>
          <b-col md="12">
            <draggable
              v-bind="dragOptions"
              @start="drag = true"
              @end="drag = false"
            >
              <transition-group
                type="transition"
                :name="!drag ? 'flip-list' : null"
              >
                <b-card
                  class="mb-30 cursor-pointer"
                  v-for="element in list3"
                  :key="element.id"
                >
                  <div class="d-flex justify-content-between">
                    <h6 class="text-muted mb-1">{{ element.title }}</h6>
                  </div>
                  <div class="d-flex justify-content-between">
                    <h6 class="text-muted mb-1">{{ element.time }}</h6>
                  </div>
                  <div
                    class="ul-board--description d-flex justify-content-between mt-3"
                  >
                    <div class="ul-board--lDesc d-flex align-items-center">
                      <span class="text-muted">{{ element.date }}</span>
                    </div>
                  </div>
                </b-card>
              </transition-group>
            </draggable>
          </b-col>
        </b-row>
      </b-card>
    </b-col>

    <!-- column-four -->
    <b-col md="3">
      <b-card class="bg-blue">
        <div class="d-flex justify-content-between mb-3">
          <p class="card-title m-0">Deffered(3)</p>
        </div>
        <b-row>
          <b-col md="12">
            <draggable
              v-bind="dragOptions"
              @start="drag = true"
              @end="drag = false"
            >
              <transition-group
                type="transition"
                :name="!drag ? 'flip-list' : null"
              >
                <b-card
                  class="mb-30 cursor-pointer"
                  v-for="element in list4"
                  :key="element.id"
                >
                  <div class="d-flex justify-content-between">
                    <h6 class="text-muted mb-1">{{ element.title }}</h6>
                  </div>
                  <div class="d-flex justify-content-between">
                    <h6 class="text-muted mb-2">{{ element.time }}</h6>
                  </div>
                  <div
                    class="ul-board--description d-flex justify-content-between mt-3"
                  >
                    <div class="ul-board--lDesc d-flex align-items-center">
                      <span class="text-muted">{{element.date}}</span>
                    </div>
                  </div>
                </b-card>
              </transition-group>
            </draggable>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import draggable from "vuedraggable";

// transition
export default {
  display: "Transitions",
  order: 7,
  components: {
    draggable,
  },
  data() {
    return {
      list1: [
        {
          id: 1,
          title: "Doctor appointment with patient",
          time: "07:00-07:30 AM",
          date: "12 Apr",
        },
        {
          id: 2,
          title: "Doctor appointment with patient",
          time: "07:00-07:30 AM",
          date: "12 Apr",
        },
        {
          id: 3,
          title: "Doctor appointment with patient",
          time: "07:00-07:30 AM",
          date: "12 Apr",
        },
        {
          id: 4,
          title: "Doctor appointment with patient",
          time: "07:00-07:30 AM",
          date: "12 Apr",
        },
      ],
      list2: [
        {
          id: 5,
          title: "Doctor appointment with patient",
          time: "07:00-07:30 AM",
          date: "12 Apr",
        },
        {
          id: 6,
          title: "Doctor appointment with patient",
          time: "07:00-07:30 AM",
          date: "12 Apr",
        },
        {
          id: 7,
          title: "Doctor appointment with patient",
          time: "07:00-07:30 AM",
          date: "12 Apr",
        },
        {
          id: 8,
          title: "Doctor appointment with patient",
          time: "07:00-07:30 AM",
          date: "12 Apr",
        },
      ],
      list3: [
        {
          id: 9,
          title: "Doctor appointment with patient",
          time: "07:00-07:30 AM",
          date: "12 Apr",
        },
        {
          id: 10,
          title: "Doctor appointment with patient",
          time: "07:00-07:30 AM",
          date: "12 Apr",
        },
        {
          id: 11,
          title: "Doctor appointment with patient",
          time: "07:00-07:30 AM",
          date: "12 Apr",
        },
      ],
      list4: [
        {
          id: 12,
          title: "Doctor appointment with patient",
          time: "07:00-07:30 AM",
          date: "12 Apr",
        },
        {
          id: 13,
          title: "Doctor appointment with patient",
          time: "07:00-07:30 AM",
          date: "12 Apr",
        },
      ],

      drag: false,
    };
  },
  methods: {},
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
};
</script>

<style>
.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}

.bg-blue {
  background-color: #eaf4fb !important;
}
</style>
