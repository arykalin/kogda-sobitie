<template>
  <ion-header>
    <ion-title>
      <h1>{{ title }}</h1>
      <h5>{{ content.date }}</h5>
    </ion-title>
  </ion-header>

  <ion-content class="ion-padding">
    <ion-item>
      <ion-input :v-model=content.title :value=content.title></ion-input>
    </ion-item>

    <ion-item>
      <ion-input :v-model=content.description :value=content.description></ion-input>
    </ion-item>

    <ion-item>
      <ion-input :v-model=content.org :value=content.org></ion-input>
    </ion-item>

    <ion-item>
      <ion-input :v-model=content.where :value=content.where></ion-input>
    </ion-item>

    <ion-item>
      <ion-input :v-model=content.date type="date" :value=content.date></ion-input>
    </ion-item>

    <ion-item>
      <ion-input :v-model=content.duration :value=content.duration></ion-input>
    </ion-item>

    <ion-item>
      <ion-input :v-model=content.target :value=content.target></ion-input>
    </ion-item>

    <ion-item>
      <ion-input :v-model=content.amount  :value=content.amount></ion-input>
    </ion-item>

    <ion-item>
      <ion-input :v-model="content.link" :value=content.link type="url"></ion-input>
    </ion-item>

    <ion-fab vertical="top" horizontal="end" slot="fixed">
      <ion-fab-button @click="close()" color="light" size="small">
        <ion-icon :icon="arrowDown"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </ion-content>
</template>

<script lang="ts">

import {IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/vue';
import {defineComponent} from 'vue';
import {modalController} from "@ionic/vue";
import {
  arrowDown,
} from 'ionicons/icons';

export default defineComponent({
  name: 'EditEvent',
  components: {IonContent, IonHeader, IonTitle, IonToolbar},
  props: {
    title: {type: String, default: 'Super Modal'},
    event: Event
  },
  data() {
    return {
      content: this.event,
    }
  },
  methods: {
    async close() {
      await modalController.dismiss();
    },
    async debugButton() {
      console.debug("modal for item:", this.event);
    }
  },
  setup() {
    return {
      arrowDown,
    }
  },
});
</script>
