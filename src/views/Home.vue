<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title size="large" color="dark">Колесо года</ion-title>

        <ion-select 
          :interface-options="customPopoverOptions" 
          interface="popover" 
          placeholder="фильтровать" 
          slot="end" 
          multiple="true" 
          v-model=filter
          @ionChange="updateFilter()"
          >
          <!-- <ion-select-option value="noFilter">все события</ion-select-option> -->
          <ion-select-option value="upToDate">актуальные события</ion-select-option>
          <!-- <ion-select-option value="past">прошедшие события</ion-select-option>
          <ion-select-option value="oneTime">разовые события</ion-select-option> -->
          <ion-select-option value="period">периодические события</ion-select-option>
        </ion-select>

        <ion-select 
          :interface-options="customPopoverOptions" 
          interface="popover" 
          placeholder="сортировать" 
          slot="end" 
          v-model=sort 
          @ionChange="updateSort()"
          >
          <ion-select-option value="asc">по возрастанию</ion-select-option>
          <ion-select-option value="desc">по убыванию</ion-select-option>
        </ion-select>

      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <accordion :filter="this.filter" :sort="this.sort"></accordion>
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
import moment from 'moment';
import Event from "@/types/Event";

export default defineComponent({
  name: "Home",
  data() {
    return {
      filter: "upToDate",
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
  },
  methods: {
    updateSort: function () {
      console.log(this.filter);
    },
    updateFilter: function () {
      console.log(this.filter);
    }
  }
});
</script>

