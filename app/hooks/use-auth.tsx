import getLocalStorage from "@/app/utils/getLocalStorage";
import { useEffect } from "react";
import { useStore } from "../store/store";

export const useAuth = () => {
  const {isAuthenticated, setIsAuthenticated} = useStore();

  useEffect(() => {
   
    const local = getLocalStorage('access-data');
    if(!local && local.refresh_token == null){
        setIsAuthenticated(false);
    }else {
        setIsAuthenticated(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isAuthenticated };
};
