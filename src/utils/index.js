/**
 * 把数字转成中文
 * @param {*} src
 */
export function int2chineseNum(src) {
  let num = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  let unit = [
    '',
    '十',
    '百',
    '千',
    '万',
    '十',
    '百',
    '千',
    '亿',
    '十',
    '百',
    '千',
  ];
  let dst = '';
  let count = 0;
  while (src > 0) {
    if (num[src % 10] != undefined) {
      dst = num[src % 10] + unit[count] + dst;
    } else {
      dst = unit[count] + dst;
    }
    src = Math.floor(src / 10);
    count++;
  }
  return dst
    .replaceAll(/零[千百十]/g, '零')
    .replaceAll(/零+万/g, '万')
    .replaceAll(/零+亿/g, '亿')
    .replaceAll(/亿万/g, '亿零')
    .replace(/零+/g, '零')
    .replace(/零$/g, '')
    .replace(/一十/g, '十');
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/');
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    return value.toString().padStart(2, '0');
  });
  return time_str;
}
export function getGroupArray(list, attr) {
  const map = new Map();
  list.forEach((item, index, arr) => {
    if (!map.has(item[attr])) {
      map.set(
        item[attr],
        arr.filter((a) => a[attr] == item[attr])
      );
    }
  });
  return map;
}
