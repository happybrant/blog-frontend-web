const { defineConfig } = require('@vue/cli-service')
 

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,  //关闭语法检查
  // ...
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title= '让灵魂去流浪'
        return args
      })
  }
})
