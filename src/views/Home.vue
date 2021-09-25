<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <accordion :list="list">
        <template v-slot="sp">
          <ion-item>{{ sp.item.id }} {{ sp.item.name }}</ion-item>
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
  { id: 1, name: "a"},
  { id: 2, name: "b"},
  { id: 3, name: "c"},
  { id: 4, name: "d"}
  ]
  };
  },
  methods: {}
  });
</script>

<style scoped="">

</style>