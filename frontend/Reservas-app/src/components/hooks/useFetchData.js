import { useEffect, useState } from "react";

export const useFetchData = ({ endpoint, postData={} }) => {
  
    const urlBase = `http://localhost:8080/${endpoint}`;

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hayError, setHayError] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () =>{
        try{
            const res = await fetch(urlBase);
            const data = await res.json();

            setData(data);
            setIsLoading(false);
            setHayError(false);
        }
        catch(error){
            setIsLoading(false);
            setHayError(true);
            setError(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [endpoint]);
    

    return {
    data, 
    isLoading,
    hayError,
    error
  }
}
