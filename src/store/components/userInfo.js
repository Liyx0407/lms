/**
 * 缓存菜单信息
 * 
 */
const addUserInfo = {
  state: {
   user:{},
   roleList:{}
  },
  mutations: {
    add_UserInfo(state, param) {
      if (param) {
        state.user = param.user;
        state.roleList = param.roleList;

      }
    },

  },
  actions: {
    add_UserInfo({
      commit
    }, param) {
      commit('add_UserInfo', param)
    },

  }
}
export default addUserInfo
