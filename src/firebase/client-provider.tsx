'use client';
import React, { useState, useEffect } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import type { Analytics } from 'firebase/analytics';
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { firebaseConfig } from './config';
import { FirebaseProvider } from './provider';

interface FirebaseClientProviderProps {
  children: React.ReactNode;
}

export function FirebaseClientProvider({ children }: FirebaseClientProviderProps) {
  const [firebaseInstances, setFirebaseInstances] = useState<{
    app: FirebaseApp;
    auth: Auth;
    firestore: Firestore;
    analytics: Analytics | null;
  } | null>(null);

  useEffect(() => {
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    
    let analytics: Analytics | null = null;
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
        setFirebaseInstances({ app, auth, firestore, analytics });
    });

  }, []);

  if (!firebaseInstances) {
    // You can return a loader here if you want
    return null;
  }

  return (
    <FirebaseProvider
      app={firebaseInstances.app}
      auth={firebaseInstances.auth}
      firestore={firebaseInstances.firestore}
      analytics={firebaseInstances.analytics}
    >
      {children}
    </FirebaseProvider>
  );
}
