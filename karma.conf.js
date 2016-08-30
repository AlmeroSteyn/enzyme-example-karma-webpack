var path = require('path');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'test/**/*.js'
    ],

    preprocessors: {
      // add webpack as preprocessor
      // 'src/**/*.js': ['webpack', 'sourcemap' ],
      'test/**/*.js': ['webpack', 'sourcemap']
    },
    coverageReporter: {
      type: 'lcov',
      dir: './TestResults/coverage-alltests',
      subdir: '.'
    },
    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        preLoaders: [
         {
            test: /\.js?$/,
            exclude: [
              /node_modules/,
              /tests/
            ],
            loader: 'babel-istanbul'
          }
        ],

        loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            exclude: path.resolve(__dirname, 'node_modules'),
            query: {
              presets: ['airbnb']
            }
          },

          {
            test: /\.json$/,
            loader: 'json',
          },
        ],
      },
      externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },

    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },

    plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-spec-reporter',
      'karma-phantomjs-launcher',
      'karma-coverage'
    ],


    babelPreprocessor: {
      options: {
        presets: ['airbnb']
      }
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true,
  })
};