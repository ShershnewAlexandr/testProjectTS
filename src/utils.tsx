import moment from "moment";

export function formatDate(date: Date | null) {
  if (!date) {
    return "";
  }
  return moment(date).format("DD.MM.yyyy");
}

export const cancelableDebounse: any = function(func: any) {
  cancelableDebounse.isCancel = false;
  if (cancelableDebounse.isRuning && cancelableDebounse.lastTimeout) {
    clearTimeout(cancelableDebounse.lastTimeout);
    cancelableDebounse.isCancel = true;
  }
  cancelableDebounse.isRuning = true;
  cancelableDebounse.lastTimeout = setTimeout(() => func(cancelableDebounse.isCancel), 500);
}

export function sliceToPages(arr: any[], perPage: number){
  const pageCount = Math.ceil(arr.length / perPage);
  const slicedArr: any[] = [];
  for (let i = 0; i < pageCount; i++) {
    const lastIdx = i === pageCount - 1 ? arr.length 
    : (i + 1) * perPage;
    slicedArr.push(arr.slice(i * perPage, lastIdx));
  }
  return slicedArr;
}