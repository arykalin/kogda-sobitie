`<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>События</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-button expand="full" @click="() => router.push('/login')">
        login
      </ion-button>
      <ion-button expand="full" @click="showevents()">show events</ion-button>
      <ion-list>
        <ion-item v-for="event in events" :key="event.id">
          <ion-label>
            <h1>{{ event.title }}</h1>
            <ion-note>{{ event.who_manages }}</ion-note>
          </ion-label>
          <ion-badge color="success" slot="end">{{ event.date }}</ion-badge>
        </ion-item>
      </ion-list>

      <accordion :list="list">
        <template v-slot="sp">
          <ion-item>
            <ion-label>
              <ion-note>
                {{ "место: " + sp.item.place }}<br/>
                {{ "длительность: " + sp.item.duration }}<br/>
                {{ "для кого: " + sp.item.target }}<br/>
                {{ "сколько: " + sp.item.amount }}<br/>
                {{ "ссылка:" + sp.item.link }}
              </ion-note>
            </ion-label>
          </ion-item>
        </template>
      </accordion>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="() => router.push('/new')">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem
} from "@ionic/vue";
import {defineComponent} from "vue";
import Accordion from "@/components/Accordion.vue";
import {useRouter} from "vue-router";
import {add} from "ionicons/icons";
import axios from "axios";
import {inject, toRefs} from "vue";

export default defineComponent({
  name: "Home",
  components: {
    Accordion,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem
  },
  methods: {
    async showevents() {
      const response = await axios.get("http://127.0.0.1:8080/events");
      console.log("got events", response.data);
      this.events = response.data.events;
    },
  },
  data() {
    return {
      token: "",
      events: [],
      list: [
        { id: 1, title: "Танго", org: "???", date: "30.09.21", duration: "", place: "Дом на Среднем", link: "", target: "", amount: ""},
        { id: 2, title: "Ресурсные онлайн", org: "Агни", date: "01.10.21", duration: "", place: "Ресурсные состояния", link: "", target: "взрослые", amount: "10"},
        { id: 3, title: "Нежная школа навигаторов", org: "Ира Жукова", date: "01.10.21", duration: "2 месяца", place: "Школа Навигаторов", link: "", target: "образованцы", amount: "20"},
        { id: 4, title: "Танго", org: "???", date: "30.09.21", duration: "", place: "Дом на Среднем", link: "", target: "", amount: ""},
        { id: 5, title: "Ресурсные онлайн", org: "Агни", date: "01.10.21", duration: "", place: "Ресурсные состояния", link: "", target: "взрослые", amount: "10"},
        { id: 6, title: "Нежная школа навигаторов", org: "Ира Жукова", date: "01.10.21", duration: "2 месяца", place: "Школа Навигаторов", link: "", target: "образованцы", amount: "20"},
        { id: 7, title: "Танго", org: "???", date: "30.09.21", duration: "", place: "Дом на Среднем", link: "", target: "", amount: ""},
        { id: 8, title: "Ресурсные онлайн", org: "Агни", date: "01.10.21", duration: "", place: "Ресурсные состояния", link: "", target: "взрослые", amount: "10"},
        { id: 9, title: "Нежная школа навигаторов", org: "Ира Жукова", date: "01.10.21", duration: "2 месяца", place: "Школа Навигаторов", link: "", target: "образованцы", amount: "20"},
      ]
    };
  },
  setup() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const {isSignIn} = toRefs();
    const Vue3GoogleOauth = inject("Vue3GoogleOauth");

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const handleClickLogin = () => {
    };
    return {
      router: useRouter(),
      add,
      Vue3GoogleOauth,
      handleClickLogin,
      isSignIn,
    };
  },
});
</script>

