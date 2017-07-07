// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')


var getParamFromCLI = function(cliName) {

  var minimist = require('minimist');

  var args = minimist(process.argv.slice(2));
  if (cliName) {
    return args[cliName];
  } else {
    return args;
  }
}

const cliParams = getParamFromCLI();

const template = cliParams.template || 'index.html';
const port = cliParams.port || 8080;
// const entry = cliParams.entry || './src/main.js';

let autoOpenBrowser = true;
if (cliParams.openBrowser === 'false') {
    autoOpenBrowser = false;
}

let entry = './src/main.js';
if (cliParams.entry) {
    entry = './' + path.join('./page_components', cliParams.entry);
}

const indexName = cliParams.productname;
let rootDir = 'dist';
if (indexName) {
    rootDir = `dist_page/${indexName}`;
}

const useRelativeDir = cliParams.relativePath ? './' : '/';

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, `../${rootDir}/index.html`),
    assetsRoot: path.resolve(__dirname, `../${rootDir}`),
    assetsSubDirectory: 'static',
    assetsPublicPath: useRelativeDir,
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    template,
    entry,
    port,
    autoOpenBrowser,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        // '/service_worker' : {
            // target: 'http://127.0.0.1:3000', // target host
            // changeOrigin: true,               // needed for virtual hosted sites
            // ws: true,                         // proxy websockets
            // pathRewrite: {
            //     '^/api/old-path' : '/api/new-path',     // rewrite path
            //     '^/api/remove/path' : '/path'           // remove base path
            // },
            // router: {
            //     // when request.headers.host == 'dev.localhost:3000',
            //     // override target 'http://www.example.org' to 'http://localhost:8000'
            //     'dev.localhost:3000' : 'http://localhost:8000'
            // }
        // },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
