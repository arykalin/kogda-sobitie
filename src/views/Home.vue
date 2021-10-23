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
import { defineComponent } from "vue";
import Accordion from "@/components/Accordion.vue";
import { useRouter } from "vue-router";
import { add, reload } from "ionicons/icons";
import { getEvents } from "@/api/getEvents";
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
      //TODO: if events throw an error do not update it
      try {const response = getEvents()
        console.log(`got response: ${response}`);
        this.events = response;
        this.list = response;
        console.log("events is now", this.events);
        console.log("list is now", this.list);
      }
      catch (e) {
       console.log(`error getting events: ${e}`)
      }
    },
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.refreshEvents();
  },
  data() {
    return {
      events: [] as Event[],
      list: [] as Event[],
      // list: [
      //   {
      //     title: "Танго",
      //     org: "???",
      //     date: new Date("2021-09-30"),
      //     description: "",
      //     duration: "",
      //     where: "Дом на Среднем",
      //     link: "",
      //     target: "",
      //     amount: "",
      //   },
      //   {
      //     title: "Ресурсные онлайн",
      //     org: "Агни",
      //     date: new Date("2021-10-01"),
      //     description: "",
      //     duration: "",
      //     where: "Ресурсные состояния",
      //     link: "",
      //     target: "взрослые",
      //     amount: "10",
      //   },
      //   {
      //     title: "Нежная школа навигаторов",
      //     org: "Ира Жукова",
      //     date: new Date("2021-10-01"),
      //     description: "",
      //     duration: "2 месяца",
      //     where: "Школа Навигаторов",
      //     link: "",
      //     target: "образованцы",
      //     amount: "20",
      //   },
      //   {
      //     title: "Танго",
      //     org: "???",
      //     date: new Date("2021-09-03"),
      //     description: "",
      //     duration: "",
      //     where: "Дом на Среднем",
      //     link: "",
      //     target: "",
      //     amount: "",
      //   },
      // ] as Event[],
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

