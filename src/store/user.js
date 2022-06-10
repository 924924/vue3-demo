import {reactive} from 'vue';
import api from '@/utils/api';
import localStore from "../utils/store";

class UserStore extends api.BaseStore {

    constructor() {
        super('user');
        this.state = reactive({
            info: {},
            list: [],
            total: 0,
            userInfo: {},
            adminUserInfo: {},
            menuCollapse: false
        });
    }
    /**
     * 身份证认证
     * @param params
     * @returns {Promise<Promise<any>|Promise<never>>}
     */
    async nameAuthentication(params) {
        const res = await api.post("user.nameAuthentication", params);
        if (res.code === 10000) {
            return Promise.resolve(res)
        } else {
            return Promise.reject(res)
        }
    }

    /**
     * 身份证校验
     * @param params
     * @returns {Promise<Promise<any>|Promise<never>>}
     */
    async idOcrImage(params) {
        const res = await api.post("user.idOcrImage", params);
        if (res.code === 10000) {
            return Promise.resolve(res)
        } else {
            return Promise.reject(res)
        }
    }
    /**
     * 企业认证前验证企业是否已被认证
     * @param params
     * @returns {Promise<Promise<any>|Promise<never>>}
     */
    async checkCompanyAuthentication(params) {
        const res = await api.post("user.checkCompanyAuthentication", params);
        if (res.code === 10000) {
            return Promise.resolve(res.data)
        } else {
            return Promise.reject(res)
        }
    }
    /**
     * 企业认证
     * @param params
     * @returns {Promise<Promise<any>|Promise<never>>}
     */
    async companyAuthentication(params) {
        const res = await api.post("user.companyAuthentication", params);
        if (res.code === 10000) {
            return Promise.resolve(res.data)
        } else {
            return Promise.reject(res)
        }
    }
    /**
     * 用户修改手机号
     * @param params
     * @returns {Promise<Promise<any>|Promise<never>>}
     */
    async updatePhone(params) {
        const res = await api.post("user.updatePhone", params);
        if (res.code === 10000) {
            return Promise.resolve(res.data)
        } else {
            return Promise.reject(res)
        }
    }
    /**
     * 忘记密码
     * @param params
     * @returns {Promise<Promise<any>|Promise<never>>}
     */
    async forgetPwdUser(params) {
        const res = await api.post("user.forgetPwd", params);
        if (res.code === 10000) {
            return Promise.resolve(res.data)
        } else {
            return Promise.reject(res)
        }
    }

    /**
     * 重置密码
     * @param params
     * @returns {Promise<Promise<any>|Promise<never>>}
     */
    async updatePwdUser(params) {
        const res = await api.post("user.updatePwdByUser", params);
        if (res.code === 10000) {
            return Promise.resolve(res.data)
        } else {
            return Promise.reject(res)
        }
    }
    /**
     * 修改密码校验原密码
     * @param params
     * @returns {Promise<Promise<any>|Promise<never>>}
     */
    async updatePwdCheck(params) {
        const res = await api.post("user.updatePwdCheck", params);
        if (res.code === 10000) {
            return Promise.resolve(res.data)
        } else {
            return Promise.reject(res)
        }
    }
    /**
     * 检查用户存在
     * @param params
     * @returns {Promise<Promise<any>|Promise<never>>}
     */
    async checkUser(params) {
        const res = await api.post("user.checkUser", params);
        if (res.code === 10000) {
            return Promise.resolve(res.data)
        } else {
            return Promise.reject(res)
        }
    }

    /**
     * 登录
     * @param params
     * @returns {Promise<*>}
     */
    async loginInfo(params) {
        const userInfo = await super.fetchInfo(params, 'login');
        sessionStorage.setItem('adminUserInfo',JSON.stringify(userInfo.user));
        // this.state.adminUserInfo = userInfo.user;
        return userInfo
    }

    /**
     * 注册
     * @param params
     * @returns {Promise<*>}
     */
    async registerUserInfo(params) {
        return await super.fetchInfo(params, 'register');
    }

    /**
     * 登出
     * @param params
     * @returns {Promise<*>}
     */
    async clearUserInfo(params) {
        const userLogout = await super.fetchInfo(params, 'logout');
        this.state.adminUserInfo = {};
        // if (userLogout && params && params.clientName === "admin") {
        //     this.state.adminUserInfo = {};
        // } else {
        //     this.state.userInfo = {};
        // }
        return userLogout
    }

    /**
     * 添加账号
     * @param params
     * @returns {Promise<*>}
     */
    async addAccount(params) {
        return await super.addInfo(params, 'add');
    }

    /**
     * 获取用户列表
     * @param params
     * @returns {Promise<*>}
     */
    async getUserList(params) {
        return await super.fetchList(params, 'list');
    }

    /**
     * 改变 admin 菜单menu 缩放
     * @returns {Promise<void>}
     */
    async changeMenu() {
        this.state.menuCollapse = !this.state.menuCollapse
    }


    /**
     * 删除
     * @param params
     * @return {Promise<*>}
     */
    async removeInfo(params) {
        return super.removeInfo(params, 'remove');
    }

    /**
     * 保存
     * @param params
     * @return {Promise<*>}
     */
    async saveInfo(params) {
        return super.saveInfo(params, 'save');
    }

    /**
     * 获取单条
     * @param params
     * @return {Promise<*>}
     */
    async fetchInfo(params) {
        return super.fetchInfo(params, 'info');
    }

    /**
     * 获取列表
     * @param params
     * @return {Promise<*>}
     */
    async fetchList(params) {
        return super.fetchList(params, 'list');
    }
}

export default new UserStore();
