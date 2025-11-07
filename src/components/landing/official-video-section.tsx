
'use client';

import { useState } from 'react';
import { Youtube, Volume2, VolumeX, ExternalLink, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function OfficialVideoSection() {
  const [isMuted, setIsMuted] = useState(true);

  const videoId = 'RXKIN6eHjBc';
  const videoSrc = `https://www.youtube-nocookie.com/embed/${videoId}?si=lQ8ew8ZLCCcCvSL_&controls=0&autoplay=1&loop=1&rel=0&playlist=${videoId}&mute=${isMuted ? 1 : 0}`;

  const handleRedirect = () => {
    window.open('https://adityatekkali.edu.in/', '_blank');
  };

  return (
    <section id="official-video" className="w-full py-12 md:py-24 lg:py-32 bg-background bg-grid-pattern">
      <div className="container px-4 md:px-6">
        <div className="flex justify-center items-center gap-4 mb-8">
          <Youtube className="w-10 h-10 text-primary" />
          <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl">AITAM Official Video</h2>
        </div>
        <div className="relative" style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-xl shadow-2xl"
            src={videoSrc}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <Button
            variant="outline"
            size="icon"
            className="absolute bottom-4 right-4 z-10 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            <span className="sr-only">{isMuted ? 'Unmute' : 'Mute'}</span>
          </Button>
        </div>
        <div className="text-center mt-8">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="lg">
                Want to learn more?
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="text-amber-500" />
                  You are leaving our site
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You are about to be redirected to an external website: <strong>adityatekkali.edu.in</strong>. Do you want to continue?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleRedirect}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </section>
  );
}
