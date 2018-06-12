# pa11y-reporter
A reporter for [pa11y-ci](https://github.com/pa11y/pa11y-ci).

Generates a nice HTML report broken down by page, error level, and error type.



## Setup

```bash
git clone https://github.com/ericyd/pa11y-reporter
cd pa11y-reporter
npm install
```

This is more of a boilerplate than a stand-alone module, but with a little configuration it can do a lot of work for you.

If you want to save the report, be aware that the `.gitignore` ignores the audit results by default.



## Usage

Ideally, the only thing you should have to touch is the `config.js` file in the directory root.

After that, run `npm t` to capture page response, analyze with pa11y-ci, and generate a report.



## Running tests

`npm t`

This will do the following:
1. If you have a sitemap defined in your `config.js`, it will fetch the contents and parse the URLs to test. Otherwise, will concatenate URLs from the public baseURL and paths.
    * Note: Authenticated pages do not work at this time
2. For each URL found in step 1, run pa11y and create an audit
3. Organize the data and create a report

When the test script is done, you can open the `accessibility-audit/results.html` file.



## Configuration

Most of the manual adjustments should happen in the `config.js` file in the directory root.

These are all the possible options

* **public** `<Object>`

    Define properties for public pages

    Properties:

    * **baseURL** `<string>`

        Path segments will be appended to the `baseURL` to generate the page under test

    * **paths** `<string[]>`

        Path segments to indicate which pages to visit. Include `''` to include the `baseURL`

    * **skip** `<boolean>` Default: `false`

        When true, public pages will not be tested

* **auth** `<Object>`

    Define properties for authenticated pages

    Properties:

    * **baseURL** `<string>`

        Path segments will be appended to the `baseURL` to generate the page under test

    * **loginURL** `<string>`

        Page to visit to log in before navigating to authenticated page. If ommitted, `auth.baseURL` will be used

    * **un** `<Object>`

        Properties for username entry

        * **selector** `<string>`

            CSS selector to indicate the username form element

        * **value** `<string>`

            Username for authentication

    * **pw** `<Object>`

        Properties for password entry

        * **selector** `<string>`

            CSS selector to indicate the password form element

        * **value** `<string>`

            password for authentication

    * **paths** `<string[]>`

        Path segments to indicate which pages to visit. Include `''` to include the `baseURL`

    * **skip** `<boolean>` Default: `false`

        When true, authenticated pages will not be tested



## Don't need a report?

If all you need is a runner and you don't really need a reporter, please
see the original [pa11y-ci](https://github.com/pa11y/pa11y-ci) project, which includes a great CLI too.

