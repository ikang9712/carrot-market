import { useState, useEffect } from 'react';

interface UseCoordState {
    latitude: number | null
    longitude: number | null
}

export default  function useCoords(){
    const [ coords, setCoords ] = useState<UseCoordState>({
        latitude:null,
        longitude:null
    })

    const onSuccess = ({coords:{latitude,longitude}}:GeolocationPosition) => {
        setCoords({latitude,longitude})
    }

    useEffect(()=> {
        navigator.geolocation.getCurrentPosition(onSuccess)
    }, [])
    return coords
}