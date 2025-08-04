'use client'
import { useStore } from "@/app/store/store";
import { useEffect } from "react";

export function useGetAllData() {
    const { getTopData} = useStore();

    useEffect(()=> {
        getTopData()
    },[])
}