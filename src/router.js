import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const routes = [
  {
    path: '/Matrix',
    name: 'Matrix',
    component: () => import(/* webpackChunkName: "matrix" */ './views/Matrix.vue')
  },
  {
    path: '/Radar',
    name: 'Radar',
    component: () => import(/* webpackChunkName: "radar" */ './views/Radar.vue')
  },
  {
    path: '/Elements',
    name: 'Elements',
    component: () => import(/* webpackChunkName: "elements" */ './views/Elements.vue')
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  // }
]

export default new Router({
  routes: routes
})
