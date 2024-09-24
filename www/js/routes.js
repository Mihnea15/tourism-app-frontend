var routes = [
    {
        name: 'home',
        path: '/',
        async: function ({app, to, from, resolve, reject}) {
            // Afișează preloader-ul
            app.preloader.show();

            // Efectuează cererea pentru fișierul JSON
            fetch(`${apiEntryPoint}api-cities`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    // Extrage datele despre orașe și afaceri din fișierul JSON
                    let cities = data.cities;
                    let business = data.business;

                    // Stochează datele în store
                    store.dispatch('addCities', cities);
                    store.dispatch('addBusiness', business);

                    // Ascunde preloader-ul
                    app.preloader.hide();

                    // Apelează funcția `resolve` pentru a încărca componenta
                    resolve(
                        {
                            componentUrl: './home.html',
                        },
                        {
                            props: {
                                cities: cities,
                                business: business,
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
                .then((data) => {
                    // Găsește afacerea în funcție de ID
                    let businessDetails = data.business.find(b => b.id == to.params.business_id);

                    // Stochează detaliile afacerii în store
                    store.dispatch('addBusinessDetails', businessDetails);

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
            fetch(`${apiEntryPoint}api-business`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    // Găsește afacerea în funcție de ID
                    let businesses = data.business;

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
        path: '/about/',
        url: './pages/about.html',
    },
    {
        path: '/form/',
        url: './pages/form.html',
    },
    {
        path: '/catalog/',
        componentUrl: './pages/catalog.html',
    },
    {
        path: '/product/:id/',
        componentUrl: './pages/product.html',
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
