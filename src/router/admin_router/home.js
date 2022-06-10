export default [
    {
        path: '/adminHome',
        name: 'adminHome',
        component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/admin_home/index'),
        meta: {
            requireAdmin: true
        },
        redirect: '/adminHome/home',
        children: [
            {
                path: '/adminHome/home',
                name: 'AdminHome',
                component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/admin_home/home'),
            },
            {
                path: '/user/list',
                name: 'userList',
                component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/userManage/userList')
            },
        ]
    },
    {
        path: '/adminHome/login',
        name: 'adminLogin',
        component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/admin_home/login/login')
    },
]
