'use client';

import { Suspense, lazy, useState } from 'react';
import { motion } from 'framer-motion';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineCharacterProps {
  sceneUrl: string;
  className?: string;
  fallbackEmoji?: string;
  width?: number;
  height?: number;
}

function SplineSkeleton({ width, height, emoji }: { width: number; height: number; emoji: string }) {
  return (
    <motion.div
      className="flex items-center justify-center rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10"
      style={{ width, height }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <motion.span
        className="text-7xl"
        animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {emoji}
      </motion.span>
    </motion.div>
  );
}

export default function SplineCharacter({
  sceneUrl,
  className = '',
  fallbackEmoji = '🧑‍💻',
  width = 500,
  height = 500,
}: SplineCharacterProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <SplineSkeleton width={width} height={height} emoji={fallbackEmoji} />
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {/* Show skeleton until loaded */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10">
          <SplineSkeleton width={width} height={height} emoji={fallbackEmoji} />
        </div>
      )}

      <Suspense fallback={<SplineSkeleton width={width} height={height} emoji={fallbackEmoji} />}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full"
        >
          <Spline
            scene={sceneUrl}
            style={{ background: 'transparent', width: '100%', height: '100%' }}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
          />
        </motion.div>
      </Suspense>
    </div>
  );
}
