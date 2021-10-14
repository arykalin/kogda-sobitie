<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title size="large">События</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-button expand="full" @click="showevents()">show events</ion-button>

      <accordion :list="list"></accordion>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="() => router.push('/new')">
          <ion-icon :icon="add"></ion-icon>
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
import { add } from "ionicons/icons";
import axios from "axios";

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
      const response = await axios.get("http://95.216.158.138:80/events");
      console.log("got events", response.data);
      this.events = response.data.events;
    },
  },
  data() {
    return {
      events: [],
      list: [
        {
          id: 1,
          title: "Танго",
          org: "???",
          date: "30.09.21",
          duration: "",
          place: "Дом на Среднем",
          link: "",
          target: "",
          amount: "",
        },
        {
          id: 2,
          title: "Ресурсные онлайн",
          org: "Агни",
          date: "01.10.21",
          duration: "",
          place: "Ресурсные состояния",
          link: "",
          target: "взрослые",
          amount: "10",
        },
        {
          id: 3,
          title: "Нежная школа навигаторов",
          org: "Ира Жукова",
          date: "01.10.21",
          duration: "2 месяца",
          place: "Школа Навигаторов",
          link: "",
          target: "образованцы",
          amount: "20",
        },
        {
          id: 4,
          title: "Танго",
          org: "???",
          date: "30.09.21",
          duration: "",
          place: "Дом на Среднем",
          link: "",
          target: "",
          amount: "",
        },
        {
          id: 5,
          title: "Ресурсные онлайн",
          org: "Агни",
          date: "01.10.21",
          duration: "",
          place: "Ресурсные состояния",
          link: "",
          target: "взрослые",
          amount: "10",
        },
        {
          id: 6,
          title: "Нежная школа навигаторов",
          org: "Ира Жукова",
          date: "01.10.21",
          duration: "2 месяца",
          place: "Школа Навигаторов",
          link: "",
          target: "образованцы",
          amount: "20",
        },
        {
          id: 7,
          title: "Танго",
          org: "???",
          date: "30.09.21",
          duration: "",
          place: "Дом на Среднем",
          link: "",
          target: "",
          amount: "",
        },
        {
          id: 8,
          title: "Ресурсные онлайн",
          org: "Агни",
          date: "01.10.21",
          duration: "",
          place: "Ресурсные состояния",
          link: "",
          target: "взрослые",
          amount: "10",
        },
        {
          id: 9,
          title: "Нежная школа навигаторов",
          org: "Ира Жукова",
          date: "01.10.21",
          duration: "2 месяца",
          place: "Школа Навигаторов",
          link: "",
          target: "образованцы",
          amount: "20",
        },
      ],
    };
  },
  setup() {
    return {
      router: useRouter(),
      add,
    };
  },
});
</script>

