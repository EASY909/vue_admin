import { UserRole } from "@/api/user";
import { defaultRouterMap, asnycRouterMap } from "@/router/router"
const state = {
    allRouters: defaultRouterMap,
    addRouters: []
}
const getters = {

    allRouters: state => state.allRouters,
    addRouters: state => state.addRouters
}

const mutations = {
    SET_ROUTER(state, router) {
        state.addRouters = router;
        state.allRouters = defaultRouterMap.concat(router);
    }
}
const actions = {
    getRoutes(content, resData) {
        return new Promise((resolve, reject) => {
            UserRole().then(res => {
                let role = res.data.data;
             
                // content.commit("SET_ROLES", role.role);
                // console.log(role);
                resolve(role)
            }).catch(error => {
                console.log(error);
            })
        })
    },
    createRouter(content, resData) {

        return new Promise((resolve, reject) => {
            let roles = resData;
            let addRouters = [];
            if (roles.includes("admin")) {
                addRouters = asnycRouterMap;
            } else {
                addRouters = asnycRouterMap.filter(item => {
                    if (roles.includes(item.meta.system)) {
                        return item;
                    }
                })
                addRouters.push(asnycRouterMap[asnycRouterMap.length-1])
           
            }
            content.commit("SET_ROUTER", addRouters);
            resolve()
        })
        // console.log(addRouters);
    }

}
export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}