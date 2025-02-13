var createStore = Framework7.createStore;
const store = createStore({
    state: {
        cities: [],
        business: [],
        businessDetails: [],
        favourites: [],
        trails: [],
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
        favourites({state}) {
            return state.favourites;
        },
        trails({state}) {
            return state.trails;
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
        addFavourites({state}, favourites) {
            state.favourites = [...state.favourites, favourites];
        },
        addTrails({state}, trails) {
            state.trails = [...state.trails, trails];
        },
    },
})

