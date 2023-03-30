import { type Dispatch, type SetStateAction, useCallback, useState } from "react";

type Props = [boolean, () => void, Dispatch<SetStateAction<boolean>>];

const useToggle = (defaultValue?: boolean): Props => {
  const [value, setValue] = useState<boolean>(!!defaultValue);
  const toggle = useCallback(() => setValue(v => !v), []);
  return [value, toggle, setValue];
};

export default useToggle;
