var $ = Dom7;

var device = Framework7.getDevice();
var app = new Framework7({
    name: 'Tourism Made Easy',
    theme: 'auto',
    colors: {
        primary: '#8b00ff',
    },
    darkMode: true,
    el: '#app',
    store: store,
    routes: routes,


    input: {
        scrollIntoViewOnFocus: device.cordova,
        scrollIntoViewCentered: device.cordova,
    },
    statusbar: {
        iosOverlaysWebView: true,
        androidOverlaysWebView: false,
    },
    on: {
        init: function () {
            var f7 = this;
            if (f7.device.cordova) {
                cordovaApp.init(f7);
            }
        },
    },
});

$('#my-login-screen .login-button').on('click', function () {
    var username = $('#my-login-screen [name="username"]').val();
    var password = $('#my-login-screen [name="password"]').val();

    app.loginScreen.close('#my-login-screen');

    app.dialog.alert('Username: ' + username + '<br/>Password: ' + password);
});

function parseProgram(programString) {
    const programLines = programString.split('\n');
    const program = {};

    programLines.forEach(line => {
        const [day, hours] = line.split(': ');
        program[day.trim()] = hours.trim();
    });

    return program;
}


function isOpen(openingHour, closingHour, program = null, newLine = false) {
    let parsedProgram = null;
    if (program !== null) {
        parsedProgram = parseProgram(program);
    }

    const now = new Date();
    const currentDay = now.toLocaleString('en-US', { weekday: 'long' });
    const [openHour, openMinute] = openingHour.split(':').map(Number);
    const [closeHour, closeMinute] = closingHour.split(':').map(Number);

    const todayProgram = parsedProgram ? parsedProgram[currentDay] : null;

    if (todayProgram && todayProgram.includes('Closed')) {
        return newLine == true ? '<br>Today: <span class="badge" style="background-color: red">Closed</span>' : 'Today: <span class="badge" style="background-color: red">Closed</span>';
    }

    const openingTime = new Date(now);
    openingTime.setHours(openHour, openMinute, 0, 0);

    const closingTime = new Date(now);
    closingTime.setHours(closeHour, closeMinute, 0, 0);

    let isOpen = now >= openingTime && now <= closingTime ? 'Today: <span class="badge color-green">Open</span>' : 'Today: <span class="badge" style="background-color: red">Closed</span>';

    return newLine == true ? '<br>' + isOpen : isOpen;
}
