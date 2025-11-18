import { ImageSchema } from "@/_features/image/schemas/imageSchema.schema";
import { ChangeEvent, useCallback } from "react";
import {
  FieldPath,
  FieldValues,
  SetValueConfig,
  UseFormWatch,
} from "react-hook-form";

interface ImageAttachmentProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  watch: UseFormWatch<TFieldValues>;
  setValue: (
    name: FieldPath<TFieldValues>,
    value: ImageSchema | ImageSchema[],
    options?: SetValueConfig
  ) => void;
}

export function useImageAttachment<TFieldValues extends FieldValues>({
  setValue,
  watch,
  name,
}: ImageAttachmentProps<TFieldValues>) {
  const attachedImages: ImageSchema[] = watch(name);

  // 이미지 삽입
  const onAttachImage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;
      if (!files) return;

      const filesWithUrl = Array.from(files).map((file) => {
        return {
          file,
          url: URL.createObjectURL(file),
        };
      });
      setValue(name, [...watch(name), ...filesWithUrl]);
    },
    [setValue, watch, name]
  );

  // 이미지 제거
  const onRemoveImage = (url: string) => {
    setValue(
      name,
      watch(name).filter((image: ImageSchema) => image?.url !== url)
    );
    URL.revokeObjectURL(url);
  };

  return {
    attachedImages,
    onAttachImage,
    onRemoveImage,
  };
}
