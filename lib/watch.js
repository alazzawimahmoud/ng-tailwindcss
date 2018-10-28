const chokidar = require('chokidar')
const build = require('./build')
const fs = require('fs')
const path = require('path')

module.exports = () => {
  const ngTwFile = path.resolve(process.cwd(), 'ng-tailwind.js')
  if (fs.existsSync(ngTwFile)) {
    const config = require(ngTwFile)

    const tailwind = chokidar.watch([config.configJS, config.sourceCSS])

    tailwind.on('change', (changedPath) => {
      console.log('Reprocessing Tailwind Files', changedPath)
      build({changedPath})
    })
  } else {
    console.error(`No ng-tailwind.js file found at ${ngTwFile}.
Please run \`ng-tailwindcss configure\` in your project's root directory.
Run \`ng-tailwindcss --help\` for assistance,
or view the Readme at https://github.com/tehpsalmist/ng-tailwindcss`)
  }
}
