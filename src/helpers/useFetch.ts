"use client";
import useSWR from 'swr'

const fetcher = (params: any) => {
    const [endpoint, fetchOptions] = params;

    const options = {
        method: fetchOptions.method,
        headers: {
          ...fetchOptions.headers,
        },
        body: fetchOptions.body
    };
    return fetch(endpoint, options).then((res) => res.json())
}

const useFetch = (endpoint: string, fetchOptions: any) => {
    const { data, error } = useSWR([endpoint, fetchOptions], fetcher)
    return { data, error }
}

export default (endpoint: string, options: any = {}) => {
    const fetchOptions = options.body
      ? {
          method: options.method ? options.method : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(options.body)
        }
      : { method: "GET", headers: {} };
  
    return useFetch(
      endpoint,
      fetchOptions
    );
  };