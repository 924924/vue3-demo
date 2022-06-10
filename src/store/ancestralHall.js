import { reactive } from 'vue';
import api from '../utils/api';
// 族谱
class AncestralHallStore extends api.BaseStore {
  constructor() {
    super('ancestralHall');
    this.state = reactive({
      info: {},
      list: [],
    });
  } 

  /**
   * 添加保存
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
   * 编辑更新
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

export default new AncestralHallStore();
