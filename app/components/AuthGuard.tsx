"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "../store/store";
import getLocalStorage from "../utils/getLocalStorage";


type Props = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: Props) => {
  const { isAuthenticated, setIsAuthenticated } = useStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const local = getLocalStorage('access-data');
      if (local && local.refresh_token) {
        setIsAuthenticated(true);
      } else {
        alert('Connect your spotify account!')
        setIsAuthenticated(false);
        router.replace("/");
      }
    }
    setLoading(false);
  }, [router, setIsAuthenticated]); 
                          
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark50">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return null;
};

export default AuthGuard;
