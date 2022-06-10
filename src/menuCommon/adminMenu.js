export const adminMenu = [
    {
        label: '用户管理',
        value: '/userManage',
        icon: 'el-icon-coordinate',
        showMenu: true,
        children: [
            {
                label: '所有用户',
                value: '/user/list',
                showMenu: true,
            },
        ]
    },
    {
        label: '宗族管理',
        value: '/genealogy',
        icon: 'el-icon-user',
        showMenu: true,
        children: [
            {
                label: '人员管理',
                value: '/genealogy/manage',
                showMenu: true,
            },
            {
                label: '族谱管理',
                value: '/genealogy/pedigree',
                showMenu: true,
            }
        ]
    },
    {
        label: '设置管理',
        value: '/setting',
        icon: 'el-icon-setting',
        showMenu: true,
        children: [
            {
                label: '权限管理',
                value: '/setting/authority',
                showMenu: true,
            },
        ]
    }
];
