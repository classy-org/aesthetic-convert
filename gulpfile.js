'use strict';

var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    umd = require('gulp-umd'),
    webpack = require('gulp-webpack');

var config = {

  webpack: function(output) {
    return {
      output: {
        libraryTarget: 'var',
        library: 'aesConvert' 
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              presets: ['es2015'],
              plugins: ['add-module-exports']
            }
          }
        ]
      }    
    };
  },

  umd: function() {
    return {
      exports: function(file) {
        return 'aesConvert';
      },
      namespace: function(file) {
        return 'aesConvert';
      }
    };
  }
  
};

gulp.task('build', ['build-es2015', 'build-compat']);

gulp.task('build-es2015', function() {
  gulp.src('src/aesthetic-convert.js')
    .pipe(rename('aesthetic-convert.es2015.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build-compat', function() {
  gulp.src('src/aesthetic-convert.js')
    .pipe(webpack(config.webpack('compat')))
    .pipe(umd(config.umd()))
    .pipe(uglify())
    .pipe(rename('aesthetic-convert.compat.js'))
    .pipe(gulp.dest('dist'));
});
