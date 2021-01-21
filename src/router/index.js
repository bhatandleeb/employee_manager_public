import Vue from 'vue'
import VueRouter from 'vue-router'
import EmployeesList from '../views/EmployeesList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Employees',
    component: EmployeesList
  },
  // {
  //   path: "/employees/create",
  //   name: "Create",
  //   // route level code-splitting
  //   // this generates a separate chunk (create.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "create" */ '../views/EmployeeCreate.vue')
  // },
  // {
  //   path: "/employees/edit/:id",
  //   name: "Edit",
  //   component: () => import(/* webpackChunkName: "edit" */ '../views/EmployeeEdit.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
