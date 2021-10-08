<template>
  <div class="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
          class="mx-auto h-12 w-auto"
          src="@/assets/images/logo.svg"
          alt="Workflow"
      />
      <h2 class="mt-6 mb-6 text-center text-3xl font-bold text-gray-900">
        Войдите в свой аккаунт
      </h2>
    </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div>
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">
                Войдите с помощью
              </span>
            </div>
          </div>

          <div class="mt-6">
            <base-button
                @click="handleClickSignIn"
                :disabled="
                !Vue3GoogleOauth.isInit || Vue3GoogleOauth.isAuthorized
              "
                class="w-full"
                color="red"
            >google</base-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineComponent, inject } from 'vue'
import { useStore } from 'vuex'
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
        const { id_token: idToken } = googleUser.getAuthResponse()
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
