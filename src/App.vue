<template>
    <div v-loading="state.loading" v-if="state.loading"></div>
    <router-view v-else style="width:100%;height:100%;"></router-view>
</template>

<script>
    import {clientStore, userStore} from "../src/store"
    import * as utils from "@/utils/admin/menuUtils";
    import {reactive,provide}  from 'vue'
    import * as echarts from 'echarts' 

    export default {
        name: 'App',
        setup() {
            provide('ec',echarts)//provide
            const state = reactive({
               loading: true
            });
            const getAllApp = async () => {
                const res = await clientStore.refresh();
                state.loading = false;
                if (res.identity === "STAFF") {
                    userStore.state.adminUserInfo = res.user;
                    return
                }
                userStore.state.userInfo = res;
            };
            getAllApp();
            return {
                state
            }
        },

    }
</script>

<style lang="less">
    #app {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        height: 100%;
    }
    html,
    body,
    #app {
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
        display: flex;
        flex-flow: column;
        min-height: 100vh;
    }    
</style>
