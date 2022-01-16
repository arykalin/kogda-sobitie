<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
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
        <ion-input v-model="title" placeholder="Название"></ion-input>
      </ion-item>

      <ion-item>
        <ion-input v-model="description" placeholder="Описание"></ion-input>
      </ion-item>

      <ion-item>
        <ion-input v-model="org" placeholder="Ведущий"></ion-input>
      </ion-item>

      <ion-item>
        <ion-input v-model="where" placeholder="Место проведения"></ion-input>
      </ion-item>

      <ion-item>
        <ion-input v-model="date" type="date"></ion-input>
      </ion-item>

      <ion-item>
        <ion-input v-model="duration" placeholder="Длительность"></ion-input>
      </ion-item>

      <ion-item>
        <ion-input v-model="target" placeholder="Для кого"></ion-input>
      </ion-item>

      <ion-item>
        <ion-input v-model="amount" placeholder="Сколько людей" ></ion-input>
      </ion-item>

      <ion-item>
        <ion-input v-model="link" placeholder="Ссылка" type="url"></ion-input>
      </ion-item>

      <ion-button
          @click="postEvent()"
          expand="block"
          fill="outline"
          color="medium"
      >Сохранить
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  toastController,
} from "@ionic/vue";
import {defineComponent} from "vue";
import {useRouter} from "vue-router";
import {postEvent} from "@/api/postEvent";
import {useStore} from "vuex";
import Event from "@/types/Event";

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
  computed: {
    user() {
      return this.store.getters['auth/user']
    },
  },
  data() {
    return {
      title: "",
      description: "",
      org: "",
      where: "",
      date: "",
      duration: "",
      target: "",
      amount: "",
      link: "",
    };
  },
  setup() {
    return {
      store: useStore(),
      router: useRouter(),
    };
  },
  methods: {
    postEvent() {
      if (this.title === '') {
        this.showToast("Необходимо заполнить поле 'Название'");
        return;
      }
      if (this.description === '') {
        this.showToast("Необходимо заполнить поле 'Описание'");
        return;
      }
      if (this.org === '') {
        this.showToast("Необходимо заполнить поле 'Ведущий'");
        return;
      }
      if (this.date === '') {
        this.showToast("Необходимо указать дату проведения");
        return;
      }

      const newEvent: Event = {
        date: this.date,
        title: this.title,
        duration: this.duration,
        link: this.link,
        org: this.user.mail,
        target: this.target,
        where: this.where,
        description: this.description,
        amount: this.amount,
      }

      console.debug('constructed event: ' + newEvent.description)
      postEvent(newEvent)
          .then(function (response) {
            console.debug(response.data);
            this.showToast("Событие создано");
          })
          .catch(function (error) {
            console.debug(error);
          });

      this.title = "";
      this.description = "";
      this.org = "";
      this.where = "";
      this.date = "";
      this.duration = "";
      this.target = "";
      this.amount = "";
      this.link = "";

      return this.router.push("/home");
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
});
</script>
