<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>События</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-list>
        <!-- That thing -->
        
        <ion-item button="" @click="buttonClick()" detail="" expand="full">
          <ion-label>
            Button Item with Detail Arrow
          </ion-label>
        </ion-item>       


        <ion-item button="" @click="buttonClick()" detail="">
          <ion-label>
            Button Item with Detail Arrow
          </ion-label>
        </ion-item>

        <ion-item detail="false" href="https://www.ionicframework.com">
          <ion-label>
            Anchor Item with no Detail Arrow
          </ion-label>
        </ion-item>
        
        <ion-item button="" @click="buttonClick()">
          <ion-label>
            <h1>Чтения про всякое разное</h1>
            <h2>Татка</h2>
            <ion-note>На среднем</ion-note>
          </ion-label>
          <!-- <ion-icon icon="heart"></ion-icon> -->
          <ion-badge color="success" slot="end">24 сентября</ion-badge>
        </ion-item>
        <ion-item>
          <ion-label>
            <h1>Игра в 30ке</h1>
            <ion-note>На среднем</ion-note>
          </ion-label>
          <!-- <ion-icon icon="heart"></ion-icon> -->
          <ion-badge color="success" slot="end">25 сентября</ion-badge>
        </ion-item>
        <ion-item>
          <ion-label>
            <h1>Игра в 30ке</h1>
            <ion-note>На среднем</ion-note>
          </ion-label>
          <!-- <ion-icon icon="heart"></ion-icon> -->
          <ion-badge color="success" slot="end">25 сентября</ion-badge>
        </ion-item>
        <ion-item>
          <ion-label>
            <h1>Игра в 30ке</h1>
            <ion-note>На среднем</ion-note>
          </ion-label>
          <!-- <ion-icon icon="heart"></ion-icon> -->
          <ion-badge color="success" slot="end">25 сентября</ion-badge>
        </ion-item>
        <ion-item>
          <ion-label>
            <h1>Игра в 30ке</h1>
            <ion-note>На среднем</ion-note>
          </ion-label>
          <!-- <ion-icon icon="heart"></ion-icon> -->
          <ion-badge color="success" slot="end">25 сентября</ion-badge>
        </ion-item>
        <ion-item>
          <ion-label>
            <h1>Игра в 30ке</h1>
            <ion-note>На среднем</ion-note>
          </ion-label>
          <!-- <ion-icon icon="heart"></ion-icon> -->
          <ion-badge color="success" slot="end">25 сентября</ion-badge>
        </ion-item>
        <ion-item>
          <ion-label>
            <h1>Игра в 30ке</h1>
            <ion-note>На среднем</ion-note>
          </ion-label>
          <!-- <ion-icon icon="heart"></ion-icon> -->
          <ion-badge color="success" slot="end">25 сентября</ion-badge>
        </ion-item>
      </ion-list>

      <ion-grid>
        <ion-row>
          <ion-col>
            <div>Что</div>
          </ion-col>
          <ion-col>
            <div>Где</div>
          </ion-col>
          <ion-col>
            <div>Когда</div>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <div>Чтения</div>
          </ion-col>
          <ion-col>
            <div>На среднем</div>
          </ion-col>
          <ion-col>
            <div>24 сентября</div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="() => router.push('/new')">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>

      <!-- <div id="container">
        <strong>Ready to create an app?</strong>
        <p>
          Start with Ionic
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://ionicframework.com/docs/components"
            >UI Components</a
          >
        </p>
      </div> -->
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCheckbox,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonList,
  IonLabel,
  IonRadio,
  IonToggle,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { add } from "ionicons/icons";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonFab,
    IonFabButton,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonList,
    IonLabel,
  },
  setup() {
    return {
      router: useRouter(),
      add,
    };
  },
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>