import { reactive } from 'vue';
import api from '../utils/api';
// 族谱
class GenealogyStore extends api.BaseStore {
  constructor() {
    super('genealogy');
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

    /**
     * 批量设置是否公示
     * @param params
     * @returns {Promise<Promise<any>|Promise<never>>}
     */
    async setPublicity(params) {
      const res = await api.post("genealogy.setPublicity", params);
      if (res.code === 10000) {
          return Promise.resolve(res)
      } else {
          return Promise.reject(res)
      }
    }
    /**
         * 批量导入
         * @param params
         * @returns {Promise<Promise<any>|Promise<never>>}
         */
      async batchAdd(params) {
        const res = await api.post("genealogy.batchAdd", params);
        if (res.code === 10000) {
            return Promise.resolve(res)
        } else {
            return Promise.reject(res)
        }
    }

    /**
         * 根据某个族员的家族序号获取其家族图谱数据
         * @param params
         * @returns {Promise<Promise<any>|Promise<never>>}
    */
     async getTreeListByCode(params) {
      const res = await api.post("genealogy.getTreeListByCode", params);
      if (res.code === 10000) {
          return Promise.resolve(res)
      } else {
          return Promise.reject(res)
      }
    }

    /**
         * 获取统计信息
         * @param params
         * @returns {Promise<Promise<any>|Promise<never>>}
    */
     async getStatisticsInfo(params) {
      const res = await api.post("genealogy.getStatisticsInfo", params);
      if (res.code === 10000) {
          return Promise.resolve(res)
      } else {
          return Promise.reject(res)
      }
    }
 
  
  

}

export default new GenealogyStore();
