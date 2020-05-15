import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import( '../views/Login/index.vue')
    },
    {
      path: '/console',
      name: 'Console',
      redirect:"/consoleIndex",
      component: () => import( '../views/Layout/index.vue'),
      children:[
        {
          path: '/consoleIndex',
          name: 'ConsoleIndex',
          component: () => import( '../views/Console/index.vue')
        },
      ]
    }
  ]
})
