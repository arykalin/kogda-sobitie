<template>
  <div v-for="listItem in sort(filter(events, ['noFilter']), 'asc')" :key="listItem.title">
    <ion-accordion-group>
      <ion-accordion value=listItem.title>
        <ion-item slot="header">
          <ion-label class="ion-text-wrap">
            <h1>{{ listItem.title }}</h1>
            <h3>{{ listItem.org }}</h3>
            <ion-note>
              <span>{{ stringToDateDMY(listItem.date) }}</span>
            </ion-note>
          </ion-label>
        </ion-item>

        <ion-item slot="content">
          <ion-label class="ion-text-wrap">
            <ion-note>
              {{ "место: " + listItem.where }}<br/>
              {{ "длительность: " + listItem.duration }}<br/>
              {{ "для кого: " + listItem.target }}<br/>
              {{ "сколько: " + listItem.amount }}<br/>
              {{ "ссылка:" }}
              <a :href="listItem.link" target="_blank">{{ listItem.link }}</a>
            </ion-note>
            <ion-button expand="block" fill="solid"  @click="openModal(listItem)">Edit</ion-button>
          </ion-label>
        </ion-item>
      </ion-accordion>
    </ion-accordion-group>
  </div>

</template>

<script lang="ts">

import {useStore} from "vuex";
import Event from "@/types/Event";
import {defineComponent, ref} from "vue";
import {
  IonNote,
  IonLabel,
  IonItem
} from "@ionic/vue";
import {sortEvents, filterEvents} from "@/tools/SortsAndFilters";
import moment from 'moment';
import {IonAccordion, IonAccordionGroup, IonButton, modalController} from '@ionic/vue';
import UpdateEvent from './UpdateEventModal.vue'

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
    IonAccordion, IonAccordionGroup
  },
  setup() {
    const data = {content: 'New Content'};
    const accordionGroup = ref();
    const store = useStore()
    return {
      accordionGroup,
      store,
      data
    };
  },
  created() {
    this.refreshEvents()
  },
  methods: {
    async openModal(listItem) {
      const modal = await modalController
          .create({
            component: UpdateEvent,
            cssClass: 'my-custom-class',
            componentProps: {
              title: listItem.title,
              event: listItem
            },
          })
      return modal.present();
    },
    stringToDateDMY: function (date) {
      return moment(date, "DD-MM-YYYY").format("DD-MM-YYYY");
    },

    sort: function (list: Event[], sort: string): Event[] {
      return sortEvents(list, sort);
    },

    filter: function (list: Event[], filter: string[]): Event[] {
      return filterEvents(list, filter);
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
