<template>
  <ion-header>
    <ion-title>
      <h1>{{ title }}</h1>
      <h5>{{ date }}</h5>
    </ion-title>
  </ion-header>

  <ion-content class="ion-padding">
    <ion-item>
      <ion-label color="secondary">Название:</ion-label>
      <ion-input v-model="title" :value=title></ion-input>
    </ion-item>

    <ion-item>
      <ion-label color="secondary">Комментарий:</ion-label>
      <ion-input v-model="description" :value=description></ion-input>
    </ion-item>

    <ion-item>
      <ion-label color="secondary">Организатор:</ion-label>
      <ion-input v-model=org :value=org></ion-input>
    </ion-item>

    <ion-item>
      <ion-label color="secondary">Местоположение:</ion-label>
      <ion-input v-model=where :value=where></ion-input>
    </ion-item>

    <ion-item>
      <ion-label color="secondary">Дата: {{ date }}</ion-label>
<!--      <ion-input v-model=date type="date"></ion-input>-->
    </ion-item>

<!--    <ion-item>-->
<!--      <ion-datetime :value=date></ion-datetime>-->
<!--    </ion-item>-->

    <ion-item>
      <ion-label color="secondary">Продолжительность:</ion-label>
      <ion-input v-model=duration :value=duration></ion-input>
    </ion-item>

    <ion-item>
      <ion-label color="secondary">Для кого:</ion-label>
      <ion-input v-model=target :value=target></ion-input>
    </ion-item>

    <ion-item>
      <ion-label color="secondary">Сколько людей:</ion-label>
      <ion-input v-model=amount :value=amount></ion-input>
    </ion-item>

    <ion-item>
      <ion-label color="secondary">Ссылка:</ion-label>
      <ion-input v-model="link" :value=link type="url"></ion-input>
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

import {
  IonContent,
  IonLabel,
  IonHeader,
  IonTitle,
  IonInput,
  IonItem,
  IonButton,
  IonDatetime,
  toastController} from '@ionic/vue';
import Event from "@/types/Event";
import {defineComponent} from 'vue';
import {modalController} from "@ionic/vue";
import {
  arrowDown,
} from 'ionicons/icons';
import {putEvent} from "@/api/putEvent";
import event from "@/store/modules/event";
import moment from "moment";
import { format, parseISO } from 'date-fns';

export default defineComponent({
  name: 'UpdateEvent',
  components: {IonContent, IonHeader, IonLabel, IonInput, IonItem, IonButton, IonDatetime, IonTitle},
  props: {
    event: Event
  },
  data() {
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      id: this.event.id,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      title: this.event.title,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      // date: this.stringToDateDMY(this.event.date),
      date: this.event.date,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      duration: this.event.duration,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      link: this.event.link,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      org: this.event.org as string,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      target: this.event.target as string,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      where: this.event.where,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      description: this.event.description,
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      amount: this.event.amount,
    }
  },
  methods: {
    stringToDateDMY: function (date) {
      console.debug("string to date from:", date)
      return moment(date, "DD-MM-YYYY").format("DD-MM-YYYY");
    },
    async close() {
      await modalController.dismiss();
    },
    async debugButton() {
      const newEvent: Event = {
        id:  this.id,
        date: this.date,
        title: this.title,
        duration: this.duration,
        link: this.link,
        org: this.org,
        target: this.target,
        where: this.where,
        description: this.description,
        amount: this.amount,
      }
      console.debug("updated event is:", newEvent)
    },
    postEvent() {
      const newEvent: Event = {
        id:  this.id,
        date: this.date,
        title: this.title,
        duration: this.duration,
        link: this.link,
        org: this.org,
        target: this.target,
        where: this.where,
        description: this.description,
        amount: this.amount,
      }
      console.debug('constructed event: ' + newEvent)
      putEvent(this.id, newEvent)
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
