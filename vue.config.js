module.exports = {
  // webpack配置
  configureWebpack: {
    // 路径配置
    resolve: {
      // 别名配置
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    },
  }
}