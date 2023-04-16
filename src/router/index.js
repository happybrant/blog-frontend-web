import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout'
import SimpleLayout from '../layout/index-simple'
Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
    {
      path: '/',
      component: Layout,
      redirect: ':router/articles',
      children: [
      {
        path: ':router/articles',
        component: () => import('@/views/articles'),
      },
      {
        path: ':router/archives/:year?/:month?',
        component: () => import('@/views/archives')
      },
      {
        path: ':router/tags/:tag?',
        component: () => import('@/views/tags')
      },
      {
        // 父分类和子分类可选
        path: ':router/categories/:rootCategory?/:category?',
        component: () => import('@/views/categories')
      }]
    },
    {
      path: '/:router/article',
      component: SimpleLayout,
      redirect: '/article/1',
      children: [
      {
        path:":id",
        component: () => import('@/views/article-detail')
      }],
    },
    {
      path: '/:router/about',
      component: SimpleLayout,
      children: [
        {
          path:"/",
          component: () => import('@/views/about')
        }
      ],
    },       
    {
      path: '/404',
      component: () => import('@/views/404'),
      hidden: true
    },
      // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
  ]
})
export default router