import {createApp} from 'vue'
import App from './App.vue'
// import {store} from '@/store';
import router from './router';

import {IonicVue} from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

// Google login
import gAuthPlugin from 'vue3-google-oauth2';
const gauthClientId = "634894223473-3tgmno07c1tp5cucn12m5cffug6dib95.apps.googleusercontent.com";


const app = createApp(App)
    .use(IonicVue)
    .use(router)
    // .use(store)
    // eslint-disable-next-line @typescript-eslint/camelcase
    .use(gAuthPlugin, { clientId: gauthClientId, scope: 'email', prompt: 'consent', fetch_basic_profile: false });

router.isReady().then(() => {
    app.mount('#app');
});

// icons
import {addIcons} from 'ionicons';
import {heart} from 'ionicons/icons';

addIcons({
    'heart': heart
});
