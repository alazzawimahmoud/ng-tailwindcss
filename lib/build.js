const exec = require('child_process').exec
const fs = require('fs')
const path = require('path')
const purge = require('./purge')
const util = require('./util');
const fg = require('fast-glob');
 

module.exports = ({ purgeFlag, changedPath }) => {
  const ngTwFile = path.resolve(process.cwd(), 'ng-tailwind.js')
  if (fs.existsSync(ngTwFile)) {
    const config = require(ngTwFile)
    const tailwindCMD = path.normalize('./node_modules/.bin/tailwind');
    if (changedPath) {
      const outputPath = util.prefixPath(changedPath);
      const cmd = `${tailwindCMD} build "${changedPath}" -c "${config.configJS}" -o "${outputPath}"`;
      exec(cmd, util.excCallBack({config, purgeFlag}))
    } else {
      fg([config.sourceCSS]).then((files) => {
        files.forEach(fileName => {
          const outputPath = util.prefixPath(fileName);
          const cmd = `${tailwindCMD} build "${fileName}" -c "${config.configJS}" -o "${outputPath}"`;
          exec(cmd, util.excCallBack({config, purgeFlag}))
        })
      });      
    }
    
  } else {
    console.error(`No ng-tailwind.js file found at ${ngTwFile}.
Please run \`ngtw configure\` in your project's root directory.
Run \`ngtw --help\` for assistance,
or view the Readme at https://github.com/tehpsalmist/ng-tailwindcss`)
  }
}
