<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-label>
      <h1>{{ content.title }}</h1>
      <h3>{{ content.org }}</h3>
      <ion-note>{{ content.date }}</ion-note>
    </ion-label>
    <ion-item>
      <ion-label>
        <ion-note>
          {{ "id: " + content.id }}<br/>
          {{ "место: " + content.where }}<br/>
          {{ "длительность: " + content.duration }}<br/>
          {{ "для кого: " + content.target }}<br/>
          {{ "сколько: " + content.amount }}<br/>
          {{ "ссылка:" + content.link }}
        </ion-note>
      </ion-label>
    </ion-item>
  </ion-content>
  <ion-button @click="close()">Close Modal</ion-button>
</template>

<script lang="ts">
import {IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/vue';
import {defineComponent, ref} from 'vue';
import {modalController} from "@ionic/vue";
import Event from "@/types/Event";

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
  components: {IonContent, IonHeader, IonTitle, IonToolbar}
});
</script>
