const pkg = require('./package.json')

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? `{{CDN_BASE_URL}}/${pkg.name}/${pkg.version}/`
    : '/',
  devServer: {
    proxy: {
      '/innovation-charts': {
        target: 'http://ic.zhihuiya.com'
      }
    }
  }
}
