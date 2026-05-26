'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AccentTheme {
  id: string;
  name: string;
  rgb: string;
  hex: string;
  glowColor: string;
}

export const accentThemes: AccentTheme[] = [
  {
    id: 'violet',
    name: 'Violet Breeze',
    rgb: '179 136 255',
    hex: '#B388FF',
    glowColor: 'rgba(179, 136, 255, 0.2)'
  },
  {
    id: 'blue',
    name: 'Glacier Blue',
    rgb: '96 165 250',
    hex: '#60A5FA',
    glowColor: 'rgba(96, 165, 250, 0.2)'
  },
  {
    id: 'emerald',
    name: 'Emerald Matrix',
    rgb: '52 211 153',
    hex: '#34D399',
    glowColor: 'rgba(52, 211, 153, 0.2)'
  },
  {
    id: 'amber',
    name: 'Cyberpunk Amber',
    rgb: '245 158 11',
    hex: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.2)'
  },
  {
    id: 'crimson',
    name: 'Crimson Spark',
    rgb: '244 63 94',
    hex: '#F43F5E',
    glowColor: 'rgba(244, 63, 94, 0.2)'
  }
];

interface AccentContextProps {
  activeAccent: AccentTheme;
  setAccentTheme: (id: string) => void;
}

const AccentContext = createContext<AccentContextProps | undefined>(undefined);

export function AccentProvider({ children }: { children: React.ReactNode }) {
  const [activeAccent, setActiveAccent] = useState<AccentTheme>(accentThemes[0]);

  // Load from localStorage on client-side mount
  useEffect(() => {
    const savedThemeId = localStorage.getItem('portfolio-accent-theme');
    if (savedThemeId) {
      const found = accentThemes.find(t => t.id === savedThemeId);
      if (found) {
        setActiveAccent(found);
        document.documentElement.style.setProperty('--portfolio-accent', found.rgb);
      }
    }
  }, []);

  const setAccentTheme = (id: string) => {
    const selected = accentThemes.find(t => t.id === id);
    if (selected) {
      setActiveAccent(selected);
      localStorage.setItem('portfolio-accent-theme', id);
      document.documentElement.style.setProperty('--portfolio-accent', selected.rgb);
    }
  };

  return (
    <AccentContext.Provider value={{ activeAccent, setAccentTheme }}>
      {children}
    </AccentContext.Provider>
  );
}

export function useAccent() {
  const context = useContext(AccentContext);
  if (!context) {
    throw new Error('useAccent must be used within an AccentProvider');
  }
  return context;
}
