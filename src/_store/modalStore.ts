import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  imageIndex: number;
  images: string[];
  onOpen: ({ index, images }: { index: number; images: string[] }) => void;
  onClose: () => void;
  onPrev: (index: number) => void;
  onNext: (index: number) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  imageIndex: 0,
  images: [],

  onOpen: ({ index, images }: { index: number; images: string[] }) => {
    set({ isOpen: true, imageIndex: index, images: images });
  },
  onClose: () => {
    set({ isOpen: false, imageIndex: 0, images: [] });
  },

  onPrev: (index: number) => {
    set({ imageIndex: index - 1 });
  },
  onNext: (index: number) => {
    set({ imageIndex: index + 1 });
  },
}));
