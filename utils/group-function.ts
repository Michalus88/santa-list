type Key = "id"|"firstName"|"name";

function groupByKey(array:Record<Key,string>[], key:Key) {
  return array
    .reduce((hash, obj) => {
      if (obj[key] === undefined) return hash;
      return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) });
    }, {});
}



export interface ChildEntity {
    id: string;
    firstName: string;
    name: string;
}

export function formatData(arrToGroup:ChildEntity[], groupBy:Key) {
  const obj = groupByKey(arrToGroup, groupBy);
  return (
    Object.entries(obj).map(([key, val]) => ({
      id: val.map(({ id }) => id)[0],
      name: key,
      gifts: val.map(({ name }) => name),
    })));
}
