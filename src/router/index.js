import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import home from '@/views/Home/home.vue';
import lessoni from '@/views/Home/lesson.vue';
import lessondetails from '@/views/Home/lessondetails.vue'
import top from '@/views/Home/top.vue';
import signup from '@/views/Home/signup.vue';
import search from '@/views/Search/index.vue';
import message from '@/views/Message/index.vue';
import lesson from '@/views/Lesson/index.vue';
import activity from '@/views/Activity/index.vue';
import mechanism from '@/views/Mechanism/index.vue';
import ask from '@/views/Ask/index.vue';
import askdetails from '@/views/Ask/details.vue';
import comment from '@/views/Ask/Comment.vue';
import hot from '@/components/Ask/Hot.vue';
import new1 from '@/components/Ask/New.vue';
import askfile from '@/views/Ask/Askfile.vue';
import login from '@/views/Login/index.vue';
import setpassword from '@/views/Login/setpassword';
import backpassword from '@/views/Login/backpassword';
import register from '@/views/Login/register.vue';
import my from '@/views/My/index.vue';
import myquestion from '@/views/My/question.vue';
import mycomment from '@/views/My/comment.vue';
import mycollection from '@/views/My/collection.vue';
import myfeedback from '@/views/My/feedback.vue';
import mysetup from '@/views/My/setup.vue';
import mytopic from '@/views/My/topic.vue';
import mylesson from '@/views/My/lesson.vue';
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
      component: home,
      meta: { keepAlive: true },
      children: [
        {
          path: '/home/lessoni',
          name: 'lessoni',
          component: lessoni,
        },
        
      ]
    },
    // 机构详情
    // {
    //   path: '/lessoni',
    //   name: 'lessoni',
    //   component: lessoni,
    // },
    {
      path: '/lessondetails',
      name: 'lessondetails',
      component: lessondetails,
    },
    // 登录
    {
      path: '/login',
      component: login,
    },
    // 设置新密码
    {
      path: '/setpassword',
      component: setpassword,
    },
    // 找回密码
    {
      path: '/backpassword',
      component: backpassword,
    },
    // 注册
    {
      path: '/register',
      component: register,
    },

    {
      path: '/home/search',
      component: search
    },
    {
      path: '/signup',
      name: 'signup',
      component: signup
    },
    {
      path: '/message',
      component: message
    },
    {
      path: '/lesson',
      component: lesson,
      meta: { keepAlive: true },
    },
    {
      path: '/mechanism',
      component: mechanism
    },
    {
      path: '/activity',
      component: activity
    },
    {
      path: '/ask',
      component: ask,

    },
    {
      path: '/askfile',
      component: askfile,

    },
    {
      path: '/comment/:id',
      component: comment,

    },
    //我的
    {
      path: '/my',
      component: my,
    },
    {
      path: '/my/quection',
      name: 'myquestion',
      component: myquestion
    },
    {
      path: '/my/comment',
      name: 'mycomment',
      component: mycomment
    },
    {
      path: '/my/collection',
      name: 'mycollection',
      component: mycollection
    },
    {
      path: '/my/feedback',
      name: 'myfeedback',
      component: myfeedback
    },
    {
      path: '/my/setup',
      name: 'mysetup',
      component: mysetup
    },
    {
      path: '/my/lesson',
      name: 'mylesson',
      component: mylesson
    },
    {
      path: '/my/topic',
      name: 'mytopic',
      component: mytopic
    },
    {
      path: '/askdetails/:id',
      component: askdetails,
    }

  ]
})
