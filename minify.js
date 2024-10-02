const glob = require('glob');
const { exec } = require('child_process');

// Minifiera alla .js-filer som inte är .min.js
const jsFiles = glob.sync('lang/**/*.js', { ignore: '**/*.min.js' });

jsFiles.forEach(file => {
    const outputFile = file.replace('.js', '.min.js');
    exec(`npx terser ${file} -o ${outputFile}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error minifying ${file}:`, err);
            return;
        }
        console.log(`Minified: ${file} -> ${outputFile}`);
    });
});

const cssFiles = glob.sync('css/**/*.css', { ignore: '**/*.min.css' });

cssFiles.forEach(file => {
    const outputFile = file.replace('.css', '.min.css');
    exec(`npx cleancss -o ${outputFile} ${file}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error minifying ${file}:`, err);
            return;
        }
        console.log(`Minified: ${file} -> ${outputFile}`);
    });
});

