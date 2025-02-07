import { useEffect, useState } from "react";

export const useFirstVisit = () => {
  const [firstVisit, setFirstVisit] = useState(false);

  useEffect(() => {
    const visited = sessionStorage.getItem("visited");
    if (!visited) {
      sessionStorage.setItem("visited", "true");
      setFirstVisit(true);
    } else {
      setFirstVisit(false);
    }
  }, []);

  return firstVisit;
};
