const fs = require('fs');
const pug = require('pug');

/**
 * Render audit from pa11y results
 * @param {object} data
 */
function renderAudit(data) {
    // Compile the source code
    const compiledFunction = pug.compileFile('templates/main.pug');
    
    // Render a set of data
    const html = compiledFunction(data);
    
    fs.mkdir('accessibility-audit', err => {
        if (err && err.message.indexOf('file already exists') === -1) throw err;

        fs.writeFile('accessibility-audit/results.html', html, function(err) {
            if (err) throw err;
        });
        fs.writeFile('accessibility-audit/resultsJSON.json', JSON.stringify(data), function(err) {
            if (err) throw err;
        });
    });
    console.info("Run `npm run open` to view your audit results!");
}

module.exports = renderAudit;