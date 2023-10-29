import { useState, useEffect } from "react";

interface Result {
  title: string;
  body: string;
  imageUrl: string;
}
interface FetchResult {
  posts: Result[] | null;
  isLoading: boolean;
  error: string | null;
}

export const useFetch = (url: string | undefined): FetchResult => {
  const [posts, setPosts] = useState<Result[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      throw new Error("Url is not defined");
    }
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        if (response.status !== 200) throw new Error(response.statusText);
        const json = await response.json();
        setIsLoading(false);
        setPosts(json);
        setError(null);
      } catch (error) {
        setError(`${error} Could not Fetch Data`);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { posts, isLoading, error };
};
