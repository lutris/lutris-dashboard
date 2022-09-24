import { loginByUsername, getUserInfo } from "@/api/login.js";
import { getToken, setToken, removeToken } from "@/utils/auth";

const user = {
  state: {
    user: "",
    status: "",
    code: "",
    token: getToken(),
    name: "",
    avatar: "",
    introduction: "",
    roles: [],
    setting: {
      articlePlatform: [],
    },
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
  },

  actions: {
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password)
          .then((response) => {
            const data = response.data;
            commit("SET_TOKEN", data.token);
            setToken(response.data.token);
            resolve();
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    },

    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((response) => {
            if (!response.data) {
              reject("Verification failed, please login again.");
            }
            const data = response.data;
            if (!data.is_staff) {
              reject("This dashboard is restricted to the Lutris staff");
            }
            commit("SET_ROLES", ["admin", "editor"]);
            commit("SET_NAME", data.username);
            commit("SET_AVATAR", data.avatar_url);
            resolve(response);
          })
          .catch((error) => {
            console.error("Failed to set user information: " + error);
            reject(error);
          });
      });
    },

    LogOut({ commit }) {
      return new Promise((resolve) => {
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    },

    ChangeRoles({ commit, dispatch }, role) {
      return new Promise((resolve) => {
        commit("SET_TOKEN", role);
        setToken(role);
        getUserInfo(role).then((response) => {
          const data = response.data;
          commit("SET_ROLES", data.roles);
          commit("SET_NAME", data.name);
          commit("SET_AVATAR", data.avatar);
          dispatch("GenerateRoutes", data);
          resolve();
        });
      });
    },
  },
};

export default user;
