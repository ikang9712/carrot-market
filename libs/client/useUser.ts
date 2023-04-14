import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
export default function useUser(){
    const [user, setUser] = useState()
    
    const router = useRouter()
    useEffect(()=>{
        fetch("/api/users/me")
        .then(response => response.json())
        .then((data)=> {
            if (!data.ok){
                return router.replace("/enter")
            }
            setUser(data.profile)
        })
    },[router])
    return user;
}