<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button defaultHref="home"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
      <ion-toolbar>
        <ion-title>Войти</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-item>
        <ion-label>
          <h1>IsInit: {{ Vue3GoogleOauth.isInit }}</h1>
          <h1>IsAuthorized: {{ Vue3GoogleOauth.isAuthorized }}</h1>
          <h2 v-if="user">signed user: {{ user }}</h2>
        </ion-label>
      </ion-item>
      <ion-item>
        <ion-button @click="handleClickSignIn" :disabled="!Vue3GoogleOauth.isInit || Vue3GoogleOauth.isAuthorized">sign
          in
        </ion-button>
      </ion-item>
      <ion-item>
        <ion-label>
          Token: {{ token }}
        </ion-label>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">

import {defineComponent, inject} from 'vue'
import {useStore} from 'vuex'
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  toastController
} from "@ionic/vue";

export default defineComponent({
  name: "Login",
  components: {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  methods: {
    async handleClickSignIn() {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const googleUser = await this.$gAuth.signIn()
        if (!googleUser) {
          return null
        }

        // Debug info
        console.debug("googleUser", googleUser);
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.user = googleUser.getBasicProfile().getEmail();
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        console.debug("getId", this.user);
        console.debug("getBasicProfile", googleUser.getBasicProfile());
        console.debug("getAuthResponse", googleUser.getAuthResponse());
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        console.debug(
            "getAuthResponse",
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this.$gAuth.instance.currentUser.get().getAuthResponse()
        );

        // setting token
        const {id_token: idToken} = googleUser.getAuthResponse()
        this.idToken = idToken;
        this.store.dispatch('auth/backendAuth', idToken).then(() => {
          // show toast
          this.showToast("Login success", 'success');
          // return home
          this.$router.push('/profile');
        })
      } catch (error) {
        //on fail do something
        await this.showToast("Login failed: " + error, 'warning');
        console.error("Error authentication: ", error)
        return null
      }
    },
    async showToast(message, color) {
      const toast = await toastController
          .create({
            message: message,
            duration: 1500,
            color: color,
          })
      return toast.present();
    },
  },
  setup() {
    const store = useStore()
    const Vue3GoogleOauth = inject('Vue3GoogleOauth')
    return {
      Vue3GoogleOauth,
      store,
    }
  },
  data() {
    return {
      idToken: "",
      user: "",
    };
  },
})
</script>

