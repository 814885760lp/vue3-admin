const path = require('path')

module.exports = {
  outputDir: './build',
  /** 第一种写法：Vue CLI提供的属性 */
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       components: '@/components'
  //     }
  //   }
  // },

  /** 第二种写法：和webpack写法完全一致，最后会进行合并
   * 重写了alias，需要重写@
   * */
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  // },

  /** 第三种写法：链式配置 */
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('components', '@/components')
  }
}
