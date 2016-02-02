# load-tasks

A plugin to output a file/task object based on a passed in folder/array of folders.

## Usage

*The examples below show the usage within gulp, but should work with grunt or any other build system (or even outside of a build system!)*

Given the following directory structure:

```
├── build
   ├── tasks
      └── sass.js
      └── watch.js
      └── webpack.js
└── gulpfile.babel.js
```

### `gulpfile.babel.js` 

```javascript
import gulp from 'gulp';

import LoadTasks from 'load-tasks';
import { argv } from 'yargs';
import pkg from './package.json';

const tasks = new LoadTasks('./build/tasks')(gulp, {
  args: argv,
  pkg
});

gulp.task('sass', tasks.sass);
gulp.task('watch', tasks.watch);
gulp.task('webpack', tasks.webpack);

gulp.task('default', ['sass', 'webpack', 'watch']));
```

*Note that any arguments passed to the closure (2nd function call) are passed to the imported tasks/files, if any tasks/files export a function!*


### `build/tasks/sass.js`

```javascript
'use strict';
import sass from 'gulp-sass';

// note that both es6 and commonjs exports can be used, but es6 exports need to export `default`
export default (gulp, config) => {
  return () => {
    return gulp.src('src/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist'));
  };
};
```

`const tasks` is now an object populated with the exported contents of each of the tasks, e.g.

```javascript
{
 sass() {
  // the gulp sass function we defined above!
 },
 watch() {
  // whatever `watch.js` exports!
 },
 webpack() {
  // whatever `webpack.js` exports!
 }
}
```