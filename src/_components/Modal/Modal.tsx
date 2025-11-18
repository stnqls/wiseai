import { cn } from "@/_lib/cn";
import XIcon from "@/assets/icons/x.svg";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  classNames?: {
    container?: string;
    overlay?: string;
    closeButton?: string;
  };
}

export default function Modal({
  children,
  isOpen,
  onClose,
  classNames,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed w-full h-full top-0 left-0 flex items-center justify-center",
        classNames?.container
      )}
    >
      <div
        className={cn(
          "absolute w-full h-full top-0 left-0 bg-black/80",
          classNames?.overlay
        )}
      ></div>
      <button
        className={cn("absolute top-24 right-24", classNames?.closeButton)}
        onClick={onClose}
      >
        <XIcon className="w-30 h-30 text-white" />
      </button>
      {children}
    </div>
  );
}
