var routes = [
    {
        name: 'home',
        path: '/',
        async: function ({app, to, from, resolve, reject}) {
            // Afișează preloader-ul
            app.preloader.show();

            // Efectuează cererea API pentru a obține datele
            // fetch(`${apiEntryPoint}api-cities`, {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // })
            //     .then((response) => {
            //         if (!response.ok) {
            //             throw new Error(`HTTP error! Status: ${response.status}`);
            //         }
            //         return response.json();
            //     })
            //     .then((res) => {
            //         console.log(res);
            //
            //         // Ascunde preloader-ul
            //         app.preloader.hide();
            //
            //         // Stochează datele în store
            //         store.dispatch('addCities', res);
            //
            //         // Apelează funcția `resolve` pentru a încărca componenta
            //         resolve(
            //             {
            //                 componentUrl: './home.html',
            //             },
            //             {
            //                 props: {
            //                     cities: res, // Transmite datele ca `props`
            //                 },
            //             }
            //         );
            //     })
            //     .catch((err) => {
            //         console.error(err);
            //         app.preloader.hide();
            //         reject(); // Adaugă un apel `reject` pentru erori
            //     });


            // Simulate Ajax Request
            setTimeout(function () {
                // We got user data from request
                let cities = [
                    {
                        'id': 2,
                        'name': 'Suceava',
                        'latitude': 47.6455,
                        'longitude': 26.2486,
                    },
                    {
                        'id': 1,
                        'name': 'Vatra Dornei',
                        'latitude': 47.3475,
                        'longitude': 25.3594,
                    },
                ];

                let business = [
                    {
                        'id': 1,
                        'city_id': 2,
                        'name': 'Hotel Mandachi',
                        'latitude': 47.6217,
                        'longitude': 26.2400,
                        'logo': '../css/images/hotel_mandachi.jpg',
                        'google_page_url': 'https://hotelmandachi.com/en/'
                    },
                    {
                        'id': 2,
                        'city_id': 2,
                        'name': 'Continental',
                        'latitude': 47.6461,
                        'longitude': 26.2554,
                        'logo': '../css/images/continental_logo.jpg',
                        'google_page_url': 'https://mycontinental-suceava.continentalhotels.ro/'
                    },
                    {
                        'id': 3,
                        'city_id': 2,
                        'name': 'Hotel Balada',
                        'latitude': 47.6403,
                        'longitude': 26.2632,
                        'logo': '../css/images/hotel_balada.jpg',
                        'google_page_url': 'https://hotelbalada.ro/'
                    },
                    {
                        'id': 4,
                        'city_id': 2,
                        'name': 'Restaurant Ceaunul Bunicii',
                        'latitude': 47.6428,
                        'longitude': 26.2453,
                        'logo': '../css/images/ceaunul_bunicii.png',
                        'google_page_url': 'https://www.ceaunulbunicii.ro/'
                    },
                    {
                        'id': 5,
                        'city_id': 2,
                        'name': 'Restaurant Casa Bucovineana',
                        'latitude': 47.6506,
                        'longitude': 26.2548,
                        'logo': 'https://dummyimage.com/300',
                        'google_page_url': 'https://casabucovineana.ro/'
                    },
                    {
                        'id': 6,
                        'city_id': 2,
                        'name': 'Taco Loco',
                        'latitude': 47.6423,
                        'longitude': 26.2573,
                        'logo': 'https://dummyimage.com/300',
                        'google_page_url': 'https://www.tacolocosv.ro/'
                    },
                    {
                        'id': 7,
                        'city_id': 2,
                        'name': 'Restaurant Union',
                        'latitude': 47.6444,
                        'longitude': 26.2611,
                        'logo': 'https://dummyimage.com/300',
                        'google_page_url': 'https://www.restaurant-union.ro/'
                    }
                ];
                store.dispatch('addCities', cities);
                store.dispatch('addBusiness', business);
                // Hide Preloader
                app.preloader.hide();

                // Resolve route to load page
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
            }, 1000);
        },
    },
    {
        name: 'business-details',
        path: '/business-details/:business_id',
        async: function ({app, to, from, resolve, reject}) {
            app.preloader.show();

            let businessDetails = store.state.business[0].find(b => b.id == to.params.business_id);
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
