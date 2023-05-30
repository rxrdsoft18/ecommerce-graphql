export const countBy = (array: any[], key: string, initialValue = {}) => {
  return array.reduce((acc, item) => {
    const countKey = item[key];
    acc[countKey] = (acc[countKey] || 0) + 1;

    return acc;
  }, initialValue);
};
