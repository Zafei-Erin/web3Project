export const calculateTime = (dateTime: string) => {
    const nowTime = new Date().getTime();
    const time = parseInt(dateTime) * 1000;
    let diff = (nowTime - time) / 1000;
    if (diff < 60) return `${Math.round(diff)} secs ago`;
    diff = diff / 60;
    if (diff < 60) return `${Math.round(diff)} min ago`;
    diff = diff / 60;
    if (diff < 24) return `${Math.round(diff)} hours ago`;
    diff = diff / 24;
    if (diff < 30) return `${Math.round(diff)} days ago`;
    diff = diff / 30;
    if (diff < 365) return `${Math.round(diff)} months ago`;
    diff = diff / 365;
    return `${Math.round(diff)} years ago`;
  };