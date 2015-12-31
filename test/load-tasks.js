'use strict';
import LoadTasks, { errorMessage } from '../src/';

export { LoadTasks, errorMessage };

export const testGlob = [
  'test/tasks/*.js'
];

export default new LoadTasks(testGlob)({
  src() {},
  pipe() {},
  dest() {}
}, {
  value: true
});
