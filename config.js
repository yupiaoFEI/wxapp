const basePath = `src`;
const distPath = `dist`;

module.exports = {
  basePath : `${basePath}`,
  distPath : `${distPath}`,
  Asset : {
      js: `${basePath}/pages/**/**.js`,
      sass: `${basePath}/**/**.scss`,
      wxml: `${basePath}/**/**.wxml`,
      json: `${basePath}/**/**.json`
  }
}
