<template>
  <ion-header>
    <ion-title>
      <h1>{{ content.title }}</h1>
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
  </ion-content>

  <ion-fab vertical="bottom" horizontal="end" slot="fixed">
    <ion-fab-button @click="close()" color="light" size="small">
      <ion-icon :icon="arrowDown"></ion-icon>
    </ion-fab-button>
  </ion-fab>
</template>

<script lang="ts">

import {defineComponent} from 'vue';
import {modalController} from "@ionic/vue";
import { 
  arrowDown,
} from 'ionicons/icons';

export default defineComponent({
  name: 'Modal',
  props: {
    title: {type: String, default: 'Super Modal'},
    data: Event
  },
  data() {
    return {
      content: this.data,
    }
  },
  methods: {
    async close() {
      await modalController.dismiss();
    },
  },
  setup() {
    return {
      arrowDown,
    }
  },
});
</script>
