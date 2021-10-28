<template>
  <div v-for="listItem in displayList" :key="listItem.title">
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
import {getEvents} from "@/api/getEvents";

export default {
  name: "Accordion",
  // list of data to display
  props: ["list"],
  // data section of component
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    setInterval(() => {
      console.log("displayList is " + (this as any).displayList);
      console.log("list is " + (this as any).list);
      (this as any).displayList = (this as any).list
    }, 3000)
  },
  data(): any {
    return {
      isExpanded: "",
      displayList: (this as any).list,
    };
  },
  methods: {
    async del(event) {
      console.log("deleting event: " + event);
      const response = await deleteEvent(event,).catch((err) => {
        console.log('err', err)
      });
      console.log('got response', response)
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
};
</script>

<style  scoped>
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
