"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../hooks/use-auth";

type Props = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/"); 
    }
  }, [isAuthenticated, router]);
  setTimeout(()=> {
    
  },200)
  if (isAuthenticated) {
      return <>{children}</>;
  }
};

export default AuthGuard;
