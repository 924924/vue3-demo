import { reactive } from 'vue';
import api from '../utils/api';

class AppStore extends api.BaseStore {
  
  constructor() {
    super('app');
    this.state = reactive({
      info: {},
      list: [],
    });
  }

  /**
   * 添加
   * @param params
   * @return {Promise<*>}
   */
  async addInfo(params) {
    return super.addInfo(params, 'add');
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

export default new AppStore();
