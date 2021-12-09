<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title size="large">Колесо года</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <accordion></accordion>

      <ion-fab vertical="bottom" horizontal="start" slot="fixed">
        <ion-fab-button @click="refreshEvents()">
          <ion-icon :icon="reload"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import {defineComponent, ref} from "vue";
import Accordion from "@/components/Accordion.vue";
import { useRouter } from "vue-router";
import { add, reload } from "ionicons/icons";
import {useStore} from "vuex";
import {showToast} from "@/util/toast";
import Event from "@/types/Event";

export default defineComponent({
  name: "Home",
  components: {
    Accordion,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  methods: {
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
      events: [] as Event[]
    };
  },
  created() {
    this.refreshEvents()
  },
  setup() {
    const store = useStore()
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => isOpenRef.value = state;
    const data = {content: 'New Content'};
    return {
      router: useRouter(),
      add,
      reload,
      store,
      showToast,
      isExpanded: "",
      isOpenRef, setOpen, data
    };
  },
});
</script>

