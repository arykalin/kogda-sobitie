<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>События</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-item>
        <h1>IsInit: {{ Vue3GoogleOauth.isInit }}</h1>
        <h1>IsAuthorized: {{ Vue3GoogleOauth.isAuthorized }}</h1>
        <h2 v-if="user">signed user: {{user}}</h2>
        <button @click="handleClickSignIn" :disabled="!Vue3GoogleOauth.isInit || Vue3GoogleOauth.isAuthorized">sign in</button>
        <button @click="handleClickGetAuthCode" :disabled="!Vue3GoogleOauth.isInit">get authCode</button>
        <button @click="handleClickSignOut" :disabled="!Vue3GoogleOauth.isAuthorized">sign out</button>
        <button @click="handleClickDisconnect" :disabled="!Vue3GoogleOauth.isAuthorized">disconnect</button>
      </ion-item>
      <ion-button expand="full" @click="login()">login</ion-button>
      <ion-item>
        <ion-label>
          {{ token }}
        </ion-label>
      </ion-item>
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
  import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem
  } from "@ionic/vue";
  import { defineComponent } from "vue";
  import Accordion from "@/components/Accordion.vue";
  import { useRouter } from "vue-router";
  import { add } from "ionicons/icons";
  import axios from "axios";
  import { inject, toRefs } from "vue";

  export default defineComponent({
  name: "Home",
  components: {
  Accordion,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem
  },
  methods: {
    async login() {
      const tokenResp = await axios.get("http://localhost:8080/auth");
      axios.defaults.headers.common['Token'] = tokenResp.data.msg
      this.token = tokenResp.data.msg
    },
    async handleClickSignIn(){
      try {
        const googleUser = await this.$gAuth.signIn();
        if (!googleUser) {
          return null;
        }
        console.log("googleUser", googleUser);
        this.user = googleUser.getBasicProfile().getEmail();
        console.log("getId", this.user);
        console.log("getBasicProfile", googleUser.getBasicProfile());
        console.log("getAuthResponse", googleUser.getAuthResponse());
        console.log(
            "getAuthResponse",
            this.$gAuth.instance.currentUser.get().getAuthResponse()
        );
      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },
    async handleClickGetAuthCode(){
      try {
        const authCode = await this.$gAuth.getAuthCode();
        console.log("authCode", authCode);
      } catch(error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },
    async handleClickSignOut() {
      try {
        await this.$gAuth.signOut();
        console.log("isAuthorized", this.Vue3GoogleOauth.isAuthorized);
        this.user = "";
      } catch (error) {
        console.error(error);
      }
    },
    handleClickDisconnect() {
      window.location.href = `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${window.location.href}`;
    },
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
    const { isSignIn } = toRefs();
    const Vue3GoogleOauth = inject("Vue3GoogleOauth");

    const handleClickLogin = () => {};
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

