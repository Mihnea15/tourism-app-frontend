var routes = [
    {
        name: 'home',
        path: '/',
        async: function ({app, to, from, resolve, reject}) {
            // Afișează preloader-ul
            app.preloader.show();

            // Efectuează cererea pentru fișierul JSON
            fetch(`${apiEntryPoint}api-city`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    // Include other headers if necessary
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
                    // Extract data about cities, business and trails from JSON
                    let cities = data.cities;
                    let business = data.business;
                    let trails = data.trails;

                    // Store data in store
                    store.dispatch('addCities', cities);
                    store.dispatch('addBusiness', business);
                    store.dispatch('addTrails', trails);

                    // Hide preloader
                    app.preloader.hide();

                    // Call resolve function to load the component
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
                    reject(); // Handle error
                });
        },
    },
    {
        name: 'business-details',
        path: '/business-details/:business_id',
        async: function ({app, to, from, resolve, reject}) {
            app.preloader.show();

            // Efectuează cererea pentru fișierul JSON
            fetch(`${apiEntryPoint}api-business`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((res) => {
                    let data = res.data;
                    // Găsește afacerea în funcție de ID
                    let businessDetails = data.business.find(b => b.id == to.params.business_id);

                    // Stochează detaliile afacerii în store
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
                    reject(); // Gestionare eroare
                });
        },
    },
    {
        name: 'favourites',
        path: '/favourites/',
        async: function ({app, to, from, resolve, reject}) {
            app.preloader.show();

            // Efectuează cererea pentru fișierul JSON
            fetch(`${apiEntryPoint}api-business/get-favourites?userId=${localStorage.getItem('user_id')}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((res) => {
                    let data = res.data;
                    // Găsește afacerea în funcție de ID
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
                    reject(); // Gestionare eroare
                });
        },
    },
    {
        name: 'user-profile',
        path: '/user-profile/',
        async: function ({app, to, from, resolve, reject}) {
            app.preloader.show();

            // Efectuează cererea pentru fișierul JSON
            fetch(`${apiEntryPoint}user/get-user-data?userId=${localStorage.getItem('user_id')}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((res) => {
                    // Găsește afacerea în funcție de ID
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
                    reject(); // Gestionare eroare
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
    {
        path: '/about/',
        url: './pages/about.html',
    },
    {
        path: '/form/',
        url: './pages/form.html',
    },
    {
        path: '/settings/',
        url: './pages/settings.html',
    },
    {
        path: '/dynamic-route/blog/:blogId/post/:postId/',
        componentUrl: './pages/dynamic-route.html',
    },
    {
        path: '/request-and-load/user/:userId/',
        async: function ({router, to, resolve}) {
            // App instance
            var app = router.app;

            // Show Preloader
            app.preloader.show();

            // User ID from request
            var userId = to.params.userId;

            // Simulate Ajax Request
            setTimeout(function () {
                // We got user data from request
                var user = {
                    firstName: 'Vladimir',
                    lastName: 'Kharlampidi',
                    about: 'Hello, i am creator of Framework7! Hope you like it!',
                    links: [
                        {
                            title: 'Framework7 Website',
                            url: 'http://framework7.io',
                        },
                        {
                            title: 'Framework7 Forum',
                            url: 'http://forum.framework7.io',
                        },
                    ]
                };
                // Hide Preloader
                app.preloader.hide();

                // Resolve route to load page
                resolve(
                    {
                        componentUrl: './pages/request-and-load.html',
                    },
                    {
                        props: {
                            user: user,
                        }
                    }
                );
            }, 1000);
        },
    },
    // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './pages/404.html',
    },
];
