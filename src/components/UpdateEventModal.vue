<template>
  <ion-header>
    <ion-title>
      <h1>{{ title }}</h1>
      <h5>{{ content.date }}</h5>
    </ion-title>
  </ion-header>

  <ion-content class="ion-padding">
    <ion-item>
      <ion-label color="secondary">Название:</ion-label>
      <ion-input :v-model=content.title :value=content.title></ion-input>
    </ion-item>

    <ion-item>
      <ion-label color="secondary">Комментарий:</ion-label>
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
      <ion-input :v-model=content.amount :value=content.amount></ion-input>
    </ion-item>

    <ion-item>
      <ion-input :v-model="content.link" :value=content.link type="url"></ion-input>
    </ion-item>

    <ion-button @click="debugButton()"
                expand="block"
                fill="outline"
                color="medium">
      Debug log
    </ion-button>
    <ion-button
        @click="postEvent()"
        expand="block"
        fill="outline"
        color="medium"
    >Сохранить
    </ion-button>
    <ion-fab vertical="top" horizontal="end" slot="fixed">
      <ion-fab-button @click="close()" color="light" size="small">
        <ion-icon :icon="arrowDown"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </ion-content>
</template>

<script lang="ts">

import {IonContent, IonLabel, IonHeader, IonTitle, toastController} from '@ionic/vue';
import Event from "@/types/Event";
import {defineComponent} from 'vue';
import {modalController} from "@ionic/vue";
import {
  arrowDown,
} from 'ionicons/icons';
import {putEvent} from "@/api/putEvent";

export default defineComponent({
  name: 'UpdateEvent',
  components: {IonContent, IonHeader, IonLabel, IonTitle},
  props: {
    title: {type: String, default: 'Super Modal'},
    event: Event
  },
  data() {
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      content: this.event as Event,
    }
  },
  methods: {
    async close() {
      await modalController.dismiss();
    },
    async debugButton() {
      console.debug("modal for item:", this.content);
    },
    postEvent() {

      console.debug('constructed event: ' + this.content)
      putEvent("", this.content)
          .then(function (response) {
            console.debug(response.data);
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            this.showToast("Событие обновлено");
          })
          .catch(function (error) {
            console.debug(error);
          });
    },
    async showToast(message) {
      const toast = await toastController
          .create({
            message: message,
            duration: 1500,
            color: "light",
          })
      return toast.present();
    },
  },
  setup() {
    return {
      arrowDown,
    }
  },
});
</script>
