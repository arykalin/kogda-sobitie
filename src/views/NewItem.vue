<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/home"></ion-back-button>
        </ion-buttons>
        <ion-title>Создать событие</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content ref="content">
      <ion-item>
        <ion-input
          v-model="title"
          placeholder="Название события"
          required="true"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-textarea
          v-model="description"
          placeholder="Описание"
        ></ion-textarea>
      </ion-item>

      <ion-item>
        <ion-input v-model="org" placeholder="Ведущий"></ion-input>
      </ion-item>

      <ion-item>
        <ion-input v-model="place" placeholder="Место проведения"></ion-input>
      </ion-item>

      <ion-item>
        <ion-input
          v-model="date"
          placeholder="Дата проведения"
          type="date"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-input v-model="duration" placeholder="Длительность"></ion-input>
      </ion-item>

      <ion-item>
        <ion-input v-model="target" placeholder="Для кого"></ion-input>
      </ion-item>

      <ion-item>
        <ion-input
          v-model="amount"
          placeholder="Сколько людей"
          type="number"
        ></ion-input>
      </ion-item>

      <ion-item>
        <ion-input v-model="link" placeholder="Ссылка" type="url"></ion-input>
      </ion-item>

      <ion-button
        @click="
          eventCreated(
            title,
            description,
            org,
            place,
            date,
            duration,
            target,
            amount,
            link
          )
        "
        expand="block"
        fill="outline"
        color="medium"
        >Сохранить</ion-button
      >
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import axios from 'axios';

export default defineComponent({
  name: "NewItem",
  components: {
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  methods: {
    eventCreated(
      title,
      description,
      org,
      place,
      date,
      duration,
      target,
      amount,
      link
    ) {
      const data = JSON.stringify({
        "date": date,
        "title": title,
        "duration": duration,
        "link": link,
        "who_manages": org,
        "for_whom": target,
        "where": place,
        "description": description,
        "wanting_people": amount
      });

      const config = {
        method: "post",
        url: "http://localhost:8080/event",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
});
</script>
