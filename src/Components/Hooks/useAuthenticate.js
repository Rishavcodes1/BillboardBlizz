import { useEffect } from "react";
import { useNavigate } from "react-router";

export const useAuthenticate = (target, path) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (target) {
      return;
    } else {
      navigate(path);
    }
  }, []);
};
