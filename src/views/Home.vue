<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title size="large">Колесо года</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-button expand="full" @click="() => getLogs(events)">
        log events list
      </ion-button>
      <ion-button expand="full" @click="() => getAll()">
        get all
      </ion-button>
      <div v-for="listItem in events" :key="listItem.title">>
        <ion-item>{{ listItem.title }}</ion-item>
<!--        <ion-modal-->
<!--            :is-open="isOpenRef"-->
<!--            css-class="my-custom-class"-->
<!--            @didDismiss="setOpen(false)"-->
<!--        >-->
<!--          <Modal :data="listItem"></Modal>-->
<!--        </ion-modal>-->
<!--        <ion-button expand="full" @click="setOpen(true)">{{ listItem.title }}</ion-button>-->
      </div>
<!--     Hide profile and add buttons -->
<!--      <ion-button expand="full" @click="() => router.push('/profile')">-->
<!--        Профиль-->
<!--      </ion-button>-->
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
import {defineComponent, ref} from "vue";
import Accordion from "@/components/Accordion.vue";
import { useRouter } from "vue-router";
import { add, reload } from "ionicons/icons";
import {useStore} from "vuex";
import {showToast} from "@/util/toast";
import Event from "@/types/Event";

export default defineComponent({
  name: "Home",
  components: {
    // Accordion,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
  },
  methods: {
    async getAll() {
      console.debug("getting all")
      await this.store.dispatch('event/updateEvents')
          .then(() => {
            console.debug("setting this.events")
            this.events = this.store.getters['event/events'] as Event[]
            console.debug("this.events now is", this.events)
          })
          .then(() => {
            console.debug("running forceupdate")
            this.$forceUpdate
          })
          .catch((error) => {
            console.error("error loading events", error)
          })
          console.debug("finished data loading")

    },
    async getEvents(): Promise<void> {
      console.debug('getting events in data')
      this.events = this.store.getters['event/events'] as Event[]
    },
    getLogs(events) {
      this.getEvents();
      console.debug("Event list is ", events)
    },
    async refreshEvents() {
      await this.store.dispatch('event/updateEvents')
    },
  },
  data() {
    return {
      events: [] as Event[]
    };
  },

  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.getAll()
    // this.refreshEvents()
    // this.getEvents();
    // this.$forceUpdate
  },
  setup() {
    const store = useStore()
    const isOpenRef = ref(false);
    const setOpen = (state: boolean) => isOpenRef.value = state;
    const data = {content: 'New Content'};
    return {
      router: useRouter(),
      add,
      reload,
      store,
      showToast,
      isExpanded: "",
      isOpenRef, setOpen, data
    };
  },
});
</script>

