<template>
  <ion-button expand="full" @click="() => getLogs(events)">
    get accordion logs
  </ion-button>
  <div v-for="listItem in events" :key="listItem.title">
    <ion-item @click="headerClicked(listItem.id)" >
      <ion-label>
        <h1>{{ listItem.title }}</h1>
        <h3>{{ listItem.org }}</h3>
        <ion-note>{{ listItem.date }}</ion-note>
        <ion-button color="warning" slot="end" @click="() => del(listItem.id)">
          delete
        </ion-button>
      </ion-label>
    </ion-item>
    <transition name="fade">
      <div
        style="display: none; height: 115px"
        v-show="expandElement(listItem.id)"
      >
        <ion-item>
          <ion-label>
            <ion-note>
              {{ "id: " + listItem.id}}<br />
              {{ "место: " + listItem.where }}<br />
              {{ "длительность: " + listItem.duration }}<br />
              {{ "для кого: " + listItem.target }}<br />
              {{ "сколько: " + listItem.amount }}<br />
              {{ "ссылка:" + listItem.link }}
            </ion-note>
          </ion-label>
        </ion-item>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {deleteEvent} from "@/api/deleteEvent";
import {useStore} from "vuex";
import {defineComponent} from "vue";
import Event from "@/types/Event";

export default defineComponent({
  name: "Accordion",
  setup() {
    const store = useStore()
    return {
      isExpanded: "",
      store,
    };
  },
  computed: {
    events() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return this.store.getters['event/events'] as Event[]
    },
  },
  methods: {
    getLogs(list) {
      console.log("Accordion: list is ", list)
    },
    async del(event) {
      console.log("Accordion: deleting event: " + event);
      const response = await deleteEvent(event,).catch((err) => {
        console.log('Accordion: err', err)
      });
      console.log('Accordion: got response', response)
    },
    expandElement(elemID: string): boolean {
      return (this as any).isExpanded === elemID;

    },
    headerClicked(id: string): void {
      if ((this as any).isExpanded === id) {
        (this as any).isExpanded = ""
      } else {
        (this as any).isExpanded = id
      }
    },
  },
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: height 0.3s ease-in-out;
  overflow: hidden;
}

.fade-enter-from,
.fade-leave-to {
  height: 0px !important;
}
</style>
