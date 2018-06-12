/* ===========================================================
Test runner to perform accessibility audits on saved HTML files.

Runs `pa11y-ci` auditor on all files in the public URLs of the config

Most of the heavy lifting is handled by pa11y; the bulk of this script
is just organizing the data to be used in the report.
=========================================================== */

// dependencies
const fs           = require('fs');
const path         = require('path');
const pa11yCi      = require('pa11y-ci');
const cheerio      = require('cheerio');
const fetch        = require('node-fetch');
const renderAudit  = require('./render');
const wcagMap      = require('./wcag-map');
const config       = require('../config');
const pa11yOptions = {
  allowedStandards: config.standards, // Defaults to Section508, WCAG2A, WCAG2AA, and WCAG2AAA.
  ignore: config.ignore
};

const sortBy = prop => {
  return (a, b) => {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    } else {
      return 0;
    }
  };
};

// sort array of objects based on code property
const sortByCode = sortBy('code');

// group results based on code (i.e. the WCAG principle that it relates to)
const groupByPrinciple = rawResults => {
  var group = {};
  rawResults.forEach(instance => {
    if (group[instance.code]) {
      group[instance.code].instances.push({
        type: instance.type,
        context: instance.context,
        selector: instance.selector
        // code: instance.code,
        // message: instance.message,
      });
    } else {
      group[instance.code] = {
        code: instance.code,
        title: instance.title,
        message: instance.message,
        instances: [
          {
            type: instance.type,
            context: instance.context,
            selector: instance.selector
            // code: instance.code,
            // message: instance.message,
          }
        ]
      };
    }
  });

  // merge object into array of objects
  return Object.values(group);
};

// group and sort results based on WCAG principle
const resultFilter = (rawResults, type) => {
  return groupByPrinciple(
    rawResults.filter(result => result.typeCode === type)
  ).sort(sortByCode);
};

// pa11yCi returns an object with the following shape
// {
//     "total": 49,
//     "passes": 1,
//     "errors": 3904,
//     "results": {
//         "http://www.smartfoodservice.com/location": [{
//             "code": "WCAG2AA.Principle4.Guideline4_1.4_1_2.H91.A.EmptyNoId",
//             "context": "<a class=\"closeModal\" href=\"\" title=\"Close\" tabindex=\"517\"></a>",
//             "message": "Anchor element found with no link content and no name and/or ID attribute.",
//             "type": "error",
//             "typeCode": 1,
//             "selector": "html > body > div:nth-child(3) > a"
//             },
//            ...
//          ],
//          ...
//      }
// }
function processPa11yResults(testRunResults) {
  // optionally write results to file
  if (process.argv.includes('writeFile')) {
    fs.writeFile(
      'pa11y-results.tmp.json',
      JSON.stringify(testRunResults),
      err => err && console.error(err)
    );
  }

  const fileResults = Object.keys(testRunResults.results).map(
    (page, i, array) => {
      resultIssues = testRunResults.results[page].map(issue => {
        let title = issue.code.split('.');
        title = {
          principle: wcagMap.principle[title[1]],
          guideline: wcagMap.guideline[title[2]],
          rule: wcagMap.rule[title[3]]
        };
        return Object.assign(issue, { title: title });
      });

      // marshal the results array into categories
      const errors = resultFilter(resultIssues, 1);
      const warnings = resultFilter(resultIssues, 2);
      const notices = resultFilter(resultIssues, 3);
      categories = [
        {
          resultType: 'error',
          title: 'Errors',
          principles: errors
        },
        {
          resultType: 'warning',
          title: 'Warnings',
          principles: warnings
        },
        {
          resultType: 'notice',
          title: 'Notices',
          principles: notices
        }
      ];
      return {
        name: page,
        categories: categories
      };
    }
  );

  // render the results into a static html doc
  renderAudit({
    numberOfPages: testRunResults.total,
    numberOfPagesPassed: testRunResults.passes || 0,
    errors: testRunResults.errors,
    files: fileResults
  });
}

function getURLs() {
  const sitemapUrl = config.sitemap;
  if (!sitemapUrl) {
    return Promise.resolve(
      config.public.paths.map(p => config.public.baseURL + p)
    );
  }

  return fetch(sitemapUrl)
    .then(response => response.text())
    .then(body => {
      const $ = cheerio.load(body, {
        xmlMode: true
      });
      let urls = [];

      $('url > loc')
        .toArray()
        .forEach(element => {
          let url = $(element).text();
          urls.push(url);
        });

      return Promise.resolve(urls);
    })
    .catch(error => {
      if (error.stack && error.stack.includes('node-fetch')) {
        throw new Error(`The sitemap "${sitemapUrl}" could not be loaded`);
      }
      throw new Error(`The sitemap "${sitemapUrl}" could not be parsed`);
    });
}

(function accessibilityAudit() {
  // execute pa11y audit on each file
  getURLs()
    .then(urls => pa11yCi(urls, pa11yOptions))
    .then(processPa11yResults)
    .catch(console.error.bind(console));
})();
