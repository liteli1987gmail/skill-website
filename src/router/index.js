import Vue from 'vue'
import Router from 'vue-router'

const home = () => import('@/components/index');
const index = () => import('@/components/index/content');//首页
const list = () => import('@/components/index/list');//列表
const score = () => import('@/components/certificate/score');//信息查询
const tutor = () => import('@/components/certificate/tutor');//信息查询
const center = () => import('@/components/certificate/center');//信息查询
const base = () => import('@/components/certificate/base');//信息查询
const suite = () => import('@/components/suite/index');//套件展示
const notes = () => import('@/components/notes/index');//杂志介绍
const article1 = () => import('@/components/article/index');//文章列表1
const article2 = () => import('@/components/article/list');//文章列表2
const pages = () => import('@/components/article/pages');//新闻、公告
const detail = () => import('@/components/index/detail');//详情
const page = () => import('@/components/article/detail');//详情-文章/新闻等
const activity = () => import('@/components/certificate/detail');//详情-中心/基地
const search = () => import('@/components/search/index');//搜索

const mHome = () => import('@/components/mobile/index');
const mIndex = () => import('@/components/mobile/index/index');
const mList = () => import('@/components/mobile/index/list');//列表
const mScore = () => import('@/components/mobile/certificate/score');//信息查询
const mTutor = () => import('@/components/mobile/certificate/tutor');//信息查询
const mCenter = () => import('@/components/mobile/certificate/center');//信息查询
const mBase = () => import('@/components/mobile/certificate/base');//信息查询
const mSuite = () => import('@/components/mobile/suite/index');//套件展示
const mNotes = () => import('@/components/mobile/notes/index');//杂志介绍
const mArticle1 = () => import('@/components/mobile/article/index');//文章列表1
const mArticle2 = () => import('@/components/mobile/article/list');//文章列表2
const mPages = () => import('@/components/mobile/article/pages');//新闻、公告
const mDetail = () => import('@/components/mobile/index/detail');//详情
const mPage = () => import('@/components/mobile/article/detail');//详情-文章/新闻等
const mActivity = () => import('@/components/mobile/certificate/detail');//详情-中心/基地
const mdetailScore = () => import('@/components/mobile/certificate/scoreDetail');//详情-中心/基地
const mSearch = () => import('@/components/mobile/search/index');//搜索

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/m',
    name: 'm',
    redirect: 'mindex',
    meta: {
      device: true
    },
    component: mHome,
    children: [{
      path: '/m/index',
      name: 'mindex',
      meta: {
        device: true
      },
      component: mIndex
    },{
      path: '/m/list/:case',
      name: 'mlist',
      meta: {
        device: true
      },
      component: mList,
      children:[{
        path: '/m/list/score',
        name: 'mscore',
        meta: {
          device: true
        },
        component: mScore
      }, {
        path: '/m/list/tutor',
        name: 'mtutor',
        meta: {
          device: true
        },
        component: mTutor
      }, {
        path: '/m/list/center',
        name: 'mcenter',
        meta: {
          device: true
        },
        component: mCenter
      }, {
        path: '/m/list/base',
        name: 'mbase',
        meta: {
          device: true
        },
        component: mBase
      }, {
        path: '/m/list/suite',
        name: 'msuite',
        meta: {
          device: true
        },
        component: mSuite
      }, {
        path: '/m/list/notes',
        name: 'mnotes',
        meta: {
          device: true
        },
        component: mNotes
      }, {
        path: '/m/list/article',
        name: 'marticle',
        meta: {
          device: true
        },
        component: mArticle1
      }, {
        path: '/m/list/article/0',
        name: 'marticleDefault',
        meta: {
          device: true
        },
        component: mArticle2
      }, {
        path: '/m/list/article/1',
        name: 'marticleList',
        meta: {
          device: true
        },
        component: mArticle1
      }, {
        path: '/m/list/pages/:type',
        name: 'mpageOther',
        meta: {
          device: true
        },
        component: mPages
      }]
    }, {
      path: '/m/detail',
      name: 'mdetail',
      meta: {
        device: true
      },
      component: mDetail,
      children: [{
        path: '/m/detail/article/:id',
        name: 'mpage',
        meta: {
          device: true
        },
        component: mPage
      }, {
        path: '/m/detail/activity/:type/:id',
        name: 'mactivity',
        meta: {
          device: true
        },
        component: mActivity
      }, {
        path: '/m/detail/score/:id',
        name: 'mdetailScore',
        meta: {
          device: true
        },
        component: mdetailScore
      }]
    }, {
      path: '/m/search/:keyWord',
      name: 'msearch',
      meta: {
        device: true
      },
      component: mSearch
    }]
  }, {
    path: '/',
    name: 'home',
    redirect: '/index',
    component: home,
    children: [{
      path: '/index',
      name: 'index',
      component: index
    }, {
      path: '/list/:case',
      name: 'list',
      component: list,
      children: [{
        path: '/list/score',
        name: 'score',
        component: score
      }, {
        path: '/list/tutor',
        name: 'tutor',
        component: tutor
      }, {
        path: '/list/center',
        name: 'center',
        component: center
      }, {
        path: '/list/base',
        name: 'base',
        component: base
      }, {
        path: '/list/suite',
        name: 'suite',
        component: suite
      }, {
        path: '/list/notes',
        name: 'notes',
        component: notes
      }, {
        path: '/list/article',
        name: 'article',
        component: article1
      }, {
        path: '/list/article/0',
        name: 'articleDefault',
        component: article2
      }, {
        path: '/list/article/1',
        name: 'articleList',
        component: article1
      }, {
        path: '/list/pages/:type',
        name: 'pageOther',
        component: pages
      }]
    }, {
      path: '/detail',
      name: 'detail',
      component: detail,
      children: [{
        path: '/detail/article/:id',
        name: 'page',
        component: page
      }, {
        path: '/detail/activity/:type/:id',
        name: 'activity',
        component: activity
      }]
    }, {
      path: '/search/:keyWord',
      name: 'search',
      component: search
    }]
  }]
})

// const index = () => import('@/components/index');//首页
// const content = () => import('@/components/index/content');//首页内容
// const search = () => import('@/components/search/index');//搜索
// const certificate = () => import('@/components/certificate/index');//信息查询
// const pageDetail = () => import('@/components/certificate/detail');//活动中心详情、活动基地详情
// const suite = () => import('@/components/suite/index');//套件列表
// const notes = () => import('@/components/notes/index');//杂志列表
// const article1 = () => import('@/components/article/index');//文章列表-块
// const article2 = () => import('@/components/article/list');//文章列表-表
// const detail = () => import('@/components/article/detail');//文章详情
//
// const mobile = () => import('@/components/mobile/index') //手机端
// const mContent = () => import('@/components/mobile/index/index') //手机端
// const mSearch = () => import('@/components/mobile/search/index') //搜索
// const mCertificate = () => import('@/components/mobile/certificate/index');//信息查询
// const mScoreDetail = () => import('@/components/mobile/certificate/scoreDetail');//信息查询
// const mPageDetail = () => import('@/components/mobile/certificate/detail');//活动中心详情、活动基地详情
// const mSuite = () => import('@/components/mobile/suite/index');//套件列表
// const mNotes = () => import('@/components/mobile/notes/index');//杂志列表
// const mArticle1 = () => import('@/components/mobile/article/index');//文章-块
// const mArticle2 = () => import('@/components/mobile/article/list');//文章-表
// const mDetail = () => import('@/components/mobile/article/detail');//详情
//
// Vue.use(Router);
//
// export default new Router({
//   routes: [
//     {
//       path: '/m',
//       name: 'm',
//       redirect: 'mindex',
//       meta: {
//         device: true
//       },
//       component: mobile,
//       children: [
//         {
//           path: '/m/index',
//           name: 'mindex',
//           meta: {
//             device: true
//           },
//           component: mContent
//         },
//         {
//           path: '/m/search/:keyWord',
//           name: 'msearch',
//           meta: {
//             device: true
//           },
//           component: mSearch
//         },
//         {
//           path: '/m/certificate/:type',
//           name: 'mcertificate',
//           meta: {
//             device: true
//           },
//           component: mCertificate
//         },
//         {
//           path: '/m/certificate/:type/:id',
//           name: 'mcertificate',
//           meta: {
//             device: true
//           },
//           component: mScoreDetail
//         },
//         {
//           path: '/m/certificate/:type/detail/:id',
//           name: 'mcertificate',
//           meta: {
//             device: true
//           },
//           component: mPageDetail
//         },
//         {
//           path: '/m/suite',
//           name: 'msuite',
//           component: mSuite
//         },
//         {
//           path: '/m/notes',
//           name: 'mnotes',
//           component: mNotes
//         },
//         {
//           path: '/m/article',
//           name: 'marticle',
//           meta: {
//             device: true
//           },
//           component: mArticle1
//         },
//         {
//           path: '/m/list/:id',
//           name: 'mlist',
//           meta: {
//             device: true
//           },
//           component: mArticle2
//         },
//         {
//           path: '/m/detail/:case/:id',
//           name: 'mdetail',
//           meta: {
//             device: true
//           },
//           component: mDetail
//         }
//       ]
//     },
//     {
//       path: '/',
//       name: 'home',
//       component: index,
//       redirect: 'index',
//       children: [
//         {
//           path: '/index',
//           name: 'index',
//           component: content
//         },
//         {
//           path: '/search/:keyWord',
//           name: 'search',
//           component: search
//         },
//         {
//           path: '/certificate/:type',
//           name: 'certificate',
//           component: certificate
//         },
//         {
//           path: '/certificate/:type/detail/:id',
//           name: 'certificate',
//           component: pageDetail
//         },
//         {
//           path: '/suite',
//           name: 'suite',
//           component: suite
//         },
//         {
//           path: '/notes',
//           name: 'notes',
//           component: notes
//         },
//         {
//           path: '/article',
//           name: 'article',
//           component: article1
//         },
//         {
//           path: '/list/:id',
//           name: 'list',
//           component: article2
//         },
//         {
//           path: '/detail/:case/:id',
//           name: 'detail',
//           component: detail
//         }
//       ]
//     }
//   ]
// })
