import { createApp } from 'vue'
import 'normalize.css'
import App from './App.vue'
import button from './components/button/button.vue'
import card from './components/card/card.vue'
import tag from './components/tag/tag.vue'
import list from './components/list/list.vue'
import listItem from './components/list/list-item/list-item.vue'

const app = createApp(App)

app.component(button.name, button)
app.component(card.name, card)
app.component(tag.name, tag)
app.component(list.name, list)
app.component(listItem.name, listItem)

app.mount('#app')
