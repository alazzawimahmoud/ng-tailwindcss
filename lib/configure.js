const fs = require('fs')
const path = require('path')

module.exports = (userDefConfig, defaultOverride) => {
  const isAngular = path.existsSync(path.resolve(process.cwd(), 'angular.json')) || path.existsSync(path.resolve(process.cwd(), 'angular-cli.json'))
  const ngTwFile = path.resolve(process.cwd(), 'ng-tailwind.js')
  const defaultConfig = {
    configJS: `${path.resolve('./tailwind.js')}`,
    sourceCSS: `${path.resolve('./src/tailwind.css')}`,
    outputCSS: `${isAngular ? path.resolve('./src/styles.css') : path.resolve('./src/index.css')}`
  }
  let newConfig
  let currentConfig

  if (defaultOverride) {
    newConfig = {
      ...defaultConfig,
      ...userDefConfig
    }
    fs.writeFile(
      ngTwFile,
      `module.exports = {
  configJS: '${newConfig.configJS}',
  sourceCSS: '${newConfig.sourceCSS}',
  outputCSS: '${newConfig.outputCSS}'
}`,
      err => {
        if (err) console.error('Error updating ng-tailwind.js:', err)
      }
    )
  } else if (fs.existsSync(ngTwFile)) {
    currentConfig = require(ngTwFile)
    newConfig = {
      ...currentConfig,
      ...userDefConfig
    }
    fs.writeFile(
      ngTwFile,
      `module.exports = {
  configJS: '${newConfig.configJS}',
  sourceCSS: '${newConfig.sourceCSS}',
  outputCSS: '${newConfig.outputCSS}'
}`,
      err => {
        if (err) console.error('Error updating ng-tailwind.js:', err)
      }
    )
  } else {
    newConfig = {
      ...defaultConfig,
      ...userDefConfig
    }
    fs.writeFile(
      ngTwFile,
      `module.exports = {
  configJS: '${newConfig.configJS}',
  sourceCSS: '${newConfig.sourceCSS}',
  outputCSS: '${newConfig.outputCSS}'
}`,
      err => {
        if (err) console.error('Error creating ng-tailwind.js:', err)
      }
    )
  }
}
