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
      this.list = response.data.events
      console.log('list is now', this.list)
    },
  },
  data() {
    return {
      events: [],
      list: [
        {
          title: "Танго",
          org: "???",
          date: "30.09.21",
          duration: "",
          where: "Дом на Среднем",
          link: "",
          target: "",
          amount: "1",
        },
        {
          title: "Ресурсные онлайн",
          org: "Агни",
          date: "01.10.21",
          duration: "",
          where: "Ресурсные состояния",
          link: "",
          target: "взрослые",
          amount: "2",
        },
        {
          title: "Нежная школа навигаторов",
          org: "Ира Жукова",
          date: "01.10.21",
          duration: "2 месяца",
          where: "Школа Навигаторов",
          link: "",
          target: "образованцы",
          amount: "3",
        },
        {
          title: "Танго",
          org: "???",
          date: "30.09.21",
          duration: "",
          where: "Дом на Среднем",
          link: "",
          target: "",
          amount: "4",
        },
        {
          title: "Ресурсные онлайн",
          org: "Агни",
          date: "01.10.21",
          duration: "",
          where: "Ресурсные состояния",
          link: "",
          target: "взрослые",
          amount: "5",
        },
        {
          title: "Нежная школа навигаторов",
          org: "Ира Жукова",
          date: "01.10.21",
          duration: "2 месяца",
          where: "Школа Навигаторов",
          link: "",
          target: "образованцы",
          amount: "6",
        },
        {
          title: "Танго",
          org: "???",
          date: "30.09.21",
          duration: "",
          where: "Дом на Среднем",
          link: "",
          target: "",
          amount: "7",
        },
        {
          title: "Ресурсные онлайн",
          org: "Агни",
          date: "01.10.21",
          duration: "",
          where: "Ресурсные состояния",
          link: "",
          target: "взрослые",
          amount: "8",
        },
        {
          title: "Нежная школа навигаторов",
          org: "Ира Жукова",
          date: "01.10.21",
          duration: "2 месяца",
          where: "Школа Навигаторов",
          link: "",
          target: "образованцы",
          amount: "10",
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

