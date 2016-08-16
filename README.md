# less-plugin-rebase

Rebases urls in the css output using functions from [clean-css](https://github.com/jakubpawlowicz/clean-css).

## Usage with gulp

Install the modules
```shell
npm install --save-dev gulp-less
npm install --save-dev git://github.com/sormy/less-plugin-rebase.git
```

Configure gulpfile.js
```javascript
var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');

var LessRebase = require('less-plugin-rebase');

var bootstrapLessDir = 'jspm_packages/github/twbs/bootstrap@3.3.7/less';

// jspm_packages/github/twbs/bootstrap@3.3.7/less (library, read only)
// src/bootstrap/variables.less (vanilla copy, expected modifications)
//   - @icon-font-path: "../../jspm_packages/github/twbs/bootstrap@3.3.7/fonts/";
// src/bootstrap/bootstrap.less (vanilla copy, expected modifications)
// src/bootstrap/theme.less (vanilla copy, expected modifications)

// Compile as .tmp/src/bootstrap/bootstrap.css with rebased icon-font-path
// That will allow to correctly combine and minify css via clean-css
// used in systemjs/plugin-css.

gulp.task('build-bootstrap', function() {
  return gulp
    .src('src/bootstrap/@(bootstrap|theme).less', { base: '.' })
    .pipe(sourcemaps.init())
    .pipe(less({
      paths: [ bootstrapLessDir ],
      plugins: [
        new LessRebase({
          rebase: true,
          relativeTo: 'src',
          target: '.tmp/src'
        })
      ]
    }))
    .pipe(concat('src/bootstrap/bootstrap.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp'));
});

```

## Usage with [grunt-contrib-less](https://github.com/gruntjs/grunt-contrib-less)

Install the modules
```shell
npm install --save-dev grunt-contrib-less
npm install --save-dev git://github.com/ecentria/less-plugin-rebase.git
```

Configure Gruntfile.js
```javascript
module.exports = function(grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.initConfig({
        less: {
            build: {
                files: [{
                    expand: true,
                    cwd: './layout/store/desktop/css/public',
                    src: ['*.less'],
                    dest: './layout/css/store'
                }],
                options: {
                    plugins: [
                        new (require('less-plugin-rebase'))({
                            rebase: true,
                            relativeTo: './layout/store/desktop/css/public',
                            target: './layout/css/store'
                        })
                    ]
                }
            }
        }
    });
};
```

Run the taks
```
grunt less:build
```
