/**
 * 日付を変換する。 e.g. format: 'yyyy/MM/dd'
 * @param date
 * @param format
 * @returns
 */
export const formatDate = (date: Date | undefined | null, format: string) => {
  if (!date) {
    return '';
  }

  const symbol = {
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  };

  const formatted = format.replace(/(M+|d+|h+|m+|s+)/g, (v) =>
    ((v.length > 1 ? '0' : '') + symbol[v.slice(-1) as keyof typeof symbol]).slice(-2)
  );

  return formatted.replace(/(y+)/g, (v) => date.getFullYear().toString().slice(-v.length));
};

export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};
