var createStore = Framework7.createStore;
const store = createStore({
    state: {
        cities: [],
        business: [],
        businessDetails: [],
    },
    getters: {
        cities({state}) {
            return state.cities;
        },
        business({state}) {
            return state.business;
        },
        businessDetails({state}) {
            return state.businessDetails;
        },
    },
    actions: {
        addCities({state}, cities) {
            state.cities = [...state.cities, cities];
        },
        addBusiness({state}, business) {
            state.business = [...state.business, business];
        },
        addBusinessDetails({state}, businessDetails) {
            state.businessDetails = [...state.businessDetails, businessDetails];
        },
    },
})

