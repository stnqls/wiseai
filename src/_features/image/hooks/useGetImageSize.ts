import { useCallback, useEffect, useState } from "react";

export function useGetImageSize(images: string[]) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [imageSizes, setImageSizes] = useState<
    { width: number; height: number }[]
  >([]);

  const loadImageSizes = useCallback(async () => {
    setIsLoading(true);

    try {
      const sizes = await Promise.all(
        images.map(
          (url) =>
            new Promise<{ width: number; height: number }>(
              (resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () =>
                  resolve({
                    width: img.naturalWidth,
                    height: img.naturalHeight,
                  });
                img.onerror = () => reject(new Error(`Failed to load: ${url}`));
              }
            )
        )
      );
      setImageSizes(sizes);
    } catch (err) {
      setIsError(true);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [images]);

  useEffect(() => {
    loadImageSizes();
  }, [loadImageSizes]);

  return { imageSizes, isLoading, isError };
}
