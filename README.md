# less-plugin-rebase

Rebases urls in the css output using functions from [clean-css](https://github.com/jakubpawlowicz/clean-css).

## Usage with [grunt-contrib-less](https://github.com/gruntjs/grunt-contrib-less)

Install the modules
```
npm install --save-dev grunt-contrib-less
npm install --save-dev git://github.com/ecentria/less-plugin-rebase.git#1.0.0
```

Configure Gruntfile.js
```
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
