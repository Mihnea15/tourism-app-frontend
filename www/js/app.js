var $ = Dom7;

var device = Framework7.getDevice();
var app = new Framework7({
    name: 'Tourism-app', // App name
    theme: 'auto', // Automatic theme detection
    colors: {
        primary: '#8b00ff',
    },
    darkMode: true,
    el: '#app', // App root element

    // App store
    store: store,
    // App routes
    routes: routes,


    // Input settings
    input: {
        scrollIntoViewOnFocus: device.cordova,
        scrollIntoViewCentered: device.cordova,
    },
    // Cordova Statusbar settings
    statusbar: {
        iosOverlaysWebView: true,
        androidOverlaysWebView: false,
    },
    on: {
        init: function () {
            var f7 = this;
            if (f7.device.cordova) {
                // Init cordova APIs (see cordova-app.js)
                cordovaApp.init(f7);
            }
        },
    },
});
// Login Screen Demo
$('#my-login-screen .login-button').on('click', function () {
    var username = $('#my-login-screen [name="username"]').val();
    var password = $('#my-login-screen [name="password"]').val();

    // Close login screen
    app.loginScreen.close('#my-login-screen');

    // Alert username and password
    app.dialog.alert('Username: ' + username + '<br/>Password: ' + password);
});

function isOpen(openingHour, closingHour, newLine = false) {
    const now = new Date();
    // Convertim orele de deschidere și închidere în ore și minute
    const [openHour, openMinute] = openingHour.split(':').map(Number);
    const [closeHour, closeMinute] = closingHour.split(':').map(Number);

    // Creăm datele pentru orele de deschidere și închidere
    const openingTime = new Date(now);
    openingTime.setHours(openHour, openMinute, 0, 0);

    const closingTime = new Date(now);
    closingTime.setHours(closeHour, closeMinute, 0, 0);

    let isOpen = now >= openingTime && now <= closingTime ? 'Today: <span class="badge color-green">Open</span>' : 'Today: <span class="badge color-red">Closed</span>';

    return newLine == true ? '<br>' + isOpen : isOpen;
}
