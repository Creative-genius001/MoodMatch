'use client'
import { requestAccessToken } from "@/api/auth";
import GeneratePlaylistPage from "@/components/GeneratePlaylistPage";
import { redirect, useSearchParams } from "next/navigation";
import React from "react";


export default function Home() {

  const searchParams = useSearchParams()

  React.useEffect(()=>{ 
    const state = searchParams.get('state')
    const code = searchParams.get('code')
    const data = localStorage.getItem('atk')

    if(data) {
      const spotifyData = JSON.parse(data)
      // getRefreshToken()
    }
    else {
      if(code === null || state === null){
      redirect('/auth/signup')
      }
      if(code){
          requestAccessToken(state, code);
  
        }
    }
  })

 
  return (
    <div className="main-div">
      <GeneratePlaylistPage />
    </div>
  );
}
