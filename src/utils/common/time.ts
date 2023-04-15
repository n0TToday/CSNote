export function toDateTime(timestamp: number) {
  const date = new Date(timestamp);
  const nowTime = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  return nowTime;
}

export function getNowTimeStamp() {
  return Date.now();
}

export function formatTimeInterval(timestamp: number) {
  // 获取当前时间的时间戳
  const now = Date.now();
  // 计算时间差，单位为毫秒
  const diff = now - timestamp;
  // 定义一些常量，表示不同的时间单位
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  // 根据时间差，返回不同的字符串
  if (diff < minute) {
    // 如果小于一分钟，返回"刚刚"
    return '刚刚';
  } else if (diff < hour) {
    // 如果小于一小时，返回"几分钟前"
    return `${Math.floor(diff / minute)}分钟前`;
  } else if (diff < day) {
    // 如果小于一天，返回"几小时前"
    return `${Math.floor(diff / hour)}小时前`;
  } else if (diff < week) {
    // 如果小于一周，返回"几天前"
    return `${Math.floor(diff / day)}天前`;
  } else if (diff < month) {
    // 如果小于一个月，返回"几周前"
    return `${Math.floor(diff / week)}周前`;
  }
  // 如果大于或等于一个月，返回"几个月前"
  return `${Math.floor(diff / month)}个月前`;
}
