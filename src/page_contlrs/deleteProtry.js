
const deleteProtry = (target, proptry, isDeep) => {
  /* eslint-disable */
  if (!proptry) {
    return;
  }

  Object.keys(target).forEach((pro) => {
    if (!target.hasOwnProperty(pro)){
      return;
    }

    if (pro === proptry) {
      delete target[proptry];
    }

    if (typeof target[pro] === 'object') {
      deleteProtry(target[pro], proptry, isDeep);
    }
  });
};

export default deleteProtry;
