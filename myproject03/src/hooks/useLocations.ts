import { useEffect, useState } from 'react';
import { getAllLocations, type Location } from '../services/entityService';

interface UseLocationsResult {
  locations: Location[];
  loading: boolean;
  error: string | null;
}

const useLocations = (): UseLocationsResult => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        setError(null);

        const aggregatedLocations: Location[] = [];
        let nextUrl: string | undefined = undefined;

        do {
          const data = await getAllLocations(nextUrl);
          aggregatedLocations.push(...data.results);
          nextUrl = data.info.next ?? undefined;
        } while (nextUrl);

        setLocations(aggregatedLocations);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error al cargar ubicaciones.');
        }
        setLocations([]);
      } finally {
        setLoading(false);
      }
    };

    void fetchLocations();
  }, []);

  return {
    locations,
    loading,
    error,
  };
};

export default useLocations;
