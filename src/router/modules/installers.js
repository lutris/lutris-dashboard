import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route = [
  {
    path: '/installers',
    component: Layout,
    redirect: '/installers/submissions',
    meta: { title: 'Installers', icon: 'Basketball' },
    alwayShow: true,
    children: [
      {
        path: 'submissions',
        component: createNameComponent(() => import('@/views/installers/submissions.vue')),
        name: 'Submissions',
        meta: { title: 'Submissions', noCache: true }
      },
      {
        path: 'new',
        component: createNameComponent(() => import('@/views/installers/newInstallers.vue')),
        name: 'newInstallers',
        meta: { title: 'New Installers', noCache: true }
      },
      {
        path: 'new/:id(\\d+)',
        component: createNameComponent(() => import('@/views/installers/newInstallerDetail.vue')),
        name: 'newInstallerDetail',
        meta: { title: 'New Installer', noCache: true },
        hideMenu: true
      },
      {
        path: 'submissions/drafts',
        component: createNameComponent(() => import('@/views/installers/drafts.vue')),
        name: 'Drafts',
        meta: { title: 'Drafts', noCache: true }
      },
      {
        path: 'submissions/:id(\\d+)',
        component: createNameComponent(() => import('@/views/installers/submission.vue')),
        name: 'Submission',
        meta: { title: 'Submission', noCache: true },
        hideMenu: true
      }
    ]
  }
]

export default route