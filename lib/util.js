const purge = require('./purge')

module.exports = {
  prefixPath,
  excCallBack,
}

function prefixPath(originalPath) {
  const nameAsArray = originalPath.split("/");
  nameAsArray.reverse();
  nameAsArray[0] = `_${nameAsArray[0]}`;
  nameAsArray.reverse();
  return nameAsArray.join("/");
}

function excCallBack({config, purgeFlag}) {
  return err => {
    if (err) return console.error(err)
    console.info('Successful Tailwind Build!')
    if (config.purge || purgeFlag) purge({})
  }
}