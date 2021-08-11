/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  pages: {
    index: {
      template: 'public/index.html',
      entry: './src/main.js',
      title: 'Listen 1'
    }
  },
  chainWebpack: (config) => {
    config.devtool('cheap-module-source-map');
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.runtime.esm-bundler');
    config.module
      .rule('i18n')
      .test(/\.(json5?|ya?ml)$/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@intlify/vue-i18n-loader')
      .end();
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => ({
        ...options,
        refSugar: true
      }));
    config.externals({
      ...config.get('externals'),
      electron: 'electron'
    });
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: 'src/background.js'
        }
      }
    }
  }
};