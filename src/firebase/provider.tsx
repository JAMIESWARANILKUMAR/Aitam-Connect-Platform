'use client';
import React, { createContext, useContext } from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import type { Analytics } from 'firebase/analytics';

interface FirebaseContextValue {
  app: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
  analytics: Analytics | null;
}

const FirebaseContext = createContext<FirebaseContextValue>({
  app: null,
  auth: null,
  firestore: null,
  analytics: null,
});

interface FirebaseProviderProps {
  children: React.ReactNode;
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
  analytics: Analytics | null;
}

export function FirebaseProvider({
  children,
  app,
  auth,
  firestore,
  analytics,
}: FirebaseProviderProps) {
  return (
    <FirebaseContext.Provider value={{ app, auth, firestore, analytics }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => useContext(FirebaseContext);
export const useFirebaseApp = () => useContext(FirebaseContext).app;
export const useAuth = () => useContext(FirebaseContext).auth;
export const useFirestore = () => useContext(FirebaseContext).firestore;
export const useAnalytics = () => useContext(FirebaseContext).analytics;
