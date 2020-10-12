import {createApp} from 'vue'
import 'normalize.css'
import App from './App.vue'
import button from './components/button/button.vue'
import card from './components/card/card.vue'

const app = createApp(App)

app.component(button.name, button)
app.component(card.name, card)

app.mount('#app')
