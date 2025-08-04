'use client'

import { AIGenerator } from "../components/AIGenerator";


export default function DashboardHomePage() {
  return (
    <main className="flex justify-center items-center text-white">
        <div className="flex flex-col justify-center items-center mt-[16rem]">
            <h1 className="text-3xl font-light">What type of playlist would you like?</h1>
            <AIGenerator />
        </div>
    </main>
  );
}