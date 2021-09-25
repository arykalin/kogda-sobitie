<template>
  <main-layout pageTitle="Todos">
    <h4>Todos List</h4>
    <ion-button expand="full" @click="showtodos()">show Todos</ion-button>
    <ion-list>
      <ion-item v-for="todo in myTodos" :key="todo.id">{{
        todo.title
      }}</ion-item>
    </ion-list>
  </main-layout>
</template>