import router from "./router";
import { getToken, removeToken, removeUserName } from "@/utils/app.js"
import store from '@/store/index.js'

const whiteRouter = ['/login'];
/**
 * 路由守卫
 */
router.beforeEach((to, from, next) => {
    //to and from are Route Object,next() must be called to resolve the hook}
    // console.log(to)
    if (getToken()) {

        if (to.path === "/login") {
            removeToken();
            removeUserName();
            store.commit('login/REMOVE_TOKEN')
            store.commit('login/REMOVE_USERNAME')
            next()
        } else {
            next()
        }

        console.log("token");
    } else {
        console.log("notoken");
        if (whiteRouter.indexOf(to.path) !== -1) {
            next();
        } else {
            next("/login")
        }
    }
})   