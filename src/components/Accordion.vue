<template>
    <div v-for="listItem in sort(filter(events, ['upToDate']), 'asc')" :key="listItem.title">
      <ion-accordion-group>
        <ion-accordion value=listItem.title>
          <ion-item slot="header">
            <ion-label>
              <h1>{{ listItem.title }}</h1>
              <h3>{{ listItem.org }}</h3>
              <ion-note>
                <span>{{ stringToDateDMY(listItem.date) }}</span>
              </ion-note>
            </ion-label>
          </ion-item>

          <ion-item slot="content">
            <ion-label>
              <ion-note>
                {{ "место: " + listItem.where }}<br />
                {{ "длительность: " + listItem.duration }}<br />
                {{ "для кого: " + listItem.target }}<br />
                {{ "сколько: " + listItem.amount }}<br />
                {{ "ссылка:" }}
                <a :href="listItem.link" target="_blank">{{ listItem.link }}</a>
              </ion-note>
            </ion-label>
          </ion-item>
        </ion-accordion>
      </ion-accordion-group>
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
import {sortEvents, filterEvents} from "@/tools/SortsAndFilters";
import moment from 'moment';

export default defineComponent({
  name: "Accordion",
  // props: {
  //   filter: Object,
  //   sort: String
  // },
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
    stringToDateDMY: function (date) {
      return moment(date,"DD-MM-YYYY").format("DD-MM-YYYY");
    },

    sort: function (list: Event[], sort: string): Event[] { return sortEvents(list, sort); },

    filter: function (list: Event[], filter: string[]): Event[] { return filterEvents(list, filter); },

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
  },
  data() {
    return {
      events: [] as Event[],
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
