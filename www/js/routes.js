var routes = [
    {
        name: 'home',
        path: '/',
        on: {
            pageAfterIn: function () {
                app.preloader.hide();
            }
        },
        async: function ({app, to, resolve}) {
            console.log('api')
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
                    resolve({
                        componentUrl: './home.html',
                    }, {
                        props: {
                            cities: res.data,
                        },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });

        }
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
