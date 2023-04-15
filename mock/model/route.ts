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
      name: 'fast-note',
      path: '/fast-note',
      component: 'basic',
      meta: {
        title: '速记',
        requiresAuth: true,
        icon: 'mdi:draw-pen'
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
            title: '全部',
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
    }
  ],
  user: [
    {
      name: 'multi-menu',
      path: '/multi-menu',
      component: 'basic',
      children: [
        {
          name: 'multi-menu_first',
          path: '/multi-menu/first',
          component: 'multi',
          children: [
            {
              name: 'multi-menu_first_second',
              path: '/multi-menu/first/second',
              component: 'self',
              meta: {
                title: '二级菜单',
                requiresAuth: true,
                icon: 'mdi:menu'
              }
            },
            {
              name: 'multi-menu_first_second-new',
              path: '/multi-menu/first/second-new',
              component: 'multi',
              children: [
                {
                  name: 'multi-menu_first_second-new_third',
                  path: '/multi-menu/first/second-new/third',
                  component: 'self',
                  meta: {
                    title: '三级菜单',
                    requiresAuth: true,
                    icon: 'mdi:menu'
                  }
                }
              ],
              meta: {
                title: '二级菜单(有子菜单)',
                icon: 'mdi:menu'
              }
            }
          ],
          meta: {
            title: '一级菜单',
            icon: 'mdi:menu'
          }
        }
      ],
      meta: {
        title: '多级菜单',
        icon: 'carbon:menu',
        order: 7
      }
    }
  ]
};
