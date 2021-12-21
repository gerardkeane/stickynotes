import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { MdDeleteforever } from "oh-vue-icons/icons";

addIcons(MdDeleteforever);

const app = createApp(App);

app.component("v-icon", OhVueIcon);
app.mount("#app");
