function groupByKey(array, key) {
  return array
    .reduce((hash, obj) => {
      console.log('hash', hash);
      if (obj[key] === undefined) return hash;
      return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) });
    }, {});
}

function formatData(arrToGroup, groupBy) {
  const obj = groupByKey(arrToGroup, groupBy);
  console.log(obj);
  return (
    Object.entries(obj).map(([key, val]) => ({
      id: val.map(({ id }) => id)[0],
      name: key,
      gifts: val.map(({ name }) => name),
    })));
}

module.exports = {
  formatData,
};
