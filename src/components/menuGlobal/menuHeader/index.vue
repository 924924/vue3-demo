<template>
    <div class="menuHeader">
        <span class="menuFolder" @click="foldMenu">
            <i :class="state.menuCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"></i>
        </span>
        <div>
            <span class="logout" @click="logout">退出系统</span>
            <span class="user">当前用户：{{username}}</span>
        </div>
    </div>
</template>

<script>
    import {reactive, getCurrentInstance,toRefs, computed} from 'vue'
    import {userStore} from '../../../store'
    import {useRouter} from 'vue-router'

    export default {
        name: "index",
        setup() {
            let {proxy} = getCurrentInstance();
            const Router = useRouter();
            let state = userStore.state;
            const adminUser = reactive({
                username: "",
            });
            let userInfo =JSON.parse(sessionStorage.getItem('adminUserInfo'));
            if (userInfo !== null) {
                adminUser.username=userInfo.name;
            }else {
                Router.push({
                    path: '/adminHome/login'
                })
            }
            const foldMenu = async () => {
                userStore.changeMenu();
            };
            const logout = async () => {
                proxy.$confirm("退出系统?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(async () => {
                    const res = await userStore.clearUserInfo({
                        clientName: "admin"
                    });
                    if (res){
                        proxy.$message.success("退出成功!");
                        proxy.$router.push({
                            path: "/adminHome/login"
                        })
                    }
                })
            };
            return {
                foldMenu,
                ...toRefs(adminUser),
                logout,
                state
            }
        }
    }
</script>

<style scoped lang="less">
    .menuHeader {
        background: #e9eef3;
        height: 40px;
        // width: 100%;
        line-height: 40px;
        display: flex;
        justify-content: space-between;
        .menuFolder {
            display: block;
            // float: left;
            margin-left: 16px;
            cursor: pointer;
        }

        .logout {
            display: block;
            float: right;
            margin-right: 16px;
            cursor: pointer;
        }
        .logout:hover{
            color:#ad2527
        }

        .user {
            display: block;
            float: right;
            margin-right: 16px;
        }
    }
</style>
