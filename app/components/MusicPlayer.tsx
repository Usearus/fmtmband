"use client";

import { useState, useRef, useEffect } from "react";

export interface Track {
  id: number;
  title: string;
  duration: string;
  durationSeconds: number;
}

interface MusicPlayerProps {
  track: Track | null;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function MusicPlayer({ track, onClose, onNext, onPrevious }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const progressRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (track) {
      setCurrentTime(0);
      setIsPlaying(true);
    }
  }, [track]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && track) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= track.durationSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, track]);

  if (!track) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = (currentTime / track.durationSeconds) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-charcoal/95 backdrop-blur-xl border-t-2 border-blood/50 shadow-[0_-10px_40px_rgba(139,0,0,0.3)]">
      {/* Progress bar at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-steel/50">
        <div 
          className="h-full bg-gradient-to-r from-blood-dark via-blood to-blood-bright transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Track info */}
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <div className="w-14 h-14 bg-blood/20 rounded flex items-center justify-center flex-shrink-0 border border-blood/30">
              <svg className="w-6 h-6 text-blood-bright" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
              </svg>
            </div>
            <div className="min-w-0">
              <p className="font-heading text-bone text-lg truncate tracking-wide">{track.title}</p>
              <p className="text-mist text-sm font-body uppercase tracking-wider">From Misery To Malice</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={onPrevious}
              className="p-2 text-mist hover:text-bone transition-colors"
              aria-label="Previous track"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              </svg>
            </button>
            
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 bg-blood hover:bg-blood-bright rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-lg shadow-blood/30"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
            
            <button 
              onClick={onNext}
              className="p-2 text-mist hover:text-bone transition-colors"
              aria-label="Next track"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
              </svg>
            </button>
          </div>

          {/* Time & progress (desktop) */}
          <div className="hidden md:flex items-center gap-3 flex-1 max-w-md">
            <span className="text-xs text-mist font-mono w-10 text-right">{formatTime(currentTime)}</span>
            <input
              ref={progressRef}
              type="range"
              min="0"
              max={track.durationSeconds}
              value={currentTime}
              onChange={(e) => setCurrentTime(Number(e.target.value))}
              className="flex-1 h-1"
            />
            <span className="text-xs text-mist font-mono w-10">{track.duration}</span>
          </div>

          {/* Volume & close */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2">
              <svg className="w-4 h-4 text-mist" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-20 h-1"
              />
            </div>
            
            <button 
              onClick={onClose}
              className="p-2 text-mist hover:text-blood-bright transition-colors"
              aria-label="Close player"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

