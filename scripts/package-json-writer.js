/* This script reads the package.json file, makes any necessary adjustments 
to the JSON object, and writes the updated package.json file to a 
specified output directory. 
The output directory defaults to "./dist", but can be changed by updating the
"outputDirectory" variable. 
If any errors occur during this process, the script will log an error message to the console.

Add the following to package.json scripts section
"write-package-json": "node ./scripts/package-json-writer.js"
*/

import fs from 'fs';
import path from 'path';

const outputDirectory = './dist';

try {
    // read file into JSON
    const packageJson = fs.readFileSync('package.json', 'utf-8');
    let pkg = JSON.parse(packageJson);

    pkg.exports = {
        '.': {
            types: './index.d.ts',
            svelte: './index.js'
        }
    };

    pkg.svelte = 'index.js';
    pkg.types = 'index.d.ts';

    // adjust pkg json however you like ..

    // write it to your output directory
    const newPackagePath = path.join(outputDirectory, 'package.json');
    fs.writeFileSync(newPackagePath, JSON.stringify(pkg, null, 2));

    console.log(`The package.json file has been updated and written to ${newPackagePath}.`);
} catch (error) {
    console.error(`An error occurred while processing the package.json file: ${error.message}`);
}
