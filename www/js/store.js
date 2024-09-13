

var createStore = Framework7.createStore;
const store = createStore({
  state: {
    cities: [],
  },
  getters: {
    cities({ state }) {
      return state.cities;
    }
  },
  actions: {
    addCities({ state }, cities) {
      state.cities = [...state.cities, cities];
    },
  },
})

