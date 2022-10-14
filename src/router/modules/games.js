import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route = [
  {
    path: '/games',
    component: Layout,
    redirect: '/games/index',
    meta: { title: 'Games', icon: 'Copy' },
    alwayShow: true,
    children: [
      {
        path: 'index',
        component: createNameComponent(() => import('@/views/games/index.vue')),
        name: 'GamesDashboard',
        meta: { title: 'Games', noCache: true }
      },
      {
        path: 'game_submissions',
        component: createNameComponent(() => import('@/views/games/submissions.vue')),
        name: 'GamesSubmission',
        meta: { title: 'Submissions', noCache: true }
      },
      {
        path: 'merge',
        component: createNameComponent(() => import('@/views/games/merge.vue')),
        name: 'GameMerge',
        meta: { title: 'Merge', noCache: true }
      },
      {
        path: ':slug',
        component: createNameComponent(() => import('@/views/games/detail.vue')),
        name: 'GameDetail',
        meta: { title: 'Details', noCache: true },
        hideMenu: true
      }
    ]
  }
]

export default route