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
            <ion-button expand="block" fill="solid" @click="() => router.push('/profile')">
              Редактировать
            </ion-button>
            <ion-button expand="full" @click="setOpen(true)">{{ listItem.title }}</ion-button>
          </ion-label>
        </ion-item>
      </ion-accordion>
    </ion-accordion-group>
    <ion-modal
        :is-open="isOpenRef"
        css-class="my-custom-class"
        @didDismiss="setOpen(false)">
      <Modal :data="listItem"></Modal>
    </ion-modal>
  </div>

</template>

<script lang="ts">
import {IonModal, IonButton} from '@ionic/vue';
import Modal from './modal.vue'

import {deleteEvent} from "@/api/deleteEvent";
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
import {IonAccordion, IonAccordionGroup, IonButton} from '@ionic/vue';

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
    const isOpenRef = ref(false);
    // console.log(isOpenRef.value);
    const setOpen = (state: boolean) => isOpenRef.value = state;
    // console.log(isOpenRef.value);
    const data = {content: 'New Content'};
    const accordionGroup = ref();
    const logAccordionValue = () => {
      if (accordionGroup.value) {
        console.log(accordionGroup.value.$el.value);
      }
    }
    const closeAccordion = () => {
      if (accordionGroup.value) {
        accordionGroup.value.$el.value = undefined;
      }
    }
    const store = useStore()
    return {
      accordionGroup,
      closeAccordion,
      logAccordionValue,
      isExpanded: "",
      store,
      isOpenRef, setOpen, data
    };
  },
  created() {
    this.refreshEvents()
  },
  methods: {
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
    async del(event) {
      console.debug("Accordion: deleting event: " + event);
      const response = await deleteEvent(event,).catch((err) => {
        console.debug('Accordion: err', err)
      });
      console.debug('Accordion: got response', response)
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
