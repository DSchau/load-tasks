'use strict';
import loadTasks, { errorMessage } from '../src/';

export { loadTasks, errorMessage };

export const testGlob = [
  'test/tasks/*.js'
];

export default loadTasks(testGlob)({
  src() {},
  pipe() {},
  dest() {}
}, {
  value: true
});
