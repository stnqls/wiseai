import dayjs from "dayjs";

export const getRelativeDate = (date: string) => {
  const now = dayjs();
  const targetDate = dayjs(date);

  // 1분 미만
  if (now.diff(targetDate, "minute") < 1) {
    return "방금 전";
  }

  // 1시간 미만
  if (now.diff(targetDate, "hour") < 1) {
    return `${now.diff(targetDate, "minute")}분 전`;
  }

  // 24시간 미만
  if (now.diff(targetDate, "day") < 1) {
    return `${now.diff(targetDate, "hour")}시간 전`;
  }

  // 7일 미만
  if (now.diff(targetDate, "day") < 7) {
    return `${now.diff(targetDate, "day")}일 전`;
  }

  // 7일 이상
  return targetDate.format("YYYY-MM-DD HH:mm");
};
