'use strict';
import LoadTasks, { ERROR_MESSAGE } from '../src/';

export { LoadTasks, ERROR_MESSAGE };

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
