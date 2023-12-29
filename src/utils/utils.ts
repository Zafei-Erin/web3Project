export const calculateTime = (dateTime: string) => {
  const nowTime = new Date().getTime();
  const time = parseInt(dateTime) * 1000;
  let diff = Math.floor((nowTime - time) / 1000);
  if (diff < 60) return `${diff} ${diff <= 1 ? "sec" : "secs"}  ago`;
  diff = Math.floor(diff / 60);
  if (diff < 60) return `${diff} ${diff <= 1 ? "min" : "mins"}  ago`;
  diff = Math.floor(diff / 60);
  if (diff < 24) return `${diff} ${diff <= 1 ? "hr" : "hrs"}  ago`;
  diff = Math.floor(diff / 24);
  if (diff < 30) return `${diff} ${diff <= 1 ? "day" : "days"}  ago`;
  diff = Math.floor(diff / 30);
  if (diff < 365) return `${diff} ${diff <= 1 ? "month" : "months"}  ago`;
  diff = Math.floor(diff / 365);
  return `${Math.floor(diff)} years ago`;
};
