import extend from 'extend';

export const DEFAULTS = {
  fileReplacePattern: /\..+$/
};

export default (...opts) => {
  return extend.apply(this, [{}, DEFAULTS].concat(opts));
};
