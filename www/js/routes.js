var routes = [
    {
        name: 'home',
        path: '/',
        async: function ({app, to, from, resolve, reject}) {
            app.preloader.show();

            fetch(`${apiEntryPoint}api-city`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((res) => {
                    let data = res.data;
                    let cities = data.cities;
                    let business = data.business;
                    let trails = data.trails;

                    store.dispatch('addCities', cities);
                    store.dispatch('addBusiness', business);
                    store.dispatch('addTrails', trails);

                    app.preloader.hide();

                    resolve(
                        {
                            componentUrl: './home.html',
                        },
                        {
                            props: {
                                cities: cities,
                                business: business,
                                trails: trails,
                            },
                        }
                    );
                })
                .catch((err) => {
                    console.error(err);
                    app.preloader.hide();
                    reject();
                });
        },
    },
    {
        name: 'business-details',
        path: '/business-details/:business_id',
        async: function ({app, to, from, resolve, reject}) {
            app.preloader.show();

            fetch(`${apiEntryPoint}api-business`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((res) => {
                    let data = res.data;
                    let businessDetails = data.business.find(b => b.id == to.params.business_id);

                    store.dispatch('addBusinessDetails', businessDetails);
                    store.dispatch('addFavourites', data.favourites);

                    app.preloader.hide();

                    resolve(
                        {
                            componentUrl: './pages/business-details.html',
                        },
                        {
                            props: {
                                businessDetails: businessDetails,
                            },
                        }
                    );
                })
                .catch((err) => {
                    console.error(err);
                    app.preloader.hide();
                    reject(); 
                });
        },
    },
    {
        name: 'favourites',
        path: '/favourites/',
        async: function ({app, to, from, resolve, reject}) {
            app.preloader.show();

            fetch(`${apiEntryPoint}api-business/get-favourites?userId=${localStorage.getItem('user_id')}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((res) => {
                    let data = res.data;
                    let businesses = data;

                    app.preloader.hide();

                    resolve(
                        {
                            componentUrl: './pages/favourites.html',
                        },
                        {
                            props: {
                                businesses: businesses,
                            },
                        }
                    );
                })
                .catch((err) => {
                    console.error(err);
                    app.preloader.hide();
                    reject();
                });
        },
    },
    {
        name: 'user-profile',
        path: '/user-profile/',
        async: function ({app, to, from, resolve, reject}) {
            app.preloader.show();

            fetch(`${apiEntryPoint}user/get-user-data?userId=${localStorage.getItem('user_id')}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((res) => {
                    let user = res.data;

                    app.preloader.hide();

                    resolve(
                        {
                            componentUrl: './pages/user.html',
                        },
                        {
                            props: {
                                user: user,
                            },
                        }
                    );
                })
                .catch((err) => {
                    console.error(err);
                    app.preloader.hide();
                    reject();
                });
        },
    },
    {
        name: 'login',
        path: '/login/',
        componentUrl: './pages/login.html',
    },
    {
        name: 'update-password',
        path: '/update-password/',
        componentUrl: './pages/update-password.html',
    },
    {
        name: 'register',
        path: '/register/',
        componentUrl: './pages/register.html',
    },
    // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './pages/404.html',
    },
];
