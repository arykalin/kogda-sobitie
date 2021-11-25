<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    {{ content }}
  </ion-content>
  <ion-button>Close Modal</ion-button>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/vue';
import {defineComponent, ref} from 'vue';
import {useStore} from "vuex";

export default defineComponent({
  name: 'Modal',
  props: {
    title: { type: String, default: 'Super Modal' },
  },
  data() {
    return {
      content: 'Content',
    }
  },

  components: { IonContent, IonHeader, IonTitle, IonToolbar }
});
</script>
