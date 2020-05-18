import Vue from 'vue'
import Router from 'vue-router'
import Layout from "@/views/Layout/index.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'login',
      hidden: true,
      meta: {
        name: "主页"
      }
    },
    {
      path: '/login',
      name: 'Login',
      hidden: true,
      meta: {
        name: "登陆"
      },
      component: () => import('../views/Login/index.vue')
    },
    {
      path: '/console',
      name: 'Console',
      redirect: "/consoleIndex",
      hidden: false,
      meta: {
        name: "控制台",
        icon: "console"
      },
      component: Layout,
      children: [
        {
          path: '/consoleIndex',
          name: 'ConsoleIndex',
          hidden: false,
          meta: {
            name: "主页"
          },
          component: () => import('../views/Console/index.vue')
        },
      ]
    },
    {
      path: '/info',
      name: 'Info',
      redirect: "/infolist",
      hidden: false,
      meta: {
        name: "信息管理",
        icon: "info"
      },
      component: Layout,
      children: [
        {
          path: '/infolist',
          name: 'InfoList',
          hidden: false,
          meta: {
            name: "信息列表"
          },
          component: () => import('../views/Info/InfoList')
        },
        {
          path: '/infocategory',
          name: 'InfoCategory',
          hidden: false,
          meta: {
            name: "信息分类"
          },
          component: () => import('../views/Info/InfoCategory')
        },
      ]
    },
    {
      path: '/user',
      name: 'User',
      redirect: "/userlist",
      hidden: false,
      meta: {
        name: "用户管理",
        icon: "user"
      },
      component: Layout,
      children: [
        {
          path: '/userlist',
          name: 'UserList',
          hidden: false,
          meta: {
            name: "用户列表"
          },
          component: () => import('../views/User/index.vue')
        },
      ]
    }
  ]
})
