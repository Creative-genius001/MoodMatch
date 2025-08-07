'use client'

import { requestAccessToken } from '@/api/spotify'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const Callback = () => {

const searchParams = useSearchParams()
const router = useRouter()

React.useEffect(()=> {
const state = searchParams.get('state')
const code = searchParams.get('code')
const error = searchParams.get('error')

    if (error != null) {
        router.replace('/')
    }
    if(state != null && code != null){
      const stateCode = sessionStorage.getItem('stateCode')
      if (stateCode == null) {
        router.replace('/')
      }else if (stateCode != state) {
        router.replace('/')
      }else {
        requestAccessToken(code);
      }

    }
    else{
        router.replace('/')
      return;
    }
},[searchParams, router])
  return (
    <div>Loading...</div>
  )
}

export default Callback