const ALL_ACITONS_TYPES = new Set();

module.exports = function createTypes(...types) {

  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction && types.length === 0) {
    throw new Error('Must specify at least one type');
  }

  const handler = {
    get(target, type) {
      const val = target[type];

      if (isProduction || typeof type !== 'string') {
        return val;
      }
      if (type !== 'inspect' && !val) {
        throw new Error(`${key} is an invalid action type`);
      }

      return val;
    }
  };

  const TYPES = isProduction ? {} :  new Proxy({}, handler);

  types.forEach((type, index) => {
    if (!isProduction && typeof type !== 'string') {
      throw new Error(`${type} should be a string`);
    }

    if (!isProduction && ALL_ACITONS_TYPES.has(type)) {
      throw new Error(`${type} has already been defined as an action type`);
    }
    TYPES[type] = type;
    ALL_ACITONS_TYPES.add(type);
  })

  handler.set = (target, type) => {
    throw new Error(`Failed setting ${type}, object is frozen`);
  }

  return TYPES;
}
