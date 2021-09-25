<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>События</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <accordion :list="list">
        <template v-slot="sp">
          <ion-item>
            <ion-badge color="success" slot="end">24 сентября</ion-badge>
            {{ sp.item.id }} {{ sp.item.title }}
          </ion-item>
        </template>
      </accordion>
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
  import Accordion from "./components/Accordion.vue";

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
  data() {
  return {
  list: [
  { id: 1, title: "Танго", org: "???"},
  { id: 2, title: "Киноклуб", org: "Затворник"},
  { id: 3, title: "Чтения", org: "Татка"},
  { id: 4, title: "smth else", org: "smb else"}
  ]
  };
  },
  methods: {}
  });
</script>

<style scoped="">

</style>