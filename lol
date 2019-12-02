yarn run v1.19.0
$ bash ./scripts/start.sh

 │ [4;1mLedger Live Desktop - d7997cb9411a169a62b0420dd6be7af38389bc8b[0;0m
 │ [1;30mMac OS X 10.14.5[1;0m
 │ [2;1mcommit [0;33md7997cb9411a169a62b0420dd6be7af38389bc8b[0;0m

 CI                  [2;34munset[1;0m
 NODE_ENV            [2;34munset[1;0m
 JOBS                [2;34munset[1;0m

 node                [0;2mv8.16.1[0m


Webpack is watching the files…

┏ Renderer -------------------

  (node:22235) DeprecationWarning: Tapable.plugin is deprecated. Use new API on `.hooks` instead

┗ ----------------------------
┏ Renderer -------------------

  [34mℹ[39m [90m｢wds｣[39m: Project is running at [1m[34mhttp://localhost:9080/[39m[22m
  [34mℹ[39m [90m｢wds｣[39m: webpack output is served from [1m[34m/[39m[22m
  [34mℹ[39m [90m｢wds｣[39m: Content not from webpack is served from [1m[34m/Users/hmorosini/Projects/forked/ledger-live-desktop/static, /Users/hmorosini/Projects/forked/ledger-live-desktop/dist/renderer-dll[39m[22m
  [34mℹ[39m [90m｢wds｣[39m: 404s will fallback to [1m[34m/index.html[39m[22m

┗ ----------------------------
┏ Renderer -------------------

  [ HtmlWebpackPlugin {
      options: 
       { template: '/Users/hmorosini/Projects/forked/ledger-live-desktop/src/index.ejs',
         templateParameters: [Function: templateParametersGenerator],
         filename: 'index.html',
         hash: false,
         inject: true,
         compile: true,
         favicon: false,
         minify: false,
         cache: true,
         showErrors: true,
         chunks: 'all',
         excludeChunks: [],
         chunksSortMode: 'auto',
         meta: {},
         title: 'Webpack App',
         xhtml: false,
         nodeModules: '/Users/hmorosini/Projects/forked/ledger-live-desktop/node_modules' } },
    MiniCssExtractPlugin {
      options: { filename: 'styles.css', chunkFilename: '[id].styles.css' } },
    DefinePlugin { definitions: { 'process.env.NODE_ENV': '"development"' } },
    DefinePlugin {
      definitions: 
       { __static: '"/Users/hmorosini/Projects/forked/ledger-live-desktop/static"' } },
    HotModuleReplacementPlugin {
      options: {},
      multiStep: undefined,
      fullBuildTimeout: 200,
      requestTimeout: 10000 },
    WatchFilterPlugin {
      filter: [Function],
      debug: 
       { [Function: debug]
         namespace: 'electron-webpack:watch-renderer',
         enabled: false,
         useColors: true,
         color: 4,
         destroy: [Function: destroy],
         inspectOpts: [Object] } },
    WebpackRemoveOldAssetsPlugin { dllManifest: null },
    EnvironmentPlugin {
      keys: [ 'ELECTRON_WEBPACK_WDS_HOST', 'ELECTRON_WEBPACK_WDS_PORT' ],
      defaultValues: {} },
    DefinePlugin {
      definitions: 
       { __APP_VERSION__: '"1.18.2-nightly.20191128T2135"',
         __GLOBAL_STYLES__: '"* {\\n  -webkit-font-smoothing: antialiased;\\n  backface-visibility: hidden;\\n  box-sizing: border-box;\\n  margin: 0;\\n  padding: 0;\\n  font: inherit;\\n  color: inherit;\\n  user-select: inherit;\\n  cursor: inherit;\\n  min-width: 0;\\n  outline: none;\\n\\n  /* it will surely make problem in the future... to be inspected. */\\n  /* ;_; */\\n  flex-shrink: 0;\\n}\\n\\nbody {\\n  cursor: default;\\n  font-family: Inter, Arial, Helvetica, sans-serif;\\n  font-size: 16px;\\n  font-weight: 300;\\n  line-height: 1.5;\\n  user-select: none;\\n  cursor: default;\\n}\\n\\n#app {\\n  display: flex;\\n  flex-direction: column;\\n  min-height: 100vh;\\n}\\n\\nb {\\n  font-weight: bold;\\n}\\n\\nem {\\n  font-style: italic;\\n}\\n\\n#a11y-status-message {\\n  display: none;\\n}\\n\\n.scroll-content {\\n  height: 100%;\\n\\n  > div {\\n    height: 100%;\\n  }\\n}\\n.scrollbar-thumb {\\n  background: rgb(102, 102, 102) !important;\\n  padding: 2px;\\n  background-clip: content-box !important;\\n}\\n.scrollbar-track {\\n  background: transparent !important;\\n  transition: opacity 0.2s ease-in-out !important;\\n  z-index: 20 !important;\\n}\\n\\n.tippy-tooltip {\\n  padding: 0;\\n}\\n.tippy-tooltip .tippy-content {\\n  background: transparent;\\n}\\n\\n.currentTicker {\\n  background: palette.background.paper;\\n  z-index: 11 !important;\\n}"',
         __DEV__: true,
         __PROD__: false,
         __GIT_REVISION__: undefined,
         __SENTRY_URL__: 'null',
         __STORYBOOK_ENV__: undefined,
         'process.env.NODE_ENV': '"development"' } },
    HardSourceWebpackPlugin {
      options: 
       { cacheDirectory: '/Users/hmorosini/Projects/forked/ledger-live-desktop/node_modules/.cache/hard-source/[confighash]',
         configHash: [Function: relateContextToCacheDir] },
      compilerOutputOptions: 
       { filename: '[name].js',
         chunkFilename: '[name].bundle.js',
         libraryTarget: 'commonjs2',
         path: '/Users/hmorosini/Projects/forked/ledger-live-desktop/dist/renderer',
         publicPath: '/',
         webassemblyModuleFilename: '[modulehash].module.wasm',
         library: '',
         hotUpdateFunction: 'webpackHotUpdate',
         jsonpFunction: 'webpackJsonp',
         chunkCallbackName: 'webpackChunk',
         globalObject: 'window',
         devtoolNamespace: '',
         pathinfo: true,
         sourceMapFilename: '[file].map[query]',
         hotUpdateChunkFilename: '[id].[hash].hot-update.js',
         hotUpdateMainFilename: '[hash].hot-update.json',
         crossOriginLoading: false,
         jsonpScriptType: false,
         chunkLoadTimeout: 120000,
         hashFunction: 'md4',
         hashDigest: 'hex',
         hashDigestLength: 20,
         devtoolLineToLine: false,
         strictModuleExceptionHandling: false },
      configHash: '722960f69a290389d348fb5e42323f30f22acaadd7911745b05f0bdd36e1e77b' } ]

┗ ----------------------------
┏ Main -----------------------

  Compiling...

┗ ----------------------------
