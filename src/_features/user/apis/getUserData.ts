import userData from "@/_data/user.data.json";

export const getUserData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 로딩 시뮬레이션
  return userData;
};
