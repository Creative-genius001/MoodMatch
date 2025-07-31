"use client"

import {HeroUIProvider} from '@heroui/react'
import {ToastProvider} from "@heroui/toast";
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Providers({children}: any) {

   const [placement] = React.useState("top-right");
  return (
    <HeroUIProvider>
      <ToastProvider placement={"top-right"} toastOffset={placement.includes("top") ? 60 : 0} />
      {children}
    </HeroUIProvider>
  )
}