import type { IconType } from "react-icons";
import { Modal } from "../components/molecules";
import { useToggle } from "../hooks";

interface WithModalProps {
  icon: IconType;
  modalTitle: string;
}

const withModal = <P extends object>(OriginalComponent: React.ComponentType<P>) => {
  const NewComponent: React.FC<P & WithModalProps> = props => {
    const [isOpen, onToggle] = useToggle();
    const { icon: Icon, modalTitle, ...rest } = props;

    return (
      <>
        <Icon onClick={onToggle} className="inline-block cursor-pointer text-blue-500" size="1.7em" />
        {isOpen && (
          <Modal isOpen={isOpen} onToggle={onToggle} modalTitle={modalTitle} className="w-full">
            <OriginalComponent onToggle={onToggle} {...(rest as P)} />
          </Modal>
        )}
      </>
    );
  };

  return NewComponent;
};

export default withModal;
