import { type Dispatch, type SetStateAction, useCallback, useState } from "react";

type Props = [boolean, () => void, Dispatch<SetStateAction<boolean>>];

const useToggle = (defaultValue?: boolean): Props => {
  const [isOpen, setOpen] = useState<boolean>(!!defaultValue);
  const onToggle = useCallback(() => setOpen(v => !v), []);
  return [isOpen, onToggle, setOpen];
};

export default useToggle;
