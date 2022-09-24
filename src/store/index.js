import Vuex from "vuex";
import app from "./modules/app.js";
import errorLog from "./modules/errorLog.js";
import permission from "./modules/permission.js";
import tagsView from "./modules/tagsView.js";
import user from "./modules/user.js";
import getters from "./getters.js";

export default new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
  },
  getters,
});
