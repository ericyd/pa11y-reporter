module.exports = {
    // uncomment and add sitemap URL to automatically determine pages
    // sitemap: '',

    // definitions for public pages
    public: {
        baseURL: 'http://www.github.com/',

        // path segments to define pages. Will be appended to baseURL
        paths: [
            'ericyd/pa11y-reporter'
        ]
    },

    // definitions for authenticated pages
    auth: {
        baseURL: 'https://github.com/ericyd/',

        // if loginURL is blank, will use baseURL instead
        loginURL: 'https://github.com/login/',

        un: {
            // css selector for username form element
            selector: '#login_field',

            // username to use to log in
            value: 'myusername'
        },
        pw: {
            // css selector for password form element
            selector: '#password',

            // password to use to log in
            value: 'mypassword'
        },

        // path segments to define pages. Will be appended to baseURL
        paths: [
            'pa11y-reporter'
        ],

        // true will skip testing for all auth pages
        skip: true
    }
}