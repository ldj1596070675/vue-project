module.exports = {
  devServer: {
    open: true, // 默认开启浏览器
    port: 3030, // 更改默认端口号
    overlay: { // 遮罩层
      warnings: false,
      errors: false
    },
    proxy: {
      // 代理
      '/info': {
        target: 'http://47.96.0.211:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/info': ''
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        con: '@/components',
        views: '@/views'
      }
    }
  }
}
