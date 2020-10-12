import {createApp} from 'vue'
import App from './App.vue'
import button from './components/button/button.vue'

const app = createApp(App)

app.component(button.name, button)

app.mount('#app')
