import {useState, useEffect} from 'react';
import axios from 'axios';

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': '35a098294emsh47e7785cf06fea5p1c2e52jsn738ee4e24091',
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
    },
    params: {...query},
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      if (error.response.status === 429) {
        // Add a delay of 2 second before retrying the request
        await new Promise((resolve) => setTimeout(resolve, 2000));
        fetchData();
      } else {
        setError(error);
        alert('There is an error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return {data, isLoading, error, refetch};
};

export default useFetch;
