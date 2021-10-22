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
        <h2>User Info: {{ user }}</h2>
        <h3>Token: {{ token }}</h3>
      </ion-label>
    </ion-item>
    <ion-button expand="full" @click="() => router.push('/login')">
      Войти
    </ion-button>
    <ion-button expand="full" @click="logout()">Выйти</ion-button>
    <ion-button expand="full" @click="getStore()">get store</ion-button>
  </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {IonButtons, IonHeader, IonToolbar, IonContent, IonPage, IonTitle, IonBackButton} from '@ionic/vue';
import {defineComponent, inject} from "vue";
import { useStore } from 'vuex'
import {useRouter} from "vue-router";

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
    fullName() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return `${this.user.givenName} ${this.user.familyName}`
    },
    token() {
      return localStorage.getItem('token')
    }
  },
  methods: {
    async logout() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      await this.$gAuth.signOut()
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this.store.dispatch('auth/logout')
    },
    async getStore() {
      console.log("user getter: ", this.store.getters['auth/user'])
    }
  },
})
</script>
