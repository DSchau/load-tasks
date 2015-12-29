# load-tasks

A plugin to output a file/task object based on a specified globbing pattern.

## Usage

Given the following directory structure:

```
├── build
   ├── tasks
      └── sass.js
      └── watch.js
      └── webpack.js
```

Let's show a quick example of the usage within a gulp build system.

### `gulpfile.babel.js` 

```javascript
import gulp from 'gulp';

import loadTasks from 'load-tasks';
import { argv } from 'yargs';
import pkg from './package.json';

const tasks = loadTasks('./build/tasks/*.js', gulp, {
  args: argv,
  pkg
});
```

`tasks` is now an object populated with the exported contents of each of the tasks, e.g.

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

```javascript
{
 sass: {
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