const allRoute: AuthRoute.Route[] = [
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
          multiTab: true,
          icon: 'mdi:library-outline',
          hide: true,
          activeMenu: 'repo'
        }
      }
    ],
    meta: {
      title: '知识库',
      icon: 'mdi:notebook-outline'
    }
  },
  {
    name: 'rubbish',
    path: '/rubbish',
    component: 'self',
    meta: {
      title: '回收站',
      icon: 'mdi:rubbish-bin-empty',
      singleLayout: 'basic'
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
          icon: 'mdi:new-box',
          activeMenu: 'repo'
        }
      },
      {
        name: 'note_detail',
        path: '/note/detail',
        component: 'self',
        meta: {
          title: '笔记详情',
          multiTab: true,
          icon: 'mdi:text',
          activeMenu: 'repo'
        }
      }
    ],
    meta: {
      title: '笔记',
      hide: true,
      icon: 'mdi:document'
    }
  }
];

export default allRoute;
