import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import dateFormat from './utils/dateFormat';
import * as math from 'mathjs'
//网络请求相关
import {api} from './service/api'
import {uploadFile, get} from './utils/api'
import storeVue from './store/index'
import {userStore} from './store'

// localStore
import localStore from './utils/store'

import {diffTime} from "./utils/admin/menuUtils";

// 全局css less
import './assets/style/index.less'
// 提示message
import fnTip from '@utils/tip.js'
// 字符串转换
import {commonFilter} from '@utils/filterConstant'
// 创建App实例
const app = createApp(App);
// app.use(ElementPlus);
app.use(ElementPlus, {locale});
app.use(router);


// 拦截路由跳转
setTimeout(() => {
    router.beforeEach((to, from, next) => {
        const path = to.fullPath;
        const metaObj = Object.keys(to.meta);
        // if (metaObj.length !== 0 && !to.meta.requireAuth) {
        //     if (Object.keys(userStore.state.adminUserInfo).length !== 0) {
        //         next();
        //         return
        //     }
        //     next({
        //         path: '/adminHome/login',
        //         query: {toPath: path}
        //     })
        // } else if (metaObj.length !== 0 && !to.meta.requireAdmin) {
        //     if (Object.keys(userStore.state.userInfo).length !== 0) {
        //         next();
        //         return
        //     }
        //     next({
        //         path: '/home/login',
        //         query: {toPath: path}
        //     })
        // } else {
        //     next()
        // }

        next();
    });
}, 10);

// 注册全局方法， post，api...
app.config.globalProperties.$get = get;
app.config.globalProperties.$uploadFile = uploadFile;
app.config.globalProperties.$utilsDiff = diffTime;
app.config.globalProperties.$api = api;
app.config.globalProperties.$localstore = localStore;
app.config.globalProperties.$dateFormat = dateFormat;
app.config.globalProperties.$storeVue = storeVue;
app.config.globalProperties.$math = math;
app.config.globalProperties.$commonFilter = commonFilter;
app.config.globalProperties.$fnTip = fnTip // 提示message
app.mount('#app');
