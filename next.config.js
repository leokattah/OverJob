module.exports = {
  reactStrictMode: true,
}
// next.config.js
// const withSass = require('@zeit/next-sass')
// module.exports = withSass({
// cssModules: true
// })

const withCSS = require('@zeit/next-css')
module.exports = withCSS()