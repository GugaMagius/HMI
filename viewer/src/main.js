import {createApp} from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import SocketIO from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';



import 'primevue/resources/themes/saga-blue/theme.css'; //theme
//import 'primevue/resources/themes/vela-blue/theme.css';
import 'primevue/resources/primevue.min.css'; //core css
import 'primeicons/primeicons.css';  //icons

import 'primeflex/primeflex.css';

import Chart from 'primevue/chart';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Panel from 'primevue/panel';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Knob from 'primevue/knob';
import Slider from 'primevue/slider';
import Badge from 'primevue/badge';
import InputNumber from 'primevue/inputnumber'
import InputMask from 'primevue/inputmask'

const SocketInstance  = {
    debug: true,
    connection: SocketIO('http://localhost:3006')  //('http://192.168.1.114:3001') //colocar IP do servidor se o viewer não rodar no mesmo pc
  }

const app = createApp(App).use(new VueSocketIO(SocketInstance));

app.use(PrimeVue);

app.component('Chart', Chart);
app.component('Button', Button);
app.component('Card', Card);
app.component('Panel', Panel);
app.component('Splitter', Splitter);
app.component('SplitterPanel', SplitterPanel);
app.component('Knob', Knob);
app.component('Slider', Slider);
app.component('Badge', Badge);
app.component('InputNumber', InputNumber);
app.component('InputMask', InputMask);

app.mount('#app');
