import Vue from 'vue'
import Router from 'vue-router'
import Layout from "@/views/Layout/index.vue"

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


export const defaultRouterMap = [
  {
    path: '/',
    redirect: '/login',
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
  }]

export const asnycRouterMap = [{
  path: '/info',
  name: 'Info',
  redirect: "/infolist",
  hidden: false,
  meta: {
    system: 'infoSystem',
    name: "信息管理",
    icon: "info",

  },
  component: Layout,
  children: [
    {
      path: '/infolist',
      name: 'InfoList',
      hidden: false,
      meta: {
        name: "信息列表",
        keepAlive: true
      },
      component: () => import('../views/Info/InfoList')
    },
    {
      path: '/infocategory',
      name: 'InfoCategory',
      hidden: false,
      meta: {
        name: "信息分类",
        keepAlive: true
      },
      component: () => import('../views/Info/InfoCategory')
    },
    {
      path: '/infodetail',
      name: 'InfoDetail',
      hidden: true,
      meta: {
        name: "信息详情",
        keepAlive: true
      },
      component: () => import('../views/Info/InfoDetail')
    },
  ]
},
{
  path: '/user',
  name: 'User',
  redirect: "/userlist",
  hidden: false,
  meta: {
    system: 'userSystem', // 自定义key
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
        name: "用户列表",
        keepAlive: true
      },
      component: () => import('../views/User/index.vue')
    },
  ]
}, {
  path: '*',
  hidden: true,
  redirect: "/404index",
  meta: {
    name: "page404",
  },
  component: Layout,
  children: [
    {
      path: '/404index',
      hidden: true,
      meta: {
        name: "404页面"
      },
      component: () => import('../views/404page.vue')
    },
  ]
}
]

const createRouter = () => new Router({
  mode: 'hash',
  base:"vue_admin",
  scrollBehavior: () => ({ y: 0 }),
  routes: defaultRouterMap
})

const router = createRouter()


function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // the relevant part
}
export {
  resetRouter,
  router
}

// export  router;

// export default new Router({
//   mode: 'hash',
//   scrollBehavior: () => ({ y: 0 }),
//   routes: defaultRouterMap
// });


// export default new Router({
//   routes: [
//     {
//       path: '/',
//       redirect: 'login',
//       hidden: true,
//       meta: {
//         name: "主页"
//       }
//     },
//     {
//       path: '/login',
//       name: 'Login',
//       hidden: true,
//       meta: {
//         name: "登陆"
//       },
//       component: () => import('../views/Login/index.vue')
//     },
//     {
//       path: '/console',
//       name: 'Console',
//       redirect: "/consoleIndex",
//       hidden: false,
//       meta: {
//         name: "控制台",
//         icon: "console"
//       },
//       component: Layout,
//       children: [
//         {
//           path: '/consoleIndex',
//           name: 'ConsoleIndex',
//           hidden: false,
//           meta: {
//             name: "主页"
//           },
//           component: () => import('../views/Console/index.vue')
//         },
//       ]
//     },
//     {
//       path: '/info',
//       name: 'Info',
//       redirect: "/infolist",
//       hidden: false,
//       meta: {
//         name: "信息管理",
//         icon: "info"
//       },
//       component: Layout,
//       children: [
//         {
//           path: '/infolist',
//           name: 'InfoList',
//           hidden: false,
//           meta: {
//             name: "信息列表"
//           },
//           component: () => import('../views/Info/InfoList')
//         },
//         {
//           path: '/infocategory',
//           name: 'InfoCategory',
//           hidden: false,
//           meta: {
//             name: "信息分类"
//           },
//           component: () => import('../views/Info/InfoCategory')
//         },
//         {
//           path: '/infodetail',
//           name: 'InfoDetail',
//           hidden: true,
//           meta: {
//             name: "信息详情"
//           },
//           component: () => import('../views/Info/InfoDetail')
//         },
//       ]
//     },
//     {
//       path: '/user',
//       name: 'User',
//       redirect: "/userlist",
//       hidden: false,
//       meta: {
//         name: "用户管理",
//         icon: "user"
//       },
//       component: Layout,
//       children: [
//         {
//           path: '/userlist',
//           name: 'UserList',
//           hidden: false,
//           meta: {
//             name: "用户列表"
//           },
//           component: () => import('../views/User/index.vue')
//         },
//       ]
//     }
//   ]
// })
