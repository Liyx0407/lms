import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: resolve => require(['@/components/Home.vue'], resolve),
      name: "首页",
      meta: {
        title: '首页',
        // keepAlive:true
      },
      children: [
        {
          path: '/',
          component: resolve => require(['@/components/index.vue'], resolve),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/addUser',
          component: resolve => require(['@/pages/user/addUser/addUser.vue'], resolve),
          meta: {
            title: '添加用户'
          }
        },
        {
          path: '/serchUser',
          component: resolve => require(['@/pages/user/serchUser/serchUser.vue'], resolve),
          meta: {
            title: '查询用户'
          }
        },
        {
          path: '/role',
          component: resolve => require(['@/pages/role/role.vue'], resolve),
          meta: {
            title: '查询角色'
          }
        }, {
          path: '/addCategory',
          component: resolve => require(['@/pages/category/addCategory/addCategory.vue'], resolve),
          meta: {
            title: '添加类别'
          }
        },
        {
          path: '/serchCategory',
          component: resolve => require(['@/pages/category/serchCategory/serchCategory.vue'], resolve),
          meta: {
            title: '查询类别'
          }
        },
        {
          path: '/addBook',
          component: resolve => require(['@/pages/management/addBook/addBook.vue'], resolve),
          meta: {
            title: '添加图书'
          }
        },
        {
          path: '/serchBook',
          component: resolve => require(['@/pages/management/serchBook/serchBook.vue'], resolve),
          meta: {
            title: '查询图书'
          }
        },
        {
          path: '/addRecode',
          component: resolve => require(['@/pages/record/addRecode/addRecode.vue'], resolve),
          meta: {
            title: '添加记录'
          }
        },
        {
          path: '/serchRecode',
          component: resolve => require(['@/pages/record/serchRecode/serchRecode.vue'], resolve),
          meta: {
            title: '查询记录'
          }
        },
        {
          path: '/readerRecord',
          component: resolve => require(['@/pages/readerRecord/readerRecord.vue'], resolve),
          meta: {
            title: '借阅记录'
          }
        },
        {
          path: '/readerSerch',
          component: resolve => require(['@/pages/readerSerch/readerSerch.vue'], resolve),
          meta: {
            title: '图书查询'
          }
        },
        //
        {
          path: '/dueInfo',
          component: resolve => require(['@/pages/dueInfo/dueInfo.vue'], resolve),
          meta: {
            title: '到期提醒'
          }
        },
        {
          path: '/bookDetials',
          component: resolve => require(['@/pages/readerSerch/bookDetials/bookDetials.vue'], resolve),
          meta: {
            title: '书籍详情'
          }
        },
        {
          path: '/updatePwd',
          component: resolve => require(['@/pages/user/updatePwd/updatePwd.vue'], resolve),
          meta: {
            title: '修改密码'
          }
        },
      ]
    },


    {
      path: '/login',
      component: resolve => require(['@/pages/login/login.vue'], resolve),
      meta: {
        title: '登陆'
      }
    },
  ]
})


//页面权限
router.beforeEach((to, from, next) => {
  // console.log('跳转到:', to.fullPath);
  var token = localStorage.getItem('token');
  //如果没登录,都导向登录页
  if (!token) {
    if (to.path !== '/login') {
      next({
        path: '/login'
      })
    } else {
      next();
    }
  } else {
    next();
  }

})

export default router
