import { useEffect, useState } from 'react';
import { getAllEpisodes, type Episode } from '../services/entityService';

interface UseEpisodesResult {
  episodes: Episode[];
  loading: boolean;
  error: string | null;
}

const useEpisodes = (): UseEpisodesResult => {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        setLoading(true);
        setError(null);

        const aggregatedEpisodes: Episode[] = [];
        let nextUrl: string | undefined = undefined;

        do {
          const data = await getAllEpisodes(nextUrl);
          aggregatedEpisodes.push(...data.results);
          nextUrl = data.info.next ?? undefined;
        } while (nextUrl);

        setEpisodes(aggregatedEpisodes);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error al cargar episodios.');
        }
        setEpisodes([]);
      } finally {
        setLoading(false);
      }
    };

    void fetchEpisodes();
  }, []);

  return {
    episodes,
    loading,
    error,
  };
};

export default useEpisodes;
