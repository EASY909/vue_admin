import { router, resetRouter } from "./router";
import { getToken, removeToken, removeUserName } from "@/utils/app.js"
import store from '@/store/index.js'
const whiteRouter = ['/login'];
/**
 * 路由守卫
 */
router.beforeEach((to, from, next) => {
    //to and from are Route Object,next() must be called to resolve the hook}
    // console.log(to)
    // console.log(getToken());
    if (getToken()) {

        if (to.path === "/login") {
            removeToken();
            removeUserName();
            store.commit('login/REMOVE_TOKEN')
            store.commit('login/REMOVE_USERNAME')
            next()
        } else {

            if (store.getters["login/roles"].length === 0) {

                store.dispatch('permission/getRoutes').then(res => {

                    let role = res.role;
                    let button = res.button;

                    store.commit("login/SET_ROLES", role);
                    store.commit("login/SET_BUTTON", button);
                    store.dispatch('permission/createRouter', role).then(res => {

                        let addRouters = store.getters["permission/addRouters"];
                        let allRouters = store.getters["permission/allRouters"];


                        router.options.routes = allRouters;
                        // resetRouter();
                        router.addRoutes(addRouters);
                        next({ ...to, replace: true })
                        // next()
                    })

                    // next({...to, replace: true})
                })
            } else {
                next()
            }
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