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
      redirect: '/home',
        meta: {
          title:'报名大厅'
        }
    },
    {
      path: '/home',
      component: ()=>import("../views/Home/home.vue"),
      meta: { keepAlive: true,title:'报名大厅' },
    },
    {
      path: '/home/lessoni',
      name: 'lessoni',
      component: ()=>import("../views/Home/lesson"),
        meta: {
            title:'机构详情'
        }
    },
    {
      path: '/lessondetails',
      name: 'lessondetails',
      component: ()=>import("../views/Home/lessondetails.vue"),
        meta: {
            title:'课程详情'
        }
    },
    // 登录
    {
      path: '/login',
      component: ()=>import("../views/Login/index.vue"),
        meta: {
            title:'登陆页'
        }
    },
    // 设置新密码
    {
      path: '/setpassword',
      component: ()=>import("../views/Login/setpassword"),
        meta: {
            title:'修改密码'
        }
    },
    // 找回密码
    {
      path: '/backpassword',
      component: ()=>import("../views/Login/backpassword"),
        meta: {
            title:'找回密码'
        }
    },
    // 注册
    {
      path: '/register',
      component: ()=>import("../views/Login/register.vue"),
        meta: {
            title:'注册'
        }
    },

    {
      path: '/home/search',
      component: ()=>import("../views/Search/index.vue"),
        meta: {
            title:'搜索'
        }
    },
      {
          path: '/signup2',
          name: 'signup2',
          component: ()=>import("../views/Home/signup2.vue"),
          meta: {
              title:'课程报名'
          }
      },
    {
      path: '/message',
      component: ()=>import("../views/Message/index.vue"),
        meta: {
            title:'留言'
        }
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
      meta: { keepAlive: true ,title:'课程头条'},
    },
    {
      path: '/mechanism',
      component: ()=>import("../views/Mechanism/index.vue"),
        meta: {
            title:'机构入住'
        }
    },
    {
      path: '/activity',
      component: ()=>import("../views/Activity/index.vue"),
        meta: {
            title:'活动'
        }
    },
    {
      path: '/ask',
      component: ()=>import("../views/Ask/index.vue"),
        meta: {
            title:'问吧'
        }

    },
    {
      path: '/askfile',
        name:'askfile',
      component: ()=>import("../views/Ask/Askfile.vue"),
        meta: {
            title:'提问'
        }

    },
    {
      path: '/comment/:id',
      component: ()=>import("../views/Ask/Comment.vue"),
        meta: {
            title:'回答列表'
        }

    },
    //我的
    {
      path: '/my',
      component: ()=>import("../views/My/index.vue"),
        meta: {
            title:'我的'
        }
    },
    {
      path: '/my/quection',
      name: 'myquestion',
      component: ()=>import("../views/My/question.vue"),
        meta: {
            title:'我的提问'
        }
    },
    {
      path: '/my/comment',
      name: 'mycomment',
      component: ()=>import("../views/My/comment.vue"),
        meta: {
            title:'我的评论'
        }
    },
    {
      path: '/my/collection',
      name: 'mycollection',
      component: ()=>import("../views/My/collection.vue"),

      children:[
        {
          path: '/',
          redirect: '/my/collection/jigou',
            meta: {
                title:'我收藏的机构'
            },
        },
        {
          path: '/my/collection/jigou',
          name: 'mycojigou',
          component: ()=>import("../components/My/jigou.vue"),
            meta: {
                title:'我收藏的机构'
            },
        },
        {
          path: '/my/collection/lesson',
          name: 'mycolesson',
          component: ()=>import("../components/My/lesson.vue"),
            meta: {
                title:'我收藏的课程'
            },
        }
      ]
    },
    {
      path: '/my/feedback',
      name: 'myfeedback',
      component: ()=>import("../views/My/feedback.vue"),
        meta: {
            title:'反馈'
        },
    },
    {
      path: '/my/setup',
      name: 'mysetup',
      component: ()=>import("../views/My/setup.vue"),
        meta: {
            title:'更换头像'
        },
    },
    {
      path: '/my/lesson',
      name: 'mylesson',
      component: ()=>import("../views/My/lesson.vue"),
        meta: {
            title:'我的课程'
        },
    },
    {
      path: '/my/topic',
      name: 'mytopic',
      component: ()=>import("../views/My/topic.vue"),
        meta: {
            title:'我的话题'
        },
    },
    {
      path: '/askdetails/:id',
      component: ()=>import("../views/Ask/details.vue"),
        meta: {
            title:'问答详情'
        },
    }

  ]
})
