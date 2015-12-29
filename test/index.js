'use strict';
import { expect } from 'chai';

import tasks from './load-tasks';

describe('gulp-load-directory-tasks', () => {
  it('returns object of task/file names', () => {
    expect(Object.keys(tasks).length).to.equal(2);
    expect(tasks.fn).to.exist;
    expect(tasks.obj).to.exist;
  });

  it('exports a function with supplied arguments when function', () => {
    const { fn } = tasks;
    expect(typeof fn).to.equal('function');
    expect(fn()).to.not.be.empty;
    expect(fn().length).to.be.above(0);
  });

  it('exports an object when object', () => {
    const { obj } = tasks;
    expect(obj.foo).to.exist;
    expect(typeof obj.foo).to.equal('function');
  });
});
