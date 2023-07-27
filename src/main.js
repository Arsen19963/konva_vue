import { createApp } from "vue";
import App from "./App.vue";
import VueKonva from "vue-konva";

import "@imengyu/vue3-context-menu/lib/vue3-context-menu.css";
import ContextMenu from "@imengyu/vue3-context-menu";

const app = createApp(App);
app.use(VueKonva, ContextMenu);
app.mount("#app");

