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
    const es6Task = {
      default: () => {
        return 'default';
      },
      overload: true
    };
    const es6 = AddProps(es6Task);

    it('returns default export', () => {
      expect(es6).to.have.key('overload');
      expect(es6()).to.equal(es6Task.default());
    });

    it('overloads default method with additional properties', () => {
      expect(es6).to.have.key('overload');
    });
  });
});
