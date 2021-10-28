<template>
  <ion-button expand="full" @click="() => reloadAccordion()">
    Reload accordion
  </ion-button>
  <div v-for="listItem in displayList" :key="listItem.title">
    <ion-item @click="headerClicked(listItem)" >
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
    reloadAccordion() {
      console.log("displayList is " + (this as any).displayList);
      console.log("list is " + (this as any).list);
      (this as any).displayList = (this as any).list
    },
    /**
     * this function is called to determine if the element
     * should be in the expanded mode or not
     */
    expandElement(elemID: string): boolean {
      // console.log("Accordion expandElement: expading element of list", listItem)
      // console.log("Accordion expandElement: expading element from displayList", (this as any).displayList)
      // console.log("Accordion expandElement: expading element from refs", (this as any).$refs)
      // const curE = (this as any).$refs["body-" + (this as any).displayList.indexOf(listItem)];
      // console.log("Accordion expandElement: expading element", curE)
      // if (curE === undefined) return false;
      // return curE.dataset.isExpanded === "true";
      return (this as any).isExpanded === elemID;

    },
    /**
     * this iterates through all of the elements in the list
     * and set data attribute isExpanded appropriately based on
     * this listItem that was clicked
     */
    headerClicked(id: string): void {
      (this as any).isExpanded = id
      // (this as any).displayList.map((e: any) => {
      //   const curE = (this as any).$refs["body-" + (this as any).displayList.indexOf(e)];
      //   if (e === listItem) {
      //     if (curE.dataset.isExpanded === "true") {
      //       curE.setAttribute("data-is-expanded", false);
      //     } else {
      //       curE.setAttribute("data-is-expanded", true);
      //     }
      //   } else {
      //     curE.setAttribute("data-is-expanded", false);
      //   }
      // }, this);
      // (this as any).displayList = [...(this as any).displayList];
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
