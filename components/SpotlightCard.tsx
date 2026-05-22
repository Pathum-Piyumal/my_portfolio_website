'use client';

import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  glowColor?: string;
}

/**
 * SpotlightCard — A premium card component with:
 * 1. Cursor-tracking radial spotlight inside the card
 * 2. Animated glowing border trace on hover
 * 3. Spring-lift hover effect
 * 4. Subtle inner shimmer at the top edge
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(179,136,255,0.12)',
  glowColor = 'rgba(179,136,255,0.15)',
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [borderPos, setBorderPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setBorderPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -6, scale: 1.012 }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
      className={`relative overflow-hidden rounded-3xl ${className}`}
      style={{
        // Animated border using conic-gradient that rotates around cursor position
        background: isHovered
          ? `conic-gradient(from calc(${borderPos.x}deg + ${borderPos.y * 0.5}deg) at ${borderPos.x}% ${borderPos.y}%, ${glowColor} 0deg, transparent 60deg, transparent 300deg, ${glowColor} 360deg)`
          : 'transparent',
        padding: '1px',
      }}
    >
      {/* Card inner surface */}
      <div className="relative w-full h-full rounded-[calc(1.5rem-1px)] bg-zinc-950/40 overflow-hidden">
        {/* Cursor-tracking radial spotlight */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
          }}
        />

        {/* Top shimmer accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1px] z-20 pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0.3 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `linear-gradient(90deg, transparent, ${glowColor.replace(/[\d.]+\)$/, '0.6)')}, transparent)`,
          }}
        />

        {children}
      </div>
    </motion.div>
  );
}
