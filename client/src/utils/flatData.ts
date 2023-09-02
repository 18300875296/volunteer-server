export const flatData = <T>(data: T[], depth: number, keyword?: keyof T): T[] => {
  if (depth <= 0) return data;
  const flat: T[] = [];
  for (const item of data) {
    if (keyword) {
      if (Array.isArray(item[keyword])) {
        flat.push(...flatData(item[keyword] as T[], depth - 1, keyword), item); // 递归调用，并将结果合并到 flat 数组中
      } else {
        flat.push(item);
      }
    }
    // else if (Array.isArray(item)) {
    //   flat.push(...flatData(item as T[], depth - 1, keyword), item); // 递归调用，并将结果合并到 flat 数组中
    // } else {
    //   flat.push(item);
    // }
  }
  return flat;
};
