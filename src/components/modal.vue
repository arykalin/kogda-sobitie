<template>
  <ion-header>
    <ion-title>
      <h1>{{ title }}</h1>
      <h5>{{ content.date }}</h5>
    </ion-title>
  </ion-header>

  <ion-content class="ion-padding">
    <ion-note>
      {{ "организатор: " + content.org}} <br/>
      {{ "место: " + content.where }}<br/>
      {{ "длительность: " + content.duration }}<br/>
      {{ "для кого: " + content.target }}<br/>
      {{ "сколько: " + content.amount }}<br/>
      {{ "ссылка: " + content.link }}<br/>
      {{}}<br/>
    </ion-note>
    {{ content.description }}
    <ion-fab vertical="top" horizontal="end" slot="fixed">
      <ion-button @click="showData()">Debug</ion-button>
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
    async showData() {
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
