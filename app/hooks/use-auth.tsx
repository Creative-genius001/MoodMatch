import getLocalStorage from "@/app/utils/getLocalStorage";
import { useEffect } from "react";
import { useStore } from "../store/store";

export const useAuth = () => {
  const {isAuthenticated, setIsAuthenticated} = useStore();

  useEffect(() => {
   
    const local = getLocalStorage('access-data');
    if(!local || local.access_token == null){
        setIsAuthenticated(false);
    }else {
        setIsAuthenticated(true);
    }
  }, []);

  return { isAuthenticated };
};
