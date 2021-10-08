<template>
  <ion-page>
    <ion-header :translucent="true">
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
        <ion-button @click="handleClickGetAuthCode" :disabled="!Vue3GoogleOauth.isInit">get authCode</ion-button>
        <ion-button @click="handleClickSignOut" :disabled="!Vue3GoogleOauth.isAuthorized">sign out</ion-button>
        <ion-button @click="handleClickDisconnect" :disabled="!Vue3GoogleOauth.isAuthorized">disconnect</ion-button>
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
import {toastController} from "@ionic/vue";

export default defineComponent({
  name: "Login",
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
        console.log("googleUser", googleUser);
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.user = googleUser.getBasicProfile().getEmail();
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        console.log("getId", this.user);
        console.log("getBasicProfile", googleUser.getBasicProfile());
        console.log("getAuthResponse", googleUser.getAuthResponse());
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        console.log(
            "getAuthResponse",
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this.$gAuth.instance.currentUser.get().getAuthResponse()
        );

        // setting token
        const {id_token: idToken} = googleUser.getAuthResponse()

        // show toast
        await this.showToast("Login success", 'success');

        // return home
        console.log("calling dispatcher for", this.user);
        this.store.dispatch('auth/saveUser', this.user).then(() => {
          this.$router.push('/home')
        })
        await this.handleClickGetAuthCode()
      } catch (error) {
        //on fail do something
        await this.showToast("Login failed: "+error,  'warning');
        console.error("Error authentication: ", error)
        return null
      }
    },
    async handleClickGetAuthCode() {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const authCode = await this.$gAuth.getAuthCode();
        console.log("authCode", authCode);
      } catch (error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },
    async handleClickSignOut() {
      try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        await this.$gAuth.signOut();
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        console.log("isAuthorized", this.Vue3GoogleOauth.isAuthorized);
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        this.user = "";
      } catch (error) {
        console.error(error);
      }
    },
    handleClickDisconnect() {
      window.location.href = `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${window.location.href}`;
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
      token: "",
      user: "",
    };
  },
})
</script>

