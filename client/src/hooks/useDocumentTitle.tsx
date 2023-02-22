import { useEffect } from "react";

export const useDocumentTitle = (title: string): void => {
  useEffect(() => {
    window.document.title = `Kalla Toyota Urip | ${title}`;
  }, [title]);
};
