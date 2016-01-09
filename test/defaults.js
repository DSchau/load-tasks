'use strict';
import { expect } from 'chai';

import defaultsFn, { DEFAULTS } from '../src/defaults';

describe('Defaults', () => {
  it('exposes default options', () => {
    expect(DEFAULTS).not.to.be.empty;
  });

  describe('clone function', () => {
    const cloned = defaultsFn({
      fileReplacePattern: /\.js/
    });

    it('does not modify the original object', () => {
      expect(cloned).not.to.deep.equal(DEFAULTS);
    });

    it('allows passed in options to take precedence', () => {
      expect(cloned.fileReplacePattern).not.to.equal(DEFAULTS.fileReplacePattern);
    });
  });
});
