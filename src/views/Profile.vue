<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="home"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar>
        <ion-title>Профиль</ion-title>
      </ion-toolbar>
    </ion-header>
  <ion-content :fullscreen="true">
    <ion-item>
      <ion-label class="ion-text-wrap">
        <h1>Full name: {{ fullName }} </h1>
        <h2>Email: {{ email }}</h2>
      </ion-label>
    </ion-item>
    <ion-button expand="full" @click="() => router.push('/login')">
      Войти
    </ion-button>
    <ion-button expand="full" @click="logout()">Выйти</ion-button>
    <ion-button expand="full" @click="refreshProfile()">Refresh</ion-button>
    <ion-button expand="full" @click="getStore()">get store</ion-button>
  </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {IonButtons, IonHeader, IonToolbar, IonContent, IonPage, IonTitle, IonBackButton} from '@ionic/vue';
import {defineComponent, inject} from "vue";
import { useStore } from 'vuex'
import {useRouter} from "vue-router";
import User from "@/types/User";
import {getAuth} from "@/api/getAuth";

export default defineComponent({
  name: "Profile",
  components: {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  setup() {
    const Vue3GoogleOauth = inject('Vue3GoogleOauth')
    return {
      store: useStore(),
      router: useRouter(),
      Vue3GoogleOauth,
    }
  },
  computed: {
    user() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return this.store.getters['auth/user']
    },
    token() {
      return localStorage.getItem('token')
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getInfo()
  },
  methods: {
    getInfo(): void {
      if (this.user != null) {
        this.fullName = `${this.user.givenName} ${this.user.familyName}`
      } else {
        this.fullName = 'user is empty'
      }
      if (this.user != null) {
        this.email = this.user.email
      } else {
        this.email = 'empty'
      }
    },
    async refreshProfile(){
      // setting token
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const {id_token: idToken} = this.$gAuth.instance.currentUser.get().getAuthResponse();

      //getting token from server
      try {
        await this.store.dispatch('auth/backendAuth', idToken)
      } catch (error) {
        //on fail do something
        console.error("error getting token: ", error);
      }
      this.getInfo()
    },
    async logout(): Promise<void> {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      await this.$gAuth.signOut()
      await this.store.dispatch('auth/logout')
    },
    async getStore(): Promise<void> {
      console.debug("user getter: ", this.store.getters['auth/user'] as User)
      console.debug("events getter: ", this.store.getters['event/events'] as Event[])
    }
  },
  data() {
    return {
      fullName: "",
      email: "",
    };
  },
})
</script>
