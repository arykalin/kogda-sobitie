<template>
  <div v-for="listItem in sortByDate(events)" :key="listItem.title">
    <ion-item @click="headerClicked(listItem)" >
      <ion-label>
        <h1>{{ listItem.title }}</h1>
        <h3>{{ listItem.org }}</h3>
        <ion-note>
          <span>{{ stringToDate(listItem.date) }}</span>
        </ion-note>
      </ion-label>
    </ion-item>
    <transition name="fade">
      <div
        :ref="'body-' + events.indexOf(listItem)"
        style="display: none; height: 115px"
        v-show="expandElement(listItem)"
      >
        <ion-item>
          <ion-label>
            <ion-note>
              {{ "место: " + listItem.where }}<br />
              {{ "длительность: " + listItem.duration }}<br />
              {{ "для кого: " + listItem.target }}<br />
              {{ "сколько: " + listItem.amount }}<br />
              {{ "ссылка:" + listItem.link }}
            </ion-note>
          </ion-label>
        </ion-item>
      </div>
    </transition>
  </div>

</template>

<script lang="ts">

import {useStore} from "vuex";
import Event from "@/types/Event";
import {defineComponent} from "vue";
import {
  IonNote,
  IonLabel,
  IonItem
} from "@ionic/vue";
import moment from 'moment';

export default defineComponent({
  name: "Accordion",
  components: {
    IonNote,
    IonLabel,
    IonItem,
  },
  setup() {
    const store = useStore()
    return {
      isExpanded: "",
      store,
    };
  },
  created() {
    this.refreshEvents()
  },
  methods: {
    stringToDate: function (date) {
      return moment(date,"DD-MM-YYYY").format("DD-MM-YYYY");
    },
    sortByDate: function (list){
      return list.sort((fst, snd) => {
        if (fst > snd) return -1;
        else return 1;
      })
    },
    async refreshEvents() {
      console.debug("refreshing events")
      await this.store.dispatch('event/updateEvents')
          .then(() => {
            console.debug("setting this.events")
            this.events = this.store.getters['event/events'] as Event[]
            console.debug("this.events now is", this.events)
          })
          .catch((error) => {
            console.error("error loading events", error)
          })
      console.debug("finished data loading")

    },
    /**
     * this function is called to determine if the element 11
     * should be in the expanded mode or not
     */
    expandElement(listItem: any): boolean {
      const curE = (this as any).$refs["body-" + this.events.indexOf(listItem)];
      if (curE === undefined) return false;
      return curE.dataset.isExpanded === "true";
    },
    /**
     * this iterates through all of the elements in the list
     * and set data attribute isExpanded appropriately based on
     * this listItem that was clicked
     */
    headerClicked(listItem: any): any {
      this.events.map((e: any) => {
        const curE = (this as any).$refs["body-" + this.events.indexOf(e)];
        if (e === listItem) {
          if (curE.dataset.isExpanded === "true") {
            curE.setAttribute("data-is-expanded", false);
          } else {
            curE.setAttribute("data-is-expanded", true);
          }
        } else {
          curE.setAttribute("data-is-expanded", false);
        }
      }, this);
      this.events = [...this.events];
    },
  },
  data() {
    return {
      events: [] as Event[]
    };
  },
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: height 0.3s ease-in-out;
  overflow: hidden;
}
.fade-enter-from,
.fade-leave-to {
  height: 0px !important;
}
</style>
