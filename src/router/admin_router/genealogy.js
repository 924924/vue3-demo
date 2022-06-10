// 宗族管理
export default [
    {
        path: '/genealogy',
        name: 'genealogy',
        component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/admin_home/index'),
        meta: {
            requireAdmin: true
        },       
        children: [ 
            // 人员管理    
            {
                path: '/genealogy/manage',
                name: 'genealogyManage',
                component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/admin_genealogy/genealogyManage/manage'),
            },
            {
                path: '/genealogy/manage/persons',
                name: 'genealogyPerson',
                component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/admin_genealogy/genealogyManage/persons'),
            },
            {
                path: '/genealogy/manage/genealogyAtlas',
                name: 'genealogyAtlas',
                component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/admin_genealogy/genealogyManage/genealogyAtlas'),
            },
            // 族谱管理
            {
                path: '/genealogy/pedigree',
                name: 'pedigreeManage',
                component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/admin_genealogy/pedigreeManage/pedigree'),
            },
            {
                path: '/genealogy/pedigree/addEdit',
                name: 'pedigreeManageDddEdit',
                component: () => import(/* webpackChunkName: "admin" */ '@/views/admin/admin_genealogy/pedigreeManage/addEdit')
            }          
        ]
    },
    
]
