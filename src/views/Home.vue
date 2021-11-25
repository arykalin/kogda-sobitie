<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title size="large">Колесо года</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
<!--      <ion-button expand="full" @click="() => router.push('/profile')">-->
<!--        Профиль-->
<!--      </ion-button>-->
      <accordion :list="list"></accordion>

<!--      <ion-fab vertical="bottom" horizontal="end" slot="fixed">-->
<!--        <ion-fab-button @click="() => router.push('/new')">-->
<!--          <ion-icon :icon="add"></ion-icon>-->
<!--        </ion-fab-button>-->
<!--      </ion-fab>-->
      <ion-fab vertical="bottom" horizontal="start" slot="fixed">
        <ion-fab-button @click="refreshEvents()">
          <ion-icon :icon="reload"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent } from "vue";
import Accordion from "@/components/Accordion.vue";
import { useRouter } from "vue-router";
import { add, reload } from "ionicons/icons";
import { getEvents } from "@/api/getEvents";
import Event from "@/types/Event";
import {useStore} from "vuex";
import {showToast} from "@/util/toast";

export default defineComponent({
  name: "Home",
  components: {
    Accordion,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  methods: {
    refreshEvents() {
      this.store.dispatch('event/updateEvents')
    },
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.refreshEvents();
  },
  data() {
    return {
      events: [] as Event[],
      list: [] as Event[],
    };
  },
  setup() {
    const store = useStore()
    return {
      router: useRouter(),
      add,
      reload,
      store,
      showToast,
    };
  },
});
</script>

