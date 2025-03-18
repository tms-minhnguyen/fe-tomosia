import { createStore } from "vuex";
import stores from "./modules/stores"; // Kiểm tra đường dẫn

export default createStore({
  modules: {
    stores,
  },
});
