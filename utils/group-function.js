function groupByKey(array, key) {
  return array
    .reduce((hash, obj) => {
      console.log('hash :::::::::::::::::::::::::::', hash);
      if (obj[key] === undefined) return hash;
      return Object.assign(hash, { [obj[key]]: (hash[obj[key]] || []).concat(obj) });
    }, {});
}

module.exports = {
  groupByKey,
};
'SELECT `children`.`FirstName` AS "firstName",`gifts`.`name` FROM `children` LEFT JOIN `children_gifts` ON `children`.`id`=`children_gifts`.`childId`LEFT JOIN `gifts` ON `gifts`.`id`=`children_gifts`.`giftId`';
