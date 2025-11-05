
'use client';

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useUser } from "@/firebase";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";
import { AppFooter } from "@/components/layout/app-footer";
import { Skeleton } from "@/components/ui/skeleton";

function PrivateRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);


  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Skeleton className="h-[50vh] w-[80vw] rounded-lg" />
      </div>
    );
  }

  return <>{children}</>;
}


export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <PrivateRoute>
      <SidebarProvider>
        <div className="flex min-h-screen flex-col">
          <div className="flex flex-1">
            <AppSidebar />
            <main className="flex-1 bg-background">
              <AppHeader />
              <div className="p-4 sm:p-6 lg:p-8">
                {children}
              </div>
            </main>
          </div>
          <div className="p-4 sm:p-6 lg:p-8 pt-0">
            <AppFooter />
          </div>
        </div>
      </SidebarProvider>
    </PrivateRoute>
  );
}
