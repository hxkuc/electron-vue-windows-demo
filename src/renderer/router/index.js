import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/backGround',
      name: 'backGround',
      component: require('@/components/backGround').default
    },
    {
      path: '/home',
      name: 'home',
      component: require('@/components/home').default
    },
    {
      path: '/dataWindow',
      name: 'dataWindow',
      component: require('@/components/dataWindow').default
    }
  ]
})
