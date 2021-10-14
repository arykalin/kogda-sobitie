declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue3-google-oauth2'

declare global {
  interface Window {
    gapi: any;
  }
}
