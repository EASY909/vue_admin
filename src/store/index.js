import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import login from "./modules/login";
import permission from "./modules/permission"
export default new Vuex.Store({
    strict: true,
    modules:{
        login,
        permission
    }
})