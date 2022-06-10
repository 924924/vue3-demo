import { reactive } from 'vue';
import api from '../utils/api';
import localStore from "../utils/store";

class ClientStore extends api.BaseStore {

  constructor() {
    super('client');
    const client = localStore.get("qixinClient_Id");
    api.setClient({_id: client});
    this.state = reactive({
      info: {_id: client},
      list: [],
      clientInfo: {}
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
  // 获取 clientId
  async refresh(params) {
    const client = await super.fetchInfo(params, 'refresh');
    // console.log(client);
    localStore.set("qixinClient_Id", client._id);
    api.setClient({_id: client._id});
    return client
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

export default new ClientStore();
