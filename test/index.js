'use strict';
import { expect } from 'chai';

import tasks from './load-tasks';

describe('gulp-load-directory-tasks', () => {
  it('returns object of task/file names', () => {
    expect(Object.keys(tasks).length).to.be.above(0);
    expect(tasks.common).to.exist;
    expect(tasks.es6).to.exist;
    expect(tasks.empty).to.exist;
    expect(tasks.obj).to.exist;
  });

  it('handles common js export', () => {
    const { common } = tasks;
    expect(typeof common).to.equal('function');
  });

  it('handles es6 default export', () => {
    const { es6 } = tasks;
    expect(typeof es6).to.equal('function');
  });

  it('exports an object when object', () => {
    const { obj } = tasks;
    expect(obj.foo).to.exist;
    expect(typeof obj.foo).to.equal('function');
  });

  it('handles empty file', () => {
    const { empty } = tasks;
    expect(typeof empty).to.equal('object');
  });
});
