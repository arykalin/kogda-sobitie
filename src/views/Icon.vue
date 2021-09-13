<template>
  <ion-page>
    <ion-content>
      <ion-icon :ios="logoApple" :md="logoAndroid"></ion-icon>
    </ion-content>
  </ion-page>
</template>

<script>
import { logoAndroid, logoApple } from 'ionicons/icons';
import {
  IonContent,
  IonPage,
} from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Icon',
  components: {
    IonContent,
    IonPage,
  },
  setup() {
    return { logoAndroid, logoApple }
  }
});
</script>