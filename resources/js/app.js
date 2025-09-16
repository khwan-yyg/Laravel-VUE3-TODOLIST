import { createApp } from "vue";

import "./bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import Main from "./components/employee/Main.vue";

library.add(faTrashAlt, faUserEdit);
const app = createApp({});

app.use(Toast);

app.component("font-awesome-icon", FontAwesomeIcon);

app.component("employee-main", Main);

app.mount("#app");
