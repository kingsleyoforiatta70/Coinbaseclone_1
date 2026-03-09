import { useEffect, useState } from 'react';
import logoMark from '../../assets/logo.svg';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar smoothly over ~1 second
    const progressInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + 5;
      });
    }, 40);

    // Start animating out the splash screen after 1.5 seconds
    const timer1 = setTimeout(() => {
      setIsAnimatingOut(true);
    }, 1500);

    // Completely unmount the splash screen after the transition finishes (2 seconds)
    const timer2 = setTimeout(() => {
      onFinish();
    }, 2200);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f5f7ff] dark:bg-[#0b0f19] transition-all duration-700 ease-in-out ${
        isAnimatingOut ? 'opacity-0 scale-110 pointer-events-none blur-sm' : 'opacity-100 scale-100 blur-0'
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        <div className="animate-bounce">
          <img 
            src={logoMark} 
            alt="Coinbase logo" 
            className="h-24 w-24 drop-shadow-[0_0_25px_rgba(0,82,255,0.6)]" 
          />
        </div>
        
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 animate-pulse">
            <span className="text-2xl font-bold tracking-tight text-[#0052ff]">coinbase</span>
          </div>
          
          <div className="h-1.5 w-48 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800 shadow-inner">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-75 ease-linear shadow-[0_0_10px_rgba(0,82,255,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
