const storageUtil = {
  setSessionStorage({ key, value }: { key: string; value: string }) {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      throw new Error(`Session Storage 저장에 실패하였습니다. ${err}`);
    }
  },

  getSessionStorage(key: string) {
    try {
      const rawData = window.sessionStorage.getItem(key);
      if (!rawData) return null;

      return rawData;
    } catch (err) {
      throw new Error(`Session Storage 불러오기에 실패하였습니다. ${err}`);
    }
  },

  removeSessionStorage(key: string) {
    window.sessionStorage.removeItem(key);
  },
};

export default storageUtil;
