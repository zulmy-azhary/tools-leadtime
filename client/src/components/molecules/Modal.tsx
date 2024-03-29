import React from "react";
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
  const { children, isOpen, onToggle, modalTitle, className, ...rest } = props;
  const modalRef = useOnClickOutside<HTMLDivElement>(isOpen, onToggle);

  useLockBodyScroll(isOpen);

  return (
    <div className="fixed inset-0 z-50 bg-gray-800/30 backdrop-blur-sm dark:bg-gray-800/50">
      <div className="flex h-full items-center overflow-y-auto py-6">
        <div
          ref={modalRef}
          className={clsx(
            "border-card-bd-light dark:border-card-bd-dark bg-card-bg-light dark:bg-card-bg-dark m-auto flex max-w-xs flex-col gap-7 rounded-lg border-[1.6px] p-6  md:max-w-xl lg:max-w-2xl",
            className
          )}
          {...rest}
        >
          <div className="flex">
            <Heading className="grow text-xl font-semibold">{modalTitle}</Heading>
            <Button
              icon={IoClose}
              onClick={onToggle}
              className="bg-button-bg-light dark:bg-button-bg-dark text-typo-light dark:text-typo-dark border-[1.6px] border-gray-200 p-1 text-sm dark:border-gray-700"
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
