<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>События</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-item>
        <ion-label>
          <h1>IsInit: {{ Vue3GoogleOauth.isInit }}</h1>
          <h1>IsAuthorized: {{ Vue3GoogleOauth.isAuthorized }}</h1>
          <h2 v-if="user">signed user: {{ user }}</h2>
        </ion-label>
        <ion-button
            @click="handleClickSignIn"
            :disabled="
                !Vue3GoogleOauth.isInit || Vue3GoogleOauth.isAuthorized
              "
            class="w-full"
            color="red"
        >Login with google
        </ion-button>
      </ion-item>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {defineComponent, inject} from 'vue'
import {useStore} from 'vuex'

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
        this.store.dispatch('auth/googleAuth', idToken).then(() => {
          this.$router.push('/profile')
        })
      } catch (error) {
        //on fail do something
        console.error(error)
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

  },
  setup() {
    const store = useStore()
    const Vue3GoogleOauth = inject('Vue3GoogleOauth')
    return {
      Vue3GoogleOauth,
      store,
    }
  },
})
</script>

<style></style>
