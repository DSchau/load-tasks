'use strict';
import { expect } from 'chai';

import tasks from './load-tasks';

describe('load-tasks', () => {
  it('returns object of task/file names', () => {
    const keys = Object.keys(tasks);
    console.log(keys);
    expect(keys.length).to.be.above(0);
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
