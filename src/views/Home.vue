<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title size="large" color="dark">Колесо года</ion-title>

        <ion-button expand="block" fill="solid" slot="start" @click="() => router.push('/profile')">
          Профиль
        </ion-button>

        <ion-select
          :interface-options="customPopoverOptions"
          interface="popover"
          placeholder="фильтровать"
          slot="end"
          value="upToDate"
          v-model=filter
          >
          <ion-select-option value="all">все события</ion-select-option>
          <ion-select-option value="upToDate">актуальные события</ion-select-option>
          <ion-select-option value="past">прошедшие события</ion-select-option>
        </ion-select>

        <ion-select
          :interface-options="customPopoverOptions"
          interface="popover"
          placeholder="сортировать"
          slot="end"
          value="asc"
          v-model=sort
          >
          <ion-select-option value="asc">по возрастанию даты</ion-select-option>
          <ion-select-option value="desc">по убыванию даты</ion-select-option>
        </ion-select>

      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <accordion :filter_type="this.filter" :sort_type="this.sort"></accordion>
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
} from "@ionic/vue";
import {defineComponent} from "vue";
import Accordion from "@/components/Accordion.vue";
import { useRouter } from "vue-router";
import { add, reload } from "ionicons/icons";
import {
  IonSelect,
  IonSelectOption
} from '@ionic/vue';

export default defineComponent({
  name: "Home",
  data() {
    return {
      filter: ["upToDate"],
      sort: "asc"
    };
  },
  components: {
    Accordion,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonSelect,
    IonSelectOption,
  },
  setup() {
    const customPopoverOptions: any = {

    };
    return {
      router: useRouter(),
      add,
      reload,
      customPopoverOptions,
    };
  }
});
</script>

