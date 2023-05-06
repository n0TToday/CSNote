export const routeModel: Record<Auth.RoleType, AuthRoute.Route[]> = {
  admin: [
    {
      name: 'dashboard',
      path: '/dashboard',
      component: 'basic',
      children: [
        {
          name: 'dashboard_workbench',
          path: '/dashboard/workbench',
          component: 'self',
          meta: {
            title: '工作台',
            requiresAuth: true,
            icon: 'mdi:television-guide',
            order: 1
          }
        },
        {
          name: 'dashboard_analysis',
          path: '/dashboard/analysis',
          component: 'self',
          meta: {
            title: '分析',
            requiresAuth: true,
            icon: 'mdi:google-analytics'
          }
        }
      ],
      meta: {
        title: '开始',
        icon: 'mdi:timeline-clock-outline'
      }
    },

    {
      name: 'repo',
      path: '/repo',
      component: 'basic',
      children: [
        {
          name: 'repo_list',
          path: '/repo/list',
          component: 'self',
          meta: {
            title: '全部知识库',
            requiresAuth: true
          }
        }
      ],
      meta: {
        title: '知识库',
        icon: 'mdi:library-books'
      }
    },
    {
      name: 'user',
      path: '/user',
      component: 'basic',
      meta: {
        title: '我的',
        icon: 'mdi:account'
      }
    },
    {
      name: 'note',
      path: '/note',
      component: 'basic',
      children: [
        {
          name: 'note_create',
          path: '/note/create',
          component: 'self',
          meta: {
            title: '新建笔记',
            multiTab: true,
            icon: 'mdi:new-box'
          }
        }
      ],
      meta: {
        title: '笔记',
        hide: true,
        icon: 'mdi:document'
      }
    }
  ],
  user: [
    {
      name: 'dashboard',
      path: '/dashboard',
      component: 'basic',
      children: [
        {
          name: 'dashboard_workbench',
          path: '/dashboard/workbench',
          component: 'self',
          meta: {
            title: '工作台',
            requiresAuth: true,
            icon: 'mdi:television-guide',
            order: 1
          }
        },
        {
          name: 'dashboard_analysis',
          path: '/dashboard/analysis',
          component: 'self',
          meta: {
            title: '分析',
            requiresAuth: true,
            icon: 'mdi:google-analytics'
          }
        }
      ],
      meta: {
        title: '开始',
        icon: 'mdi:timeline-clock-outline'
      }
    },
    {
      name: 'fast-note',
      path: '/fast-note',
      component: 'self',
      meta: {
        title: '速记',
        singleLayout: 'basic',
        hide: false,
        icon: 'mdi:draw-pen'
      }
    },
    {
      name: 'star',
      path: '/star',
      component: 'self',
      meta: {
        title: '收藏',
        singleLayout: 'basic',
        icon: 'mdi:star'
      }
    },
    {
      name: 'repo',
      path: '/repo',
      component: 'basic',
      children: [
        {
          name: 'repo_list',
          path: '/repo/list',
          component: 'self',
          meta: {
            title: '全部知识库',
            requiresAuth: true,
            icon: 'mdi:library-shelves'
          }
        },
        {
          name: 'repo_detail',
          path: '/repo/detail',
          component: 'self',
          meta: {
            title: '知识库详情',
            requiresAuth: true,
            icon: 'mdi:library-outline',
            hide: true
          }
        }
      ],
      meta: {
        title: '知识库',
        icon: 'mdi:notebook-outline'
      }
    },
    {
      name: 'user',
      path: '/user',
      component: 'basic',
      meta: {
        title: '我的',
        icon: 'mdi:account'
      }
    },
    {
      name: 'note',
      path: '/note',
      component: 'basic',
      children: [
        {
          name: 'note_create',
          path: '/note/create',
          component: 'self',
          meta: {
            title: '新建笔记',
            icon: 'mdi:new-box'
          }
        }
      ],
      meta: {
        title: '笔记',
        hide: true,
        icon: 'mdi:document'
      }
    }
  ]
};
