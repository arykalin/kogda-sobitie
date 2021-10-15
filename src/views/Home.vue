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
      <ion-list>
        <ion-item v-for="event in events" :key="event.id">
          <ion-label>
            <h1>{{ event.title }}</h1>
            <ion-note>{{ event.org }}</ion-note>
          </ion-label>
          <ion-badge color="success" slot="end">{{ event.date }}</ion-badge>
        </ion-item>
      </ion-list>

      <accordion :list="list"></accordion>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="() => router.push('/new')">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <ion-fab vertical="bottom" horizontal="start" slot="fixed">
        <ion-fab-button @click=showevents()>
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
    async showevents() {
      const response = await getEvents().catch((err) => {
        console.log('err', err)
      });
      console.log('got response', response)
      this.events = response.data.events
      console.log('events is now', this.events)
    },
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.showevents()
  },
  data() {
    return {
      events: [],
      list: [
        {
          title: "Танго пример аккордиона",
          org: "???",
          date: "30.09.21",
          duration: "",
          where: "Дом на Среднем",
          link: "",
          target: "",
          amount: "1",
        }
      ],
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

