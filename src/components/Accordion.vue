<template>
  <ion-button expand="full" @click="() => getLogs(events)">
    log events list
  </ion-button>
  <div v-for="listItem in events" :key="listItem.title">>
    {{ listItem.title }}
  </div>
  <ion-button @click="setOpen(true)">Show Modal</ion-button>
  <ion-modal
      :is-open="isOpenRef"
      css-class="my-custom-class"
      @didDismiss="setOpen(false)"
  >
    <Modal :data="data"></Modal>
  </ion-modal>
</template>

<script lang="ts">
import { IonModal, IonButton } from '@ionic/vue';
import Modal from './modal.vue'

import {deleteEvent} from "@/api/deleteEvent";
import {useStore} from "vuex";
import {defineComponent, ref} from "vue";
import Event from "@/types/Event";

export default defineComponent({
  name: "Accordion",
  components: { IonModal, IonButton, Modal },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getEvents();
    this.$forceUpdate
  },
  setup() {
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => isOpenRef.value = state;
    const data = { content: 'New Content' };
    const store = useStore()
    return {
      isExpanded: "",
      store,
      isOpenRef, setOpen, data
    };
  },
  data() {
    return {
      events: [] as Event[]
    };
  },
  methods: {
    async getEvents(): Promise<void> {
      console.debug('getting events in data')
      this.events = this.store.getters['event/events'] as Event[]
    },
    getLogs(events) {
      this.getEvents();
      console.debug("Event list is ", events)
      this.$forceUpdate
    },
    async del(event) {

      console.debug("Accordion: deleting event: " + event);
      const response = await deleteEvent(event,).catch((err) => {
        console.debug('Accordion: err', err)
      });
      console.debug('Accordion: got response', response)
    },
    expandElement(elemID: string): boolean {
      return (this as any).isExpanded === elemID;

    },
    headerClicked(id: string): void {
      if ((this as any).isExpanded === id) {
        (this as any).isExpanded = ""
      } else {
        (this as any).isExpanded = id
      }

      console.debug("header clicked id", id)
      console.debug("expanded is", (this as any).isExpanded)
    },
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
