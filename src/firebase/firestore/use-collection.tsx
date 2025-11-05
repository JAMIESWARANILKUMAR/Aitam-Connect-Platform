'use client';
import { useState, useEffect, useMemo } from 'react';
import type {
  Firestore,
  Query,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';

export const useCollection = <T extends DocumentData>(
  queryFactory: (firestore: Firestore) => Query<T> | null
) => {
  const firestore = useFirestore();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const query = useMemo(
    () => (firestore ? queryFactory(firestore) : null),
    [firestore, queryFactory]
  );

  useEffect(() => {
    if (!query) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = onSnapshot(
      query,
      (snapshot: QuerySnapshot<T>) => {
        const documents = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(documents);
        setLoading(false);
        setError(null);
      },
      (err: Error) => {
        console.error(err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [query]);

  return { data, loading, error };
};
