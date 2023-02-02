import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/recommend',
    component: Layout,
    redirect: '/recommend/daily',
    name: '智能推荐',
    meta: { title: '智能推荐', icon: 'recommendIcon' },
    children: [
      {
        path: 'daily',
        name: '每日菜谱',
        component: () => import('@/views/recommend/daily/index'),
        meta: { title: '每日菜谱', icon: 'dailyIcon' }
      },
      {
        path: 'brand',
        name: '品牌推荐',
        component: () => import('@/views/recommend/brand/index'),
        meta: { title: '品牌推荐', icon: 'brandIcon' }
      }
    ]
  },

  {
    path: '/generator',
    component: Layout,
    redirect: '/generator/sort',
    name: '生成器',
    meta: { title: '生成器', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'sort',
        name: '排序条件',
        component: () => import('@/views/generator/sort/index'),
        meta: { title: '排序条件', icon: 'sortIcon' }
      },
      {
        path: 'ingredients',
        name: '可选食材',
        component: () => import('@/views/generator/ingredients/index'),
        meta: { title: '可选食材', icon: 'ingredientsIcon' }
      }
    ]
  },

  {
    path: '/recipe',
    component: Layout,
    redirect: '/recipe/sort',
    name: '菜谱',
    meta: { title: '菜谱', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'information',
        name: '菜谱信息',
        component: () => import('@/views/recipe/information/index'),
        meta: { title: '菜谱信息', icon: 'recipeInformationIcon' },
        children: [
          {
            path: 'category',
            name: '菜谱分类',
            component: () => import('@/views/recipe/publishing/index'),
            meta: { title: '可选食材', icon: 'ingredientsIcon' }
          },
          {
            path: 'content',
            name: '菜谱管理',
            component: () => import('@/views/recipe/publishing/index'),
            meta: { title: '可选食材', icon: 'ingredientsIcon' }
          }
        ]
      },
      {
        path: 'publishing',
        name: '菜谱发布',
        component: () => import('@/views/recipe/publishing/index'),
        meta: { title: '菜谱发布', icon: 'recipePublishingIcon' }
      },
      {
        path: 'audit',
        name: '菜谱审核',
        component: () => import('@/views/recipe/audit/index'),
        meta: { title: '菜谱审核', icon: 'recipePublishingIcon' }
      }
    ]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '用户信息',
        component: () => import('@/views/form/index'),
        meta: { title: '用户信息', icon: 'form' }
      }
    ]
  },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: '个人中心',
        meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
