// 设置管理
export default [
    {
        path: '/setting',
        name: 'setting',
        component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/admin_home/index'),
        meta: {
            requireAdmin: true
        },
        children: [
            {
                path: '/setting/authority',
                name: 'authority',
                component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/setting/authority'),
            },
        ]
    },

]
