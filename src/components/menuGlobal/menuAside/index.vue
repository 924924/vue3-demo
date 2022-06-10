<template>
    <div class="menuAside">
        <div class="bjLogo" v-if="!state.menuCollapse">
            <div class="img"></div>
        </div>
        <el-row class="">
            <el-col :span="24">
                <el-menu                 
                         text-color="#000"
                         active-text-color="#fff"
                :collapse="state.menuCollapse" ref="elmenu" :default-active="menuClass.menuActive"
                         :active="menuClass.menuActive" :router="true" :unique-opened="true">
                    <el-submenu :index="item.value" v-for="(item, index) in menuClass.menuData" :key="index + 'a'">
                        <!-- 一级菜单 -->
                        <template #title>
                            <i :class="item.icon" class="istyle"></i>
                            <span class="spanStyles">{{item.label}}</span>
                        </template>
                        <template v-for="(subItem, subIndex) in item.children" :key="subIndex + 'b'">
                            <!-- 二级菜单--有菜单 -->
                            <template v-if="subItem.children && subItem.children.length">
                                <el-submenu :index="subItem.value" :key="subItem.value">
                                    <template slot="title" class="spanStyles">{{subItem.label}}</template>
                                    <!-- 三级菜单 -->
                                    <el-menu-item :index="item.value" v-for="(item, index) in subItem.children"
                                                  :key="index + 'c'" class="spanStyles">{{item.label}}
                                    </el-menu-item>
                                </el-submenu>
                            </template>
                            <!-- 二级菜单--无子菜单 -->
                            <template v-if="!subItem.children">
                                <el-menu-item :index="subItem.value" :key="subItem.value" class="spanStyles"
                                              v-show="subItem.showMenu === true"    :disabled="subItem.label==='权限管理'&&adminRole!==20">
                                    <p style="margin-left: 20px">
                                        {{subItem.label}}
                                    </p>
                                </el-menu-item>
                            </template>
                        </template>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import * as common from "@/menuCommon/adminMenu";
    import * as utils from "@/utils/admin/menuUtils";
    import {reactive, getCurrentInstance, onMounted} from 'vue'
    import {userStore} from '../../../store'
    import {useRouter} from 'vue-router'
    export default {
        name: "index",
        setup() {
            let {proxy} = getCurrentInstance();
            let state = userStore.state;
            const Router = useRouter();
            const menuClass = reactive({
                menuActive: "",
                menuData: [],
            });
            let userInfo =JSON.parse(sessionStorage.getItem('adminUserInfo'));
            let adminRole={};
            if (userInfo !== null) {
                adminRole=userInfo.adminRole;
            }else {
                Router.push({
                    path: '/adminHome/login'
                })
            }

            const getHandleMenu = async () => {
                handlePermission();
                let route = proxy.$route.path;
                // 后台首页不高亮菜单
                if (route === "/adminHome/home") {
                    menuClass.menuActive = "";
                } else {
                    let pathArray = route.split("/");
                    pathArray.splice(0, 1);
                    if (pathArray.length > 2) {
                        pathArray.splice(pathArray.length - 1, 1);
                        let str = "";
                        for (let i = 0; i < pathArray.length; i++) {
                            str += `/${pathArray[i]}`;
                        }
                        menuClass.menuActive = str;
                    } else {
                        menuClass.menuActive = route;
                    }

                }
            };
            const handlePermission = async () => {
                // const resp = await this.$get("/position/getAllPositionPermissionByUser");
                // const myPermissionList = resp.data.permissionList;;
                proxy.menuClass.menuData = [];
                proxy.menuClass.menuData = common.adminMenu;
                // const permissionMap = new Map();
                // for(let item of myPermissionList){
                //     permissionMap.set(item.name,item);
                // }
                // for(let index1 in proxy.menuClass.menuData){
                //     if(permissionMap.get(proxy.menuClass.menuData[index1].label)){
                //         proxy.menuClass.menuData[index1].showMenu = true;
                //     }else {
                //         proxy.menuClass.menuData[index1].showMenu = false;
                //     }
                //     for(let index2 in proxy.menuClass.menuData[index1].children){
                //         if(permissionMap.get(proxy.menuClass.menuData[index1].children[index2].label)){
                //             proxy.menuClass.menuData[index1].children[index2].showMenu = true;
                //         }else{
                //             proxy.menuClass.menuData[index1].children[index2].showMenu = false;
                //         }
                //     }
                // }
            };
            // const handleOpen = async (key, keyPath) => {
            //     // 如果点击二级菜单，于此同时同级下有三级菜单，三级菜单收缩
            //     // TODO 待测试
            //     let threeLevelData = utils.findThreeLevelMenu(key, common.adminMenu);
            //     if (threeLevelData.length) {
            //         for (let value of threeLevelData) {
            //             proxy.$refs.elmenu.close(value);
            //         }
            //     }
            //     proxy.menuClass.menuActive = key;
            // };

            onMounted(() => {
                getHandleMenu();
            });
            return {
                menuClass,
                state,
                adminRole,
            }
        }
    }
</script>

<style scoped lang="less">
    .menuAside {
        //  background: url('~@/assets/web/bj.png') ;  
        height: 100%;
        background: white;
        .el-menu:not(.el-menu--collapse) {
            width: 260px;
            //  background: url('~@/assets/web/bg1.png') ;  
        }
        /deep/.el-menu{
            // background: url('~@/assets/web/bg1.png') ;  
        }
        // /deep/.el-submenu__title:hover,.el-menu-item:hover {
        //     background: #d96355 !important;
        // } 
        .el-menu-item.is-active {
            background-color: #ad2527 !important;          
        }
    }
    .bjLogo{
        width: 260px;
        height: 70px;
        border-bottom: 1px solid #ccc;
        .img{
            width: 260px;
            height: 100%;
            background: url('~@/assets/web/logo6.png') no-repeat  center 0px;
            background-position: center 0px;
            background-size: cover;
        }
    }
</style>
