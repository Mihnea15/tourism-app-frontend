var routes = [
    {
        name: 'home',
        path: '/',
        async: function ({ app, to, from, resolve, reject }) {
            // Afișează preloader-ul
            app.preloader.show();

            // Efectuează cererea API pentru a obține datele
            fetch(`${apiEntryPoint}api-cities`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((res) => {
                    console.log(res);

                    // Ascunde preloader-ul
                    app.preloader.hide();

                    // Stochează datele în store
                    store.dispatch('addCities', res);

                    // Apelează funcția `resolve` pentru a încărca componenta
                    resolve(
                        {
                            componentUrl: './home.html',
                        },
                        {
                            props: {
                                cities: res, // Transmite datele ca `props`
                            },
                        }
                    );
                })
                .catch((err) => {
                    console.error(err);
                    app.preloader.hide();
                    reject(); // Adaugă un apel `reject` pentru erori
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
