<template>
  <div
    v-for="listItem in displayList"
    :key="listItem.id"
    style="margin: 8px;"
  >
    <div
      :ref="'header-' + listItem.id"
      class="ion-padding default-header"
      @click="headerClicked(listItem)">
      {{ listItem.title }} {{listItem.org}}
    </div>
    <transition name="fade">
      <div
        :ref="'body-' + listItem.id"
        style="margin-top:8px;display:none; height: 100px;"
        v-show="expandElement(listItem)"
      >
        <slot :item="listItem"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
name: "Accordion",
  // list of data to display
  props: ["list"],
  // data section of component
  data() {
    return {
      displayList: this.list
    };
  },
  methods: {
    /**
     * this function is called to determine if the element
     * should be in the expanded mode or not
     */
    expandElement(listItem) {
      const curE = this.$refs["body-" + listItem.id];
      if (curE === undefined) return false;
      if (curE.dataset.isExpanded === "true") {
        return true;
      } else {
        return false;
      }
    },
    /**
     * this iterates through all of the elements in the list
     * and set data attribute isExpanded appropriately based on
     * this listItem that was clicked
     */
    headerClicked(listItem) {
      this.displayList.map(function(e) {
        const curE = this.$refs["body-" + e.id];
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
      this.displayList = [...this.displayList];
    }
  }
};
</script>

<style  scoped>
.default-header {
  background-color: #8c8c8c;
  margin: 2px;
  text-transform: uppercase;
}
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