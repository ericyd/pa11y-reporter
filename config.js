module.exports = {
    // definitions for public pages
    public: {
        baseURL: 'http://www.testsite.com/',

        // path segments to define pages. Will be appended to baseURL
        paths: [
            'path1',
            'path2'
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
            'accessibility-boilerplate'
        ],

        // true will skip testing for all auth pages
        skip: true
    }
}