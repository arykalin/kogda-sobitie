<template>
  <ion-button expand="full" @click="() => showAccrodionEvents()">
    Reload accordion
  </ion-button>
  <ion-list>
    <ion-item>
      <h1>Events debug info</h1>
      <!--      <ion-note>-->
      <!--        Events are {{this.events}}-->
      <!--      </ion-note>-->
    </ion-item>
    <ion-item v-for="(event,index) in this.events" :key="index">
      <ion-label class="ion-text-wrap">
        <h1>{{ event.title }}</h1>
        <h3>{{ event.org }}</h3>
        <ion-note>{{ event.date }}</ion-note>
        <ion-button color="warning" slot="end" @click="() => del(event.id)">
          delete
        </ion-button>
      </ion-label>
      <h1>Events debug info end</h1>
    </ion-item>
  </ion-list>
  <div v-for="listItem in this.events" v-bind:key="listItem.id">
    <ion-item @click="headerClicked(listItem)">
      <ion-label class="ion-text-wrap">
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
          :ref="'body-' + events.indexOf(listItem)"
          style="display: none; height: 115px"
          v-show="expandElement(listItem)"
      >
        <ion-item>
          <ion-label>
            <ion-note>
              {{ "id: " + listItem._id }}<br/>
              {{ "место: " + listItem.where }}<br/>
              {{ "длительность: " + listItem.duration }}<br/>
              {{ "для кого: " + listItem.target }}<br/>
              {{ "сколько: " + listItem.amount }}<br/>
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
      store,
    }
  },
  // computed: mapState({
  //   // arrow functions can make the code very succinct!
  //   events: 'event/events',
  // }),
  //
  computed: {
    events() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return this.store.getters['event/events'] as Event[]
    },
  },
  methods: {
    async del(event) {
      console.log("Accordion: deleting event: " + event);
      const response = await deleteEvent(event,).catch((err) => {
        console.log('Accordion: err', err)
      });
      console.log('Accordion: got response', response)
    },
    showAccrodionEvents() {
      console.log("Accordion: computed events are " + this.events);
      this.events.map(event => {
        console.log("Accordion: iterating over event", event.title)
        const newEvent: Event = {
          id: event.id,
          title: event.title,
          description: event.description,
          org: event.org,
          where: event.where,
          date: new Date(event.date),
          duration: event.duration,
          target: event.target,
          amount: event.amount,
          link: event.link,
        };
        console.log("Accordion: made new event: ", newEvent);
      })
      console.log("Accordion: events in state are: ", this.store.getters['event/events']);
      this.$forceUpdate();
    },
    /**
     * this function is called to determine if the element
     * should be in the expanded mode or not
     */
    expandElement(listItem: any): boolean {
      const curE = (this as any).$refs["body-" + (this as any).events.indexOf(listItem)];
      if (curE === undefined) return false;
      return curE.dataset.isExpanded === "true";
    },
    /**
     * this iterates through all of the elements in the list
     * and set data attribute isExpanded appropriately based on
     * this listItem that was clicked
     */
    headerClicked(listItem: any): any {
      (this as any).events.map((e: any) => {
        const curE = (this as any).$refs["body-" + (this as any).events.indexOf(e)];
        if (e === listItem) {
          if (curE.dataset.isExpanded === "true") {
            curE.setAttribute("data-is-expanded", false);
          } else {
            curE.setAttribute("data-is-expanded", true);
          }
        } else {
          curE.setAttribute("data-is-expanded", false);
        }
      }, this);
      (this as any).events = [...(this as any).events];
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
