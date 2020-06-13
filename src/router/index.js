import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  mode: 'hash',
  //base:process.env.BABEL_URL,
  base: "lesson",
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: ()=>import("../views/Home/home.vue"),
      meta: { keepAlive: true },
    },
    {
      path: '/home/lessoni',
      name: 'lessoni',
      component: ()=>import("../views/Home/lesson"),
    },
    {
      path: '/lessondetails',
      name: 'lessondetails',
      component: ()=>import("../views/Home/lessondetails.vue"),
    },
    // 登录
    {
      path: '/login',
      component: ()=>import("../views/Login/index.vue"),
    },
    // 设置新密码
    {
      path: '/setpassword',
      component: ()=>import("../views/Login/setpassword"),
    },
    // 找回密码
    {
      path: '/backpassword',
      component: ()=>import("../views/Login/backpassword"),
    },
    // 注册
    {
      path: '/register',
      component: ()=>import("../views/Login/register.vue"),
    },

    {
      path: '/home/search',
      component: ()=>import("../views/Search/index.vue")
    },
      {
          path: '/signup2',
          name: 'signup2',
          component: ()=>import("../views/Home/signup2.vue")
      },
    {
      path: '/message',
      component: ()=>import("../views/Message/index.vue")
    },
      {
          path: '/imgcai',
          component: ()=>import("../components/Imgcai.vue")
      },
      {
          path: '/imgcai2',
          component: ()=>import("../components/Imgcai2.vue")
      },
    {
      path: '/lesson',
      component: ()=>import("../views/Lesson/index.vue"),
      meta: { keepAlive: true },
    },
    {
      path: '/mechanism',
      component: ()=>import("../views/Mechanism/index.vue")
    },
    {
      path: '/activity',
      component: ()=>import("../views/Activity/index.vue")
    },
    {
      path: '/ask',
      component: ()=>import("../views/Ask/index.vue"),

    },
    {
      path: '/askfile',
        name:'askfile',
      component: ()=>import("../views/Ask/Askfile.vue"),
        // meta: {
        //     keepAlive: true
        // }

    },
    {
      path: '/comment/:id',
      component: ()=>import("../views/Ask/Comment.vue"),

    },
    //我的
    {
      path: '/my',
      component: ()=>import("../views/My/index.vue"),
    },
    {
      path: '/my/quection',
      name: 'myquestion',
      component: ()=>import("../views/My/question.vue")
    },
    {
      path: '/my/comment',
      name: 'mycomment',
      component: ()=>import("../views/My/comment.vue")
    },
    {
      path: '/my/collection',
      name: 'mycollection',
      component: ()=>import("../views/My/collection.vue"),
      
      children:[
        {
          path: '/',
          redirect: '/my/collection/jigou'
        },
        {
          path: '/my/collection/jigou',
          name: 'mycojigou',
          component: ()=>import("../components/My/jigou.vue"),
        },
        {
          path: '/my/collection/lesson',
          name: 'mycolesson',
          component: ()=>import("../components/My/lesson.vue"),
        }
      ]
    },
    {
      path: '/my/feedback',
      name: 'myfeedback',
      component: ()=>import("../views/My/feedback.vue")
    },
    {
      path: '/my/setup',
      name: 'mysetup',
      component: ()=>import("../views/My/setup.vue")
    },
    {
      path: '/my/lesson',
      name: 'mylesson',
      component: ()=>import("../views/My/lesson.vue")
    },
    {
      path: '/my/topic',
      name: 'mytopic',
      component: ()=>import("../views/My/topic.vue")
    },
    {
      path: '/askdetails/:id',
      component: ()=>import("../views/Ask/details.vue"),
    }

  ]
})
