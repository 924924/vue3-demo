import axios from 'axios';
import crypto from './crypto'
import {ElLoading} from "element-plus";
import service from "../service/axios";
import localStore from "./store";
import {userStore} from '../store'
import router from '../router/index'

axios.defaults.withCredentials = false;
axios.defaults.timeout = 30000;
axios.defaults.headers.post['Content-Type'] = 'text/plain';

let apiInstance;
const client = {};
//不需要加载的url
let useUrl;
const noLoadUrls=[
    'user.checkCompanyAuthentication',
];
//不加载url的方法
const checkUrl=(url)=>{
    for (let item of noLoadUrls){
        if(item===url){
            return false;
        }
    }
    return true;
};
const setClient = (c) => {
    Object.assign(client, c);
    // 创建api实例
    let loading = null;
    apiInstance = axios.create({
        method: 'post',
        timeout: 30000,
        withCredentials: false,
        headers: {
            'Content-Type': 'text/plain',
        }
    });
    apiInstance.interceptors.request.use(
        config => {
            if(checkUrl(useUrl)){
                // 在请求先展示加载框
                loading = ElLoading.service({
                    text: '正在加载中......',
                    lock: true,
                    spinner: 'el-icon-loading',
                    background: 'rgba(255, 255, 255, 0.8)'
                });
            }
            return config
        },
        error => {
            return Promise.reject(error)
        }
    );
    // 响应拦截器，这里拦截401错误，并重新跳入登录页重新获取token
    apiInstance.interceptors.response.use(
        function (response) {
            // 请求响应后关闭加载框
            if (loading) {
                loading.close()
            }
            // console.log(response);
            if (response.status === 200 &&
                (response.data.code === 401
                    || (response.data.code === 10000
                        && response.data.data
                        && response.data.data.code === 401))) {
                sessionStorage.clear();
                userStore.state.userInfo = {};
                userStore.state.adminUserInfo = {};
                router.push({
                    path: '/home/login'
                })
            }
            return response;
        }, function (error) {
            if (error.response) {
                const res = error.response && error.response.data || {};
                switch (error.response.status) {
                    case 401:
                        res.msg = '请登录';
                        break;
                    case 403:
                        res.msg = '拒绝访问';
                        break;
                    case 412:
                        res.msg = '页面过期，请刷新';
                        break;
                }
                return Promise.reject(res)
            } else {
                return Promise.reject({
                    code: 500,
                    msg: '未知错误'
                })
            }
        },
    );
};

/**
 * 签名
 * @param {Object} data
 * @returns {Object}
 */
const generateSignData = (data = {}) => {
    const timestamp = Date.now();
    const body = JSON.stringify(data);
    const appId = process.env.VUE_APP_END_A;
    const appSecretKey = process.env.VUE_APP_ACCESSKEY;
    const clientId = client._id || '';
    const encrypted = body || '';
    const toSign = appId + appSecretKey + clientId + timestamp + encrypted;
    const sign = crypto.md5(toSign).substr(8, 4);
    return {
        query: `a=${appId}&c=${clientId}&s=${sign}&t=${timestamp}`,
        body: encrypted,
    };
};

/**
 * 文件上传
 * @param url
 * @param file
 * @param data
 * @returns {Promise<any>}
 */
export function uploadFile(url, file, data = {}) {
    const formData = new FormData();
    formData.append('file', file);
    const baseUrl = `${process.env.VUE_APP_BASEAPI}${url}`;
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: baseUrl,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            resolve(res.data)
        })
    })
}

/**
 * get
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function get(url, data = {}) {
    data.c = localStore.get("qixinClient_Id");
    const baseUrl = `${process.env.VUE_APP_BASEAPI}${url}`;
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: baseUrl,
            params: data
        }).then(res => {
            resolve(res.data)
        })
    })
}

const post = (method, data = {}) => {
    return new Promise((resolve, reject) => {
        const {query, body} = generateSignData(data);
        const url = `${process.env.VUE_APP_BASEAPI + '/api'}?m=${method}&${query}`;
        useUrl=method;
        return apiInstance.post(url, body).then(res => {
            resolve(res.data)
        }).catch(err => {
            console.warn(err);
            // reject(err)
        })
    });
};

class BaseStore {

    constructor(name) {
        this.name = name;
        this.state = {
            info: {},
            list: [],
            total: 0
        };
    }

    /**
     * 指标审核
     * @param params
     * @param action
     * @returns {Promise<Promise<any>|Promise<never>>}
     */
    async auditInfo(params, action = 'audit') {
        const res = await post(`${this.name}.${action}`, params);
        if (res.code === 10000) {
            const ret = res.data[this.name] || {};
            this.state.info = ret;
            const newList = this.state.list.slice();
            for (const item of newList) {
                if (item._id === ret._id) {
                    Object.assign(item, ret);
                }
            }
            this.state.list = newList;
            return Promise.resolve(ret);
        } else {
            return Promise.reject(res)
        }
    }

    /**
     * 提交项目
     * */
    async submitProject(params, action = 'submitProject') {
        const res = await post(`${this.name}.${action}`,params);
        return res;
    }
    /**
     * 上传资质提交
     * */
    async submit(params, action = 'submit') {
        const res = await post(`${this.name}.${action}`,params);
        return res;
    }

    /**
     * 结束评审打分
     * */
    async checkAndCalculation(params, action = 'checkAndCalculation') {
        const res = await post(`${this.name}.${action}`,params);
        return res;
    }


    /**
     * 供应商查询项目列表
     * */
    async getListByExpert(params, action = 'getListByExpert') {
        params.page = params.page || 1;
        params.limit = params.limit || 20;
        const res = await post(`${this.name}.${action}`, params);
        if (res.code === 10000) {
            const newList = res.data[this.name].list || [];
            this.state.list = newList;
            if (res.data[this.name].total) {
                this.state.total = res.data[this.name].total;
            }
            return Promise.resolve(newList.length < params.limit);
        } else {
            return Promise.reject(res)
        }
    }

    /**
     * 供应商查询项目列表
     * */
    async getListBySupply(params, action = 'getListBySupply') {
        params.page = params.page || 1;
        params.limit = params.limit || 20;
        // const oldList = params.page === 1 ? [] : this.state.list;
        const res = await post(`${this.name}.${action}`, params);
        if (res.code === 10000) {
            const newList = res.data[this.name].list || [];
            this.state.list = newList;
            if (res.data[this.name].total) {
                this.state.total = res.data[this.name].total;
            }
            return Promise.resolve(newList.length < params.limit);
        } else {
            return Promise.reject(res)
        }
    }

    /**
     * 生成项目编号
     * */
    async generateCode(action = 'generateCode') {
        const res = await post(`${this.name}.${action}`);
        if (res.code === 10000) {
            const ret = res.data.code || {};
            return Promise.resolve(ret);
        } else {
            return Promise.reject(res)
        }
    }

    /**
     * 专家审核
     * @param params
     * @param action
     * @returns {Promise<Promise<any>|undefined>}
     */
    async expertAudit(params, action = 'audit') {
        const res = await post(`${this.name}.${action}`, params);
        if (res.code === 10000) {
            return Promise.resolve(res)
        } else {
            return Promise.reject(res)
        }
    }

    /**
     *
     * @param {Object} [params]
     * @param {String} [action]
     * @return {Promise<{_id: String}>}
     */
    async addInfo(params, action = 'add') {
        const res = await post(`${this.name}.${action}`, params);
        if (res.code === 10000) {
            const ret = res.data[this.name] || {};
            this.state.info = ret;
            const newList = this.state.list.slice();
            newList.unshift(ret);
            this.state.list = newList;
            this.state.total++;
            return Promise.resolve(ret);
        } else {
            return Promise.reject(res)
        }
    }

    /**
     *
     * @param {Object} [params]
     * @param {String} params._id
     * @param {String} [action]
     * @return {Promise<*>}
     */
    async removeInfo(params, action = 'remove') {
        const res = await post(`${this.name}.${action}`, params);
        if (res.code === 10000) {
            const ret = res.data[this.name] || {};
            this.state.info = ret;
            const newList = this.state.list.slice();
            for (let idx = 0; idx < newList.length; idx++) {
                if (newList[idx]._id === params._id) {
                    newList.splice(idx, 1);
                    this.state.list = newList;
                    this.state.total--;
                    break;
                }
            }
            return Promise.resolve(ret);
        } else {
            return Promise.reject(res)
        }
    }

    /**
     *
     * @param {Object} params
     * @param {String} [action]
     * @return {Promise<*>}
     */
    async saveInfo(params, action = 'save') {
        const res = await post(`${this.name}.${action}`, params);
        if (res.code === 10000) {
            const ret = res.data[this.name] || {};
            this.state.info = ret;
            const newList = this.state.list.slice();
            for (const item of newList) {
                if (item._id === ret._id) {
                    Object.assign(item, ret);
                }
            }
            this.state.list = newList;
            return Promise.resolve(ret);
        } else {
            return Promise.reject(res)
        }
    }

    /**
     *
     * @param {Object} [params]
     * @param {String} [action]
     * @return {Promise<Object>}
     */
    async fetchInfo(params, action = 'info') {
        if (params && params[`${this.name}Id`]) {
            if (this.state.info._id !== params[`${this.name}Id`]) {
                return Promise.resolve(this.state.info);
            }
            params['_id'] = params[`${this.name}Id`];
        }
        const res = await post(`${this.name}.${action}`, params);
        if (res.code === 10000) {
            const ret = res.data[this.name] || {};
            this.state.info = ret;
            return Promise.resolve(ret);
        } else {
            return Promise.reject(res)
        }
    }

    /**
     *
     * @param {Object} [params]
     * @param {String} [action]
     * @return {Promise<boolean>} 是否还有更多数据
     */
    async fetchList(params, action = 'list') {
        params.page = params.page || 1;
        params.limit = params.limit || 20;
        // const oldList = params.page === 1 ? [] : this.state.list;
        const res = await post(`${this.name}.${action}`, params);
        if (res.code === 10000) {
            const newList = res.data[this.name].list || [];
            // this.state.list = oldList.concat(newList);
            this.state.list = newList;
            if (res.data[this.name].total) {
                this.state.total = res.data[this.name].total;
            }
            return Promise.resolve(newList.length < params.limit);
        } else {
            return Promise.reject(res)
        }
    }


}

export default {
    setClient,
    post,
    BaseStore,
}
