import { useEffect, useState } from "react";

export const useFetchData = (endpoint) => {
  
    const urlBase = `http://localhost:8080/${endpoint}`;

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const fetchData = async () =>{
        try{
            const res = await fetch(urlBase);
            const data = await res.json();
            console.log(data);

            setData(data);
            setIsLoading(false);
        }
        catch(error){
            console.error(error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [endpoint]);
    

    return {
    data, 
    isLoading
  }
}
