import axios from "axios";

const API_URL = "http://localhost:8080/api/v1";

const state = () => ({
  stores: [],
  isLoading: false,
  error: null, // Thêm state để lưu lỗi
});

const getters = {
  storesList: (state) => state.stores,
  isLoading: (state) => state.isLoading,
  fetchError: (state) => state.error, // Getter cho lỗi
};

const actions = {
  async fetchStores({ commit }) {
    commit("setStoreIsLoading", true);
    commit("setFetchError", null); // Xóa lỗi trước khi gọi API

    try {
      const res = await axios.get(`${API_URL}/stores`);

      // Kiểm tra dữ liệu nhận được
      if (!res.data || !Array.isArray(res.data.data.content)) {
        console.log("Invalid data:", res.data.data.content); 
        throw new Error("Dữ liệu trả về không hợp lệ!");
      }

      const filteredStores = res.data.data.content.map(store => ({
        id:store.id,
        name:store.name,
        prefectures: store.prefectures,
        address1: store.addressCity,
        address2: store.addressOnward,
        building: store.building,
        phone: store.phoneNumber
      }))
      const stores = filteredStores;
      console.log("Fetched stores data:", stores);

      commit("setStores", stores);
      return stores; 
    } catch (err) {
      console.error("Error fetching stores:", err);
      commit("setFetchError", err.message || "Lỗi không xác định");
      throw err;
    } finally {
      commit("setStoreIsLoading", false);
    }
  },
};

const mutations = {
  setStores(state, stores) {
    state.stores = stores;
  },
  setStoreIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  setFetchError(state, error) {
    state.error = error;
  },
};

export default {
  namespaced: true, // ✅ Đảm bảo có namespace để gọi đúng cú pháp
  state,
  getters,
  actions,
  mutations,
};
