import extend from 'extend';

export const DEFAULTS = {
  fileReplacePattern: /\..+$/
};

export default (...opts) => {
  const args = [{}, DEFAULTS].concat(opts);
  return extend(...args);
};
