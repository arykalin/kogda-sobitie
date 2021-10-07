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
        <ion-input
          v-model="description"
          placeholder="Описание"
        ></ion-input>
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
        @click="postEvent()"
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
  IonInput,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

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
    IonInput,
  },
  data(){
    return{
      title: '',
      description: '',
      org: '',
      place: '',
      date: '',
      duration: '',
      target: '',
      amount: '',
      link: ''
    }
  },
  setup() {
    return {
      router: useRouter(),
    };
  },
  methods: {
    postEvent() {
      const data = {
        date: this.date,
        title: this.title,
        duration: this.duration,
        link: this.link,
        'who_manages': this.org,
        'for_whom': this.target,
        where: this.place,
        description: this.description,
        'wanting_people': this.amount,
      };
      const config = {
        method: "post",
        url: "http://95.216.158.138:80/event",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

      this.title = '';
      this.description = '';
      this.org = '';
      this.place = '';
      this.date = '';
      this.duration = '';
      this.target = '';
      this.amount = '';
      this.link = '';

      return this.router.push('/home');
    },
  },
});
</script>