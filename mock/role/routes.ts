// Just a mock data

export const constantRoutes = [
  {
    path: '/redirect',
    component: 'Layout',
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path*',
        component: 'views/redirect/index'
      }
    ]
  },
  {
    path: '/login',
    component: 'views/login/index',
    meta: { hidden: true }
  },
  {
    path: '/auth-redirect',
    component: 'views/login/auth-redirect',
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: 'views/error-page/404',
    meta: { hidden: true }
  },
  {
    path: '/401',
    component: 'views/error-page/401',
    meta: { hidden: true }
  },
  {
    path: '',
    component: 'Layout',
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: 'views/dashboard/index',
        name: 'Dashboard',
        meta: {
          title: 'dashboard',
          icon: 'dashboard',
          affix: true
        }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/permission',
    component: 'Layout',
    redirect: '/permission/index',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'],
      alwaysShow: true
    },
    children: [
      {
        path: 'page',
        component: 'views/permission/page',
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin']
        }
      },
      {
        path: 'directive',
        component: 'views/permission/directive',
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
        }
      },
      {
        path: 'role',
        component: 'views/permission/role',
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/error-log',
    component: 'Layout',
    redirect: 'noredirect',
    children: [
      {
        path: 'log',
        component: 'views/error-log/index',
        name: 'ErrorLog',
        meta: {
          title: 'errorLog',
          icon: 'bug'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    meta: { hidden: true }
  }
]
