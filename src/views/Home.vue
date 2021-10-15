<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title size="large">События</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-button expand="full" @click="() => router.push('/profile')">
        Профиль
      </ion-button>
      <accordion :list="list"></accordion>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="() => router.push('/new')">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-fab vertical="bottom" horizontal="start" slot="fixed">
        <ion-fab-button @click=refreshEvents()>
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
import { defineComponent } from "vue";
import Accordion from "@/components/Accordion.vue";
import { useRouter } from "vue-router";
import {add, reload} from "ionicons/icons";
import { getEvents } from '@/api/getEvents'
import {deleteEvent} from "@/api/deleteEvent";

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
      const response = await getEvents().catch((err) => {
        console.log('err', err)
      });
      console.log('got response', response)
      this.events = response.data.events
      this.list = response.data.events
      console.log('events is now', this.events)
      console.log('list is now', this.list)
    },
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.refreshEvents()
  },
  data() {
    return {
      events: [],
      list: [],
    };
  },
  setup() {
    return {
      router: useRouter(),
      add,
      reload,
    };
  },

});
</script>

