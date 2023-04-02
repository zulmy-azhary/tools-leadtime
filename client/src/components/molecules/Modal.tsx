import React, { useRef } from "react";
import clsx from "clsx";
import { useOnClickOutside } from "../../hooks";
import { Button, Heading } from "../atoms";
import { IoClose } from "react-icons/io5";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onToggle: () => void;
  modalTitle: string;
}

const Modal: React.FC<Props> = props => {
  const { children, isOpen, onToggle, modalTitle, className } = props;
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, () => isOpen && onToggle());
  return isOpen ? (
    <div className={clsx("fixed inset-0 z-50 flex items-center justify-center bg-gray-700/20 p-6 backdrop-blur-sm")}>
      <div
        ref={modalRef}
        className={clsx("h-fit max-w-3xl grow rounded-lg border-[1.6px] border-gray-300 bg-white p-6", className)}
      >
        <div className={clsx("flex")}>
          <Heading className={clsx("grow text-xl font-semibold")}>{modalTitle}</Heading>
          <Button icon={IoClose} onClick={() => onToggle()} />
        </div>
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
