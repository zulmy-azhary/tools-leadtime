import React, { useRef } from "react";
import clsx from "clsx";
import { useOnClickOutside } from "../../hooks";
import { Button, Heading } from "../atoms";
import { IoClose } from "react-icons/io5";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onToggle: () => void;
  modalTitle: string;
}

const Modal: React.FC<Props> = props => {
  const { children, isOpen, onToggle, modalTitle, className } = props;
  const modalRef = useRef(null);

  useOnClickOutside(modalRef, () => isOpen && onToggle());
  useLockBodyScroll(isOpen);

  return (
    <div className={"fixed inset-0 z-50 bg-gray-700/20 backdrop-blur-sm"}>
      <div className={"flex h-full items-center overflow-y-auto py-6"}>
        <div
          ref={modalRef}
          className={clsx(
            "m-auto flex max-w-3xl flex-col gap-7 rounded-lg border-[1.6px] border-gray-300 bg-white p-6 dark:border-slate-800 dark:bg-slate-900",
            className
          )}
        >
          <div className={"flex"}>
            <Heading className={"grow text-xl font-semibold"}>{modalTitle}</Heading>
            <Button icon={IoClose} onClick={() => onToggle()} />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
