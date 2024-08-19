export const statusToText = (status: number): string => {
  switch (status) {
    case 0:
      return '未完了';
    case 1:
      return '完了';
    default:
      return '不明なステータス';
  }
};
