const glob = require('glob');
const { exec } = require('child_process');

// Synkron sökning efter alla .js-filer som inte är .min.js
const files = glob.sync('lang/**/*.js', { ignore: '**/*.min.js' });

files.forEach(file => {
    const outputFile = file.replace('.js', '.min.js');
    exec(`npx terser ${file} -o ${outputFile}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error minifying ${file}:`, err);
            return;
        }
        console.log(`Minified: ${file} -> ${outputFile}`);
    });
});
