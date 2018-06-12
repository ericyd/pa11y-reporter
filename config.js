module.exports = {
    // standards to test against
    // eliminate any unwanted options
    standards: ['Section508', 'WCAG2AA', 'WCAG2A', 'WCAG2AAA'],

    // things to ignore, if desired
    // 'notice',
    // 'WCAG2AA.Principle3.Guideline3_1.3_1_1.H57.2'
    ignore: [],

    // uncomment and add sitemap URL to automatically determine pages
    // sitemap: '',

    // definitions for public pages
    public: {
        baseURL: 'http://www.ericyd.com/',

        // path segments to define pages. Will be appended to baseURL
        paths: [
            '',
            'geology',
            'experience'
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