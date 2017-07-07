import Vue from 'vue';
import VueRouter from 'vue-router';
// import Index from '../components/Index';
// import SW from '../components/sw_operation';
import EditPage from '../components/editPage';
// import Pages from '../components/pages';
// import Templates from '../components/templates';
// import Component from '../components/components';
import Tables from '../components/tables';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    // {
    //   path: '/',
    //   name: 'index',
    //   component: Index,
    // },
    // {
    //   path: '/sw',
    //   name: 'sw',
    //   component: SW,
    // },
    {
      path: '/tables/:tableName',
      name: 'tables',
      component: Tables,
    },
    {
      path: '/editPage/:pageID',
      name: 'editPage',
      component: EditPage,
    },
  ],
});

export default router;
