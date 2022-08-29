import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyCSyInhTPwqloOTwvw3TO3P21xD_VqZY2Q',
  authDomain: 'daily-news-792f2.firebaseapp.com',
  projectId: 'daily-news-792f2',
  storageBucket: 'daily-news-792f2.appspot.com',
  messagingSenderId: '269795889366',
  appId: '1:269795889366:web:75404fc86275cbde683977'
}

initializeApp(firebaseConfig)

createApp(App).use(store).use(router).mount('#app')
