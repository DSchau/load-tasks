'use strict';
import { expect } from 'chai';

import AddProps from '../src/add-properties';

describe('Add properties', () => {
  it('returns non-default export as is', () => {
    const traditional = () => {
      return true;
    };
    const nonEs6 = AddProps(traditional);
    expect(nonEs6).to.equal(traditional);
  });

  describe('es6 functionality', () => {
    it('returns default export if only export', () => {
      const es6Task = {
        default: () => {
          return 'default';
        }
      };
      const es6 = AddProps(es6Task);
      expect(es6()).to.equal(es6Task.default());
    });

    it('returns all exports if additional exports', () => {
      const es6Task = {
        default: (...args) => {
          return () => {
            return args;
          };
        },
        overload: true
      };
      const es6 = AddProps(es6Task);
      expect(es6.overload).to.be.defined;
      expect(es6.default).to.be.defined;
      expect(typeof es6.default).to.equal('function');
    });
  });
});
